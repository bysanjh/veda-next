const MOCK_RESPONSES: Record<string, string> = {
  tarot_intro: `Tarot is the quickest way to cut through the noise on this. Ophelia's who you want — she reads with real precision. Let me bring her into our chat.`,

  horoscope: `The cosmos are aligning in your favor today, Sanjhal. With the New Moon conjunct your natal Sun, you're standing at the start of a meaningful personal cycle — a moment to plant seeds, not harvest them. Jupiter's trine to your Sun is expanding what's possible right now, so lean into optimism. Saturn squaring your Mars is asking you to act with intention, not impulse.`,

  tomorrow: `Tomorrow carries Mercury sharpening its focus after weeks of scattered signals, Sanjhal. Your mind will be clearer than it's been — use the morning for anything requiring real precision. By evening the emotional currents deepen; check in with what you actually need, not just what you think you should want. Rest is not delay.`,

  love: `In love and connection, Neptune's influence is doing something quiet and profound — softening the walls you didn't realize you'd built, Sanjhal. Someone is seeing you more clearly than you're letting yourself be seen. There's an invitation here to let that in. Vulnerability isn't risk — it's the door.`,

  money: `Saturn's steady presence in your financial sector is not glamorous, but it is generous in the long run. This is a season for consolidation, not expansion — review what you already have before reaching for more. An opportunity involving a creative skill carries real potential, but requires patience. Protect your resources now; they'll matter more later than you realize.`,

  making_the_move: `Making the move requires one thing above all else: deciding that uncertainty is not a reason to wait. Your chart shows Venus moving into a supportive angle with Mars this week — a rare window where courage and desire align. Start smaller than feels significant: one honest conversation, one email sent, one boundary named. The stars don't reward perfection, they reward movement.`,

  yes_no: `You've pulled The Moon card — and she speaks in shadows and whispers. This is not a simple yes. The Moon asks you to look beneath the surface: there's something you already sense but haven't fully acknowledged. Move forward only with honesty and clear intention, Sanjhal — illusion won't serve you here.`,

  three_card: `The Moon in your past reflects a period of confusion and hidden truths — you moved through fog, making decisions without full clarity. The Empress in your present signals you're stepping into something powerful: abundance, self-trust, and creative energy are available right now. The Tower in your future is not a warning — it's a promise that what breaks apart was already unstable, and what crumbles makes space for something far more solid. You are exactly where you need to be, Sanjhal.`,

  confusion: `Moving through confusion starts with stopping the attempt to resolve it too quickly. The Moon's energy in your reading asks you to sit with uncertainty just a little longer — clarity is coming, but it arrives in its own time. Journal what you feel, not what you think you should feel. Trust the part of you that already knows.`,

  career: `The Moon card does carry a whisper about your professional path, Sanjhal. Hidden information or unclear intentions from others may be affecting things beneath the surface. With Saturn squaring your Mars right now, rushing a career move could lead to missteps — patience and sharp observation are your best tools. The fog lifts by mid-May.`,

  default: `The energy surrounding your question is layered in the way only the most meaningful questions tend to be, Sanjhal. What I sense in the cosmic patterns right now is a push toward clarity — you've been holding multiple truths at once. The stars favor decisiveness over deliberation this week. What's one thing you could do today that your future self would thank you for?`,
}

function pickResponse(messages: { role: string; content: string }[]): string {
  const last = messages[messages.length - 1]?.content?.toLowerCase() ?? ''

  if (last.includes('tarot reading') && last.length < 20) return MOCK_RESPONSES.tarot_intro
  if (last.includes('horoscope') || last.includes('daily horoscope')) return MOCK_RESPONSES.horoscope
  if (last.includes('tomorrow')) return MOCK_RESPONSES.tomorrow
  if (last.includes('love') || last.includes('relationship') || last.includes('partner')) return MOCK_RESPONSES.love
  if (last.includes('money') || last.includes('financial')) return MOCK_RESPONSES.money
  if (last.includes('making the move') || last.includes('make the move')) return MOCK_RESPONSES.making_the_move
  if (last.includes('yes/no') || last.includes('yes or no') || (last.includes('moon') && last.includes('drawn'))) return MOCK_RESPONSES.yes_no
  if (last.includes('three-card') || last.includes('past') && last.includes('present') && last.includes('future')) return MOCK_RESPONSES.three_card
  if (last.includes('confusion') || last.includes('move through')) return MOCK_RESPONSES.confusion
  if (last.includes('career') || last.includes('impact')) return MOCK_RESPONSES.career

  return MOCK_RESPONSES.default
}

export async function POST(request: Request) {
  const { messages } = await request.json()
  const text = pickResponse(messages)
  const words = text.split(' ')

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      // Brief pause before first word — simulates thinking
      await new Promise((r) => setTimeout(r, 320))
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i]
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`)
        )
        await new Promise((r) => setTimeout(r, 26 + Math.random() * 20))
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
