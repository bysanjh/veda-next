'use client'

interface ChatSystemMessageProps {
  text: string
}

export default function ChatSystemMessage({ text }: ChatSystemMessageProps) {
  return (
    <div className="flex justify-center items-center msg-in" style={{ padding: '2px 0' }}>
      <p
        className="font-roboto font-normal m-0"
        style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.30)',
          letterSpacing: '-0.36px',
          fontStyle: 'italic',
          fontVariationSettings: "'wdth' 100",
        }}
      >
        {text}
      </p>
    </div>
  )
}
