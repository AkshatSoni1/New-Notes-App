'use client'

import { useRouter } from "next/navigation"

const NoteForm = ({type, title, description, setTitle, setDescription, handleSubmit}) => {
  const router = useRouter();
  return (
    <form 
    className=' z-10 border border-black flex flex-col gap-4 justify-center items-center w-80 lg:w-96 py-8 px-8 rounded-xl bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 shadow-sm shadow-black'
    onSubmit={handleSubmit}
    >
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="" className='text-cyan-100'>Title</label>
          <input
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
            type='text'
            placeholder='Title for your note'
            className=' z-10 outline-none px-2 py-1 rounded-md text-gray-700 bg-cyan-50'
            required
          />
        </div>
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="" className='text-cyan-100'>Description</label>
        <textarea
        value={description}
        onChange={(e)=> setDescription(e.target.value)}
          type='text'
          placeholder="Add something here.."
          className=' z-10 outline-none px-2 py-1 rounded-md text-gray-700 bg-cyan-50 h-40'
          required
        />
      </div>

      <div className="flex flex-row gap-4">
        {type === "Edit" &&<div className="">
          <button
            type='button'
            className=' z-10 border border-red-300 px-7 py-3.5 text-red-300 mt-5 rounded-md hover:z-10 hover:bg-red-200 hover:text-gray-600 shadow-sm shadow-black transition-all duration-200 hover:transition-all hover:duration-200 font-semibold text-sm tracking-widest'
            onClick={()=> router.push("/")}
          >Cancel</button>
        </div>
  }
      <div className="">
        <button
          type='submit'
          className=' z-10 border border-cyan-300 px-7 py-3.5 text-cyan-300 mt-5 rounded-md hover:z-10 hover:bg-cyan-200 hover:text-gray-600 shadow-sm shadow-black transition-all duration-200 hover:transition-all hover:duration-200 font-semibold text-sm tracking-widest'
        >{type}</button>
      </div>
      </div>
    </form>
  )
}

export default NoteForm
