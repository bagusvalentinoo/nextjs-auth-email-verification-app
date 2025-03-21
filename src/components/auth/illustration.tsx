import Image from 'next/image'

type AuthIllustrationProps = {
  src: string
  alt: string
  containerWidth?: string
  containerHeight?: string
}

export const AuthIllustration = ({
  src,
  alt,
  containerWidth = '50%',
  containerHeight = '50%'
}: AuthIllustrationProps) => {
  return (
    <div className="relative hidden bg-muted  lg:flex lg:items-center lg:justify-center">
      <div
        style={{
          position: 'relative',
          width: containerWidth,
          height: containerHeight
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  )
}
