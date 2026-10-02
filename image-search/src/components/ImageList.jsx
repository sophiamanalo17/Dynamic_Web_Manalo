//receive data as prop here and map through them

import ImageItems from './ImageItems'

const ImageList = (props) =>  {
    const {images} = props
    console.log(images)


    const renderedImages = images.map((img) => (
        <ImageItems key={img.id} image={img} />
    ))

    return <div>{renderedImages}</div>
}

export default ImageList