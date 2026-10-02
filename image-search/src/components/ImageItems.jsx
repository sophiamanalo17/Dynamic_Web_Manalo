//individual items w div wrapped for style purposes
const ImageItem = (props) => {
    const {image} = props

    return <img src={image.urls.small} alt={image.alt_description}/>

}

export default ImageItem