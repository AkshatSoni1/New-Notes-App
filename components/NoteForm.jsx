

const NoteForm = ({type, title, description, setTitle, setDescription, handleSubmit}) => {
  return (
    <form 
    className='border border-black flex flex-col gap-4 justify-center items-center w-96 py-12 px-12 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 shadow-sm shadow-black'
    onSubmit={handleSubmit}
    >
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="" className='text-cyan-100'>Title</label>
          <input
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
            type='text'
            placeholder='Title for your note'
            className='px-2 py-1 rounded-md shadow-gray-600 shadow-sm text-gray-700 bg-cyan-50'
          />
        </div>
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="" className='text-cyan-100'>Description</label>
        <textarea
        value={description}
        onChange={(e)=> setDescription(e.target.value)}
          type='text'
          placeholder="Add something here.."
          className='px-2 py-1 rounded-md shadow-gray-600 shadow-sm text-gray-700 bg-cyan-50 h-40'
        />
      </div>

      <div className="flex flex-row gap-4">
        {type === "Edit" &&<div className="">
          <button
            type='submit'
            className='border border-red-200 px-7 py-3.5 text-red-200 mt-5 rounded-md hover:bg-red-200 hover:text-gray-600 hover:shadow-sm hover:shadow-gray-600 transition-all duration-200 hover:transition-all hover:duration-200 font-bold'
          >Cancel</button>
        </div>
  }
      <div className="">
        <button
          type='submit'
          className='border border-cyan-200 px-7 py-3.5 text-cyan-200 mt-5 rounded-md hover:bg-cyan-200 hover:text-gray-600 hover:shadow-sm hover:shadow-gray-600 transition-all duration-200 hover:transition-all hover:duration-200 font-bold'
        >{type}</button>
      </div>
      </div>
    </form>
  )
}

export default NoteForm
