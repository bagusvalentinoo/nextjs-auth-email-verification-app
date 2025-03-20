import Image from 'next/image'

type AuthIllustrationProps = {
  src: string
  alt: string
  width?: number
  height?: number
}

export const AuthIllustration = ({
  src,
  alt,
  width,
  height
}: AuthIllustrationProps) => {
  return (
    <div className="relative hidden bg-muted  lg:flex lg:items-center lg:justify-center">
      <Image
        src={src}
        alt={alt}
        width={width ?? 500}
        height={height ?? 500}
        style={{ width: 'auto', height: 'auto' }}
        priority
        className="object-cover"
      />
    </div>
  )
}
