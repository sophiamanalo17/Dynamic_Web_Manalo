// an individual image with a div wrapped around for styling purposes
// receives an individual image as props
const ImageItem = (props) => {
  const {image} = props

  //fallbacks ifg the image doesn't have an alt description or description
  const description = image.alt_description || image.description || 'Untitled photo'
  const photographer = image.user
  const attributionUrl = photographer?.links?.html || image.links?.html
  const photographerName = photographer?.name || photographer?.username || 'View on Unsplash'

  return (
    <div>
      <img src={image.urls.small} alt={image.alt_description} />
      <p>
        {description}{' '}
        {attributionUrl && (
          <>
            shot by{' '}
            <a href={attributionUrl} target="_blank" rel="noreferrer">
              {photographerName}
            </a>
          </>
        )}
      </p>
    </div>
  )
}

export default ImageItem
