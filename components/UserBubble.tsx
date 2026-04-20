'use client'

interface UserBubbleProps {
  text: string
}

export default function UserBubble({ text }: UserBubbleProps) {
  return (
    <div className="flex justify-end w-full">
      <div
        className="px-[12px] py-[8px] rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px]"
        style={{
          backgroundImage:
            'linear-gradient(212.91deg, rgba(139, 149, 187, 0.2) 0%, rgba(79, 85, 108, 0.2) 100%)',
          backdropFilter: 'blur(5px)',
          border: '1px solid #4d536b',
        }}
      >
        <p
          className="font-roboto font-normal text-white text-[18px] m-0 whitespace-nowrap"
          style={{ letterSpacing: '-0.54px', fontVariationSettings: "'wdth' 100" }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}
