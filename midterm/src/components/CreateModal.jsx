// a reusable pop-up. Whatever you put between <CreateModal> and </CreateModal> shows up
// inside it -- React hands that to us as props.children
const CreateModal = (props) => {
  const {title, onClose, children} = props

  //something to note: book info not prop drilled here bc it js displays based on onClosed(which is false if showing). 
  return (
    // fixed inset-0 = cover the whole screen. bg-black/40 = 40% see-through dark layer
    // clicking this dark backdrop closes the modal
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
    >
      {/* stopPropagation: a click INSIDE the white box shouldn't count as a
          click on the backdrop behind it, or typing in an input would close it */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl bg-[#f5efe3] p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CreateModal
