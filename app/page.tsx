'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import StarfieldBg from '@/components/StarfieldBg'
import ChatBar from '@/components/ChatBar'
import HomeCards from '@/components/HomeCards'
import UserBubble from '@/components/UserBubble'
import VedaMessage from '@/components/VedaMessage'
import OpheliaMessage from '@/components/OpheliaMessage'
import OpheliaIntroCard from '@/components/OpheliaIntroCard'
import OpheliaEntered from '@/components/OpheliaEntered'
import ReadingChoiceCards from '@/components/ReadingChoiceCards'
import CardSelectionOverlay from '@/components/CardSelectionOverlay'
import CardRevealResult from '@/components/CardRevealResult'
import ThreeCardResultOverlay from '@/components/ThreeCardResultOverlay'
import HoroscopeContent from '@/components/HoroscopeContent'

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
  text?: string
  reading?: string
  onFollowUp?: (q: string) => void
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
  const [selectedSlots, setSelectedSlots] = useState<number[]>([])
  const [showCardOverlay, setShowCardOverlay] = useState(false)
  const [showThreeCardResult, setShowThreeCardResult] = useState(false)
  const [pendingQuestion, setPendingQuestion] = useState('')
  const [streamingId, setStreamingId] = useState<string | null>(null)
  const [streamingText, setStreamingText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const msgCounter = useRef(0)

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
      setSelectedSlots([])
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
      setSelectedSlots([])
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

  function handleTarotPill() {
    addMessage({ type: 'user', text: 'I want a Tarot reading' })
    setScreen('tarot_loading')
    setTimeout(() => {
      addMessage({ type: 'ophelia_entered' })
      addMessage({ type: 'ophelia_intro' })
      addMessage({
        type: 'ophelia_msg',
        text: "Hi, I'm Ophelia \u2014 your tarot reader. What kind of reading would you like today?",
      })
      addMessage({ type: 'reading_choice' })
      setScreen('reading_choice')
    }, 1200)
  }

  function handleHoroscopePill() {
    addMessage({ type: 'user', text: 'Show me my horoscope' })
    askVeda(
      'Give me a detailed horoscope reading for today. Include cosmic influences and actionable guidance.',
      (reading) => {
        addMessage({
          type: 'horoscope',
          reading,
          onFollowUp: (q) => {
            addMessage({ type: 'user', text: q })
            askVeda(q, () => {})
          },
        })
      }
    )
    setScreen('horoscope')
  }

  function handleYesNo() {
    addMessage({
      type: 'ophelia_msg',
      text: "What's your yes-or-no question? Focus on one specific thing.",
    })
    setScreen('yes_no_question')
  }

  function handleThreeCard() {
    addMessage({
      type: 'ophelia_msg',
      text: 'What area of your life would you like to explore through the past, present, and future?',
    })
    setScreen('three_card_question')
  }

  function handleCardSelected(slotIndex?: number) {
    if (cardMode === 'yes_no') {
      setShowCardOverlay(false)
      askVeda(
        `Do a yes/no tarot card reading for this question: "${pendingQuestion}". The Moon card was drawn. Give an evocative reading.`,
        (reading) => {
          addMessage({
            type: 'card_reveal',
            reading,
            onFollowUp: (q) => {
              addMessage({ type: 'user', text: q })
              askVeda(q, () => {})
            },
          })
          setScreen('card_revealed')
        }
      )
    } else {
      const next = slotIndex ?? 0
      const newSlots = [...selectedSlots, next]
      setSelectedSlots(newSlots)
      if (newSlots.length >= 3) {
        setShowCardOverlay(false)
        setShowThreeCardResult(true)
        askVeda(
          `Do a three-card past/present/future tarot reading for: "${pendingQuestion}". Cards drawn: Moon (Past), Empress (Present), Tower (Future). Give a summarized narrative reading.`,
          (_reading) => {
            setScreen('three_card_result')
          }
        )
      }
    }
  }

  function handleAnotherReading() {
    setShowThreeCardResult(false)
    setScreen('reading_choice')
    addMessage({
      type: 'ophelia_msg',
      text: 'Ready for another reading. What would you like to try?',
    })
    addMessage({ type: 'reading_choice' })
  }

  function handleFollowUp(q: string) {
    addMessage({ type: 'user', text: q })
    askVeda(q, () => {})
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
      className="relative mx-auto overflow-hidden"
      style={{ width: 402, height: '100dvh', maxHeight: '100dvh', backgroundColor: '#0a0a12' }}
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
          {/* Initial home state */}
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
            if (msg.type === 'ophelia_intro') {
              return <OpheliaIntroCard key={msg.id} />
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

      {/* Card selection overlay */}
      {showCardOverlay && (
        <CardSelectionOverlay
          mode={cardMode}
          onClose={() => {
            setShowCardOverlay(false)
            setScreen(cardMode === 'yes_no' ? 'yes_no_question' : 'three_card_question')
          }}
          onCardSelected={handleCardSelected}
          selectedSlots={selectedSlots}
        />
      )}

      {/* Three card result overlay */}
      {showThreeCardResult && (
        <ThreeCardResultOverlay
          reading={
            (messages.findLast?.((m) => m.type === 'veda')?.text) ??
            streamingText ??
            'Reading loading...'
          }
          onClose={() => {
            setShowThreeCardResult(false)
            setScreen('card_revealed')
          }}
          onAnotherReading={handleAnotherReading}
        />
      )}
    </div>
  )
}
