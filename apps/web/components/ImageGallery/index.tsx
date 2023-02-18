import { IImage } from "common"
import Image from "next/image"
import { useRef } from "react"

type ImageGalleryProps = {
  images: IImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col items-center flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <div
              ref={(image) => imageRefs.current.push(image)}
              key={image._id}
              className="relative flex justify-center aspect-[29/34] w-full"
              id={image._id}
            >
              <Image
                src={image.url}
                width={200}
                height={300}
                priority={index <= 2 ? true : false}
                className="absolute inset-0"
                alt={`Product image ${index + 1}`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
