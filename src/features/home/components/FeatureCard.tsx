interface FeatureCardProps {
  label: string
  title: string
  theme: 'dark' | 'light' | 'blue'
}

const themeClass = {
  dark: 'bg-neutral-900 text-white',
  light: 'bg-neutral-100 text-black',
  blue: 'bg-[#E8F1FF] text-black',
}

export default function FeatureCard({
  label,
  title,
  theme,
}: FeatureCardProps) {
  return (
    <article
      className={`flex flex-col justify-between rounded-[36px] p-8 ${themeClass[theme]}`}
    >
      <div>
        <p className="caption-m-lg opacity-60">
          {label}
        </p>

        <h2 className="title-bold mt-6 whitespace-pre-line">
          {title}
        </h2>
      </div>
    </article>
  )
}