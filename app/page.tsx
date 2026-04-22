'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import StarfieldBg from '@/components/StarfieldBg'
import ChatBar from '@/components/ChatBar'
import HomeCards from '@/components/HomeCards'
import UserBubble from '@/components/UserBubble'
import VedaMessage from '@/components/VedaMessage'
import OpheliaMessage from '@/components/OpheliaMessage'
import OpheliaEntered from '@/components/OpheliaEntered'
import OpheliaIntroOverlay from '@/components/OpheliaIntroOverlay'
import ReadingChoiceCards from '@/components/ReadingChoiceCards'
import CardSelectionOverlay from '@/components/CardSelectionOverlay'
import CardRevealResult from '@/components/CardRevealResult'
import CardRevealOverlay from '@/components/CardRevealOverlay'
import HoroscopeContent from '@/components/HoroscopeContent'
import LoginScreen from '@/components/LoginScreen'
import OnboardingFlow from '@/components/OnboardingFlow'
import ReadingPreviewWidget from '@/components/ReadingPreviewWidget'
import ChatSystemMessage from '@/components/ChatSystemMessage'
import TarotTypeSelector from '@/components/TarotTypeSelector'
import { ASSETS } from '@/lib/assets'

type Screen =
  | 'home'
  | 'tarot_loading'
  | 'ophelia_intro'
  | 'reading_choice'
  | 'yes_no_question'
  | 'yes_no_cards'
  | 'card_revealed'
  | 'three_card_question'
  | 'three_card_cards'
  | 'three_card_result'
  | 'horoscope'

interface Message {
  id: string
  type:
    | 'user'
    | 'veda'
    | 'veda_loading'
    | 'ophelia_msg'
    | 'ophelia_intro'
    | 'ophelia_entered'
    | 'reading_choice'
    | 'card_reveal'
    | 'horoscope'
    | 'reading_preview'
    | 'system_msg'
    | 'tarot_type_selector'
  text?: string
  reading?: string
  onFollowUp?: (q: string) => void
  onViewReading?: () => void
  cardName?: string
  verdict?: string
  summary?: string
  cardImageSrc?: string
}

async function streamVedaResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  onChunk: (chunk: string) => void,
  onDone: () => void
) {
  const res = await fetch('/api/veda', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })
  if (!res.body) { onDone(); return }
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() ?? ''
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const data = line.slice(6)
      if (data === '[DONE]') { onDone(); return }
      try {
        const parsed = JSON.parse(data)
        if (parsed.text) onChunk(parsed.text)
      } catch {}
    }
  }
  onDone()
}

export default function VedaPage() {
  const [screen, setScreen] = useState<Screen>('home')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [cardMode, setCardMode] = useState<'yes_no' | 'three_card'>('yes_no')
  const [showOpheliaOverlay, setShowOpheliaOverlay] = useState(false)
  const [showCardOverlay, setShowCardOverlay] = useState(false)
  const [showCardReveal, setShowCardReveal] = useState(false)
  const [revealText, setRevealText] = useState('')
  const [revealStreaming, setRevealStreaming] = useState(false)
  const [pendingQuestion, setPendingQuestion] = useState('')
  const [streamingId, setStreamingId] = useState<string | null>(null)
  const [streamingText, setStreamingText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const msgCounter = useRef(0)

  const [onboardingState, setOnboardingState] = useState<'login' | 'onboarding' | 'done'>('login')

  const nextId = () => {
    msgCounter.current += 1
    return `msg-${msgCounter.current}`
  }

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, streamingText, scrollToBottom])

  function addMessage(msg: Omit<Message, 'id'>) {
    const id = nextId()
    setMessages((prev) => [...prev, { ...msg, id }])
    return id
  }

  async function askVeda(question: string, onReply: (text: string) => void) {
    const history = messages
      .filter((m) => m.type === 'user' || m.type === 'veda')
      .map((m) => ({
        role: (m.type === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.text ?? '',
      }))
    history.push({ role: 'user', content: question })

    const loadingId = nextId()
    setMessages((prev) => [...prev, { id: loadingId, type: 'veda_loading' }])
    setStreamingId(loadingId)
    setStreamingText('')

    let accumulated = ''
    await streamVedaResponse(
      history,
      (chunk) => {
        accumulated += chunk
        setStreamingText(accumulated)
      },
      () => {
        setStreamingId(null)
        setStreamingText('')
        setMessages((prev) =>
          prev.map((m) => (m.id === loadingId ? { ...m, type: 'veda', text: accumulated } : m))
        )
        onReply(accumulated)
      }
    )
  }

  function handleSendMessage(text?: string) {
    const q = (text ?? input).trim()
    if (!q) return
    setInput('')

    if (screen === 'home') {
      addMessage({ type: 'user', text: q })
      askVeda(q, () => {})
      return
    }

    if (screen === 'yes_no_question') {
      setPendingQuestion(q)
      addMessage({ type: 'user', text: q })
      const opMsgId = nextId()
      setMessages((prev) => [
        ...prev,
        { id: opMsgId, type: 'ophelia_msg', text: 'Got it. Now choose your card from the deck below.' },
      ])
      setCardMode('yes_no')
      setShowCardOverlay(true)
      setScreen('yes_no_cards')
      return
    }

    if (screen === 'three_card_question') {
      setPendingQuestion(q)
      addMessage({ type: 'user', text: q })
      const opMsgId = nextId()
      setMessages((prev) => [
        ...prev,
        { id: opMsgId, type: 'ophelia_msg', text: 'Let the cards guide you. Select three from the deck.' },
      ])
      setCardMode('three_card')
      setShowCardOverlay(true)
      setScreen('three_card_cards')
      return
    }

    if (screen === 'horoscope') {
      addMessage({ type: 'user', text: q })
      askVeda(q, () => {})
      return
    }

    if (screen === 'card_revealed') {
      addMessage({ type: 'user', text: q })
      askVeda(q, () => {})
      return
    }

    addMessage({ type: 'user', text: q })
    askVeda(q, () => {})
  }

  function staggerAdd(items: Omit<Message, 'id'>[], delayMs = 400) {
    items.forEach((item, i) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { ...item, id: nextId() }])
      }, i * delayMs)
    })
  }

  function handleTarotPill() {
    addMessage({ type: 'user', text: 'Tarot Reading' })
    setScreen('tarot_loading')
    askVeda('Tarot Reading', () => {
      setShowOpheliaOverlay(true)
    })
  }

  function handleHoroscopePill() {
    addMessage({ type: 'user', text: 'Daily horoscope' })
    setScreen('horoscope')
    const loadingId = nextId()
    setMessages((prev) => [...prev, { id: loadingId, type: 'veda_loading' }])
    setStreamingId(loadingId)
    setStreamingText('')
    const history = [{ role: 'user' as const, content: 'Give me a horoscope reading for today for Sanjhal (Pisces Sun, Taurus Moon, Virgo Rising). Reference the New Moon conjunct Sun, Jupiter trine Sun, and Saturn square Mars transits. Keep it to 3-4 sentences.' }]
    let accumulated = ''
    streamVedaResponse(
      history,
      (chunk) => { accumulated += chunk; setStreamingText(accumulated) },
      () => {
        setStreamingId(null)
        setStreamingText('')
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingId
              ? {
                  ...m,
                  type: 'horoscope' as const,
                  reading: accumulated,
                  onFollowUp: (q: string) => {
                    addMessage({ type: 'user', text: q })
                    askVeda(q, () => {})
                  },
                }
              : m
          )
        )
      }
    )
  }

  function handleYesNo() {
    setShowOpheliaOverlay(false)
    staggerAdd([
      { type: 'ophelia_entered' },
      {
        type: 'ophelia_msg',
        text: "A Yes / No reading \u2014 one card, one clear answer.\n\nBefore we draw, what does your heart need clarity on? Take a breath and write it out.",
      },
    ], 450)
    setTimeout(() => setScreen('yes_no_question'), 500)
  }

  function handleThreeCard() {
    setShowOpheliaOverlay(false)
    staggerAdd([
      { type: 'ophelia_entered' },
      {
        type: 'ophelia_msg',
        text: "Hello Sanjhal!\n\nI will be spreading the cards for you today. What area of your life would you like to explore through the past, present, and future?",
      },
    ], 450)
    setTimeout(() => setScreen('three_card_question'), 500)
  }

  function handleCardSelected() {
    setRevealText('')
    setRevealStreaming(true)
    const prompt = cardMode === 'yes_no'
      ? `Do a yes/no tarot card reading for this question: "${pendingQuestion}". The Moon card was drawn. Give an evocative reading in 3-4 sentences.`
      : `Do a three-card past/present/future tarot reading for: "${pendingQuestion}". Cards drawn: Moon (Past), Empress (Present), Tower (Future). Give a summarized narrative reading in 3-4 sentences.`
    const history = [{ role: 'user' as const, content: prompt }]
    let accumulated = ''
    streamVedaResponse(
      history,
      (chunk) => { accumulated += chunk; setRevealText(accumulated) },
      () => setRevealStreaming(false)
    )
  }

  function handleCloseReveal() {
    const reading = revealText
    const mode = cardMode
    setShowCardOverlay(false)
    setScreen('card_revealed')

    const cardImageSrc = mode === 'yes_no' ? ASSETS.moonCard : ASSETS.moonCard3
    const verdict = mode === 'yes_no' ? 'The Moon says no' : 'Moon \u00b7 Empress \u00b7 Tower'
    const cardName = mode === 'yes_no' ? 'The Moon' : 'Three Card Spread'
    const summary = reading.trim().length > 0 ? reading.trim() : 'Your reading is ready...'

    const vedaFollowUp = mode === 'yes_no'
      ? `I noticed that you drew The Moon, which indicates an unclear or uncertain response. Would you like to explore its meaning further, or is there something else you\u2019d like to discuss today?`
      : `I noticed that you drew The Moon, the Empress, and the Tower \u2014 each reflecting a unique energy across your past, present, and future. Would you like to explore their meanings further, or is there something else you\u2019d like to discuss today?`

    setMessages(prev => [...prev, {
      id: nextId(),
      type: 'reading_preview' as const,
      cardName,
      verdict,
      summary,
      cardImageSrc,
      onViewReading: () => { setRevealText(reading); setShowCardReveal(true) },
    }])

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: nextId(),
        type: 'system_msg' as const,
        text: 'Veda entered chat',
      }])
    }, 500)

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: nextId(),
        type: 'veda' as const,
        text: vedaFollowUp,
      }])
    }, 1000)
  }

  function handleAnotherReadingFromReveal() {
    setShowCardOverlay(false)
    setScreen('reading_choice')
    staggerAdd([
      {
        type: 'ophelia_msg',
        text: "Let\u2019s do another tarot reading. I will be spreading the cards for you today. Before we get deeper into your reading, what type of Tarot card reading would you like to do today?",
      },
      { type: 'tarot_type_selector' },
    ], 450)
  }

  function handleAnotherReading() {
    setShowCardOverlay(false)
    setScreen('reading_choice')
    staggerAdd([
      {
        type: 'ophelia_msg',
        text: "Let\u2019s do another tarot reading. I will be spreading the cards for you today. Before we get deeper into your reading, what type of Tarot card reading would you like to do today?",
      },
      { type: 'tarot_type_selector' },
    ], 450)
  }

  function handleStartYesNo() {
    setMessages(prev => prev.filter(m => m.type !== 'tarot_type_selector'))
    staggerAdd([
      {
        type: 'ophelia_msg',
        text: "A Yes / No reading \u2014 one card, one clear answer.\n\nBefore we draw, what does your heart need clarity on? Take a breath and write it out.",
      },
    ], 0)
    setTimeout(() => setScreen('yes_no_question'), 200)
  }

  function handleStartThreeCard() {
    setMessages(prev => prev.filter(m => m.type !== 'tarot_type_selector'))
    staggerAdd([
      {
        type: 'ophelia_msg',
        text: "What area of your life would you like to explore through the past, present, and future?",
      },
    ], 0)
    setTimeout(() => setScreen('three_card_question'), 200)
  }

  function handleFollowUp(q: string) {
    addMessage({ type: 'user', text: q })
    askVeda(q, () => {})
  }

  function handleReturnToVeda() {
    setScreen('home')
    setMessages([])
  }

  const chatPlaceholder =
    screen === 'yes_no_question'
      ? 'Ask your yes or no question...'
      : screen === 'three_card_question'
      ? 'What do you want to explore?'
      : 'Ask Veda anything...'

  const streamingMsg = messages.find((m) => m.id === streamingId)

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: '100%', height: '100%', backgroundColor: '#0a0c1a' }}
    >
      <StarfieldBg />
      <Header />

      {/* Scrollable chat area */}
      <div
        ref={scrollRef}
        className="absolute inset-x-0 overflow-y-auto no-scrollbar"
        style={{ top: 101, bottom: 120, paddingBottom: 24 }}
      >
        <div className="flex flex-col gap-[20px] px-[16px] pt-[20px]">
          {messages.length === 0 && screen === 'home' && (
            <HomeCards onTarot={handleTarotPill} onHoroscope={handleHoroscopePill} />
          )}

          {messages.map((msg) => {
            if (msg.type === 'user') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <UserBubble text={msg.text ?? ''} />
                </div>
              )
            }
            if (msg.type === 'veda') {
              return (
                <VedaMessage
                  key={msg.id}
                  text={msg.text ?? ''}
                  showAvatar
                  showLoader={false}
                />
              )
            }
            if (msg.type === 'veda_loading') {
              if (msg.id === streamingId && streamingText) {
                return (
                  <VedaMessage
                    key={msg.id}
                    text={streamingText}
                    showAvatar
                    showLoader={false}
                  />
                )
              }
              return (
                <VedaMessage key={msg.id} text="" showAvatar showLoader />
              )
            }
            if (msg.type === 'ophelia_msg') {
              return <OpheliaMessage key={msg.id} text={msg.text ?? ''} />
            }
            if (msg.type === 'ophelia_entered') {
              return <OpheliaEntered key={msg.id} />
            }
            if (msg.type === 'reading_choice') {
              return (
                <ReadingChoiceCards
                  key={msg.id}
                  onYesNo={handleYesNo}
                  onThreeCard={handleThreeCard}
                />
              )
            }
            if (msg.type === 'card_reveal') {
              return (
                <CardRevealResult
                  key={msg.id}
                  reading={msg.reading ?? ''}
                  onFollowUp={msg.onFollowUp ?? handleFollowUp}
                  onViewReading={msg.onViewReading}
                />
              )
            }
            if (msg.type === 'horoscope') {
              return (
                <HoroscopeContent
                  key={msg.id}
                  reading={msg.reading ?? ''}
                  onFollowUp={msg.onFollowUp ?? handleFollowUp}
                />
              )
            }
            if (msg.type === 'reading_preview') {
              return (
                <ReadingPreviewWidget
                  key={msg.id}
                  cardName={msg.cardName ?? ''}
                  verdict={msg.verdict ?? ''}
                  summary={msg.summary ?? ''}
                  cardImageSrc={msg.cardImageSrc ?? ASSETS.moonCard}
                  onViewReading={msg.onViewReading}
                />
              )
            }
            if (msg.type === 'system_msg') {
              return <ChatSystemMessage key={msg.id} text={msg.text ?? ''} />
            }
            if (msg.type === 'tarot_type_selector') {
              return (
                <TarotTypeSelector
                  key={msg.id}
                  onYesNo={handleStartYesNo}
                  onThreeCard={handleStartThreeCard}
                />
              )
            }
            return null
          })}
        </div>
      </div>

      {/* Chat bar */}
      <div className="absolute inset-x-0 bottom-0" style={{ height: 120, zIndex: 20 }}>
        <ChatBar
          value={input}
          onChange={setInput}
          onSubmit={() => handleSendMessage()}
          onTarot={handleTarotPill}
          onHoroscope={handleHoroscopePill}
          placeholder={chatPlaceholder}
          disabled={!!streamingId}
        />
      </div>

      {/* Ophelia intro overlay */}
      {showOpheliaOverlay && (
        <OpheliaIntroOverlay
          onClose={() => setShowOpheliaOverlay(false)}
          onYesNo={handleYesNo}
          onThreeCard={handleThreeCard}
        />
      )}

      {/* Card selection overlay */}
      {showCardOverlay && (
        <CardSelectionOverlay
          mode={cardMode}
          onClose={() => {
            setShowCardOverlay(false)
            setScreen(cardMode === 'yes_no' ? 'yes_no_question' : 'three_card_question')
          }}
          onCardSelected={handleCardSelected}
          revealText={revealText}
          revealStreaming={revealStreaming}
          onRevealClose={handleCloseReveal}
          onAnotherReading={cardMode === 'yes_no' ? handleAnotherReadingFromReveal : handleAnotherReading}
        />
      )}

      {/* View Reading re-opener */}
      {showCardReveal && (
        <CardRevealOverlay
          reading={revealText}
          isStreaming={revealStreaming}
          onClose={() => setShowCardReveal(false)}
          onAnotherReading={() => {
            setShowCardReveal(false)
            setScreen('reading_choice')
            staggerAdd([
              {
                type: 'ophelia_msg',
                text: "Let\u2019s do another tarot reading. I will be spreading the cards for you today. Before we get deeper into your reading, what type of Tarot card reading would you like to do today?",
              },
              { type: 'tarot_type_selector' },
            ], 400)
          }}
        />
      )}

      {/* Login screen */}
      {onboardingState === 'login' && (typeof window === 'undefined' || localStorage.getItem('dev_bypass') !== 'true') && (
        <LoginScreen onContinue={() => setOnboardingState('done')} />
      )}
    </div>
  )
}
