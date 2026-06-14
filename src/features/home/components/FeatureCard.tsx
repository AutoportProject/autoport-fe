interface FeatureCardProps {
  label: string
  title: string
  description: string
  theme: 'dark' | 'light' | 'blue'
}

const themeClass = {
  dark: 'border-neutral-900 bg-neutral-950 text-white',
  light: 'border-neutral-200 bg-white text-neutral-950',
  blue: 'border-blue-100 bg-blue-50 text-neutral-950',
}

const labelClass = {
  dark: 'text-neutral-400',
  light: 'text-neutral-400',
  blue: 'text-blue-500',
}

const descriptionClass = {
  dark: 'text-neutral-300',
  light: 'text-neutral-500',
  blue: 'text-neutral-600',
}

export default function FeatureCard({
  label,
  title,
  description,
  theme,
}: FeatureCardProps) {
  return (
    <article
      className={`flex min-h-44 flex-col justify-between rounded-lg border p-6 ${themeClass[theme]}`}
    >
      <div>
        <p className={`caption-m-sm ${labelClass[theme]}`}>
          {label}
        </p>

        <h2 className="title-sb-md mt-4 whitespace-pre-line">
          {title}
        </h2>
      </div>

      <p className={`body-m mt-5 break-keep ${descriptionClass[theme]}`}>
        {description}
      </p>
    </article>
  )
}
