'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
const specificNote = ({params}) => {
  const [note, setNote] = useState({
    title:'',
    description:''
  })
  const router = useRouter()

  const fetchSpecificPost = async () => {
    try {
      const res = await fetch(`/api/notes/${params.id}`)
      const response = await res.json()
      if(res.ok){
        setNote({...note, title: response.title, description: response.description})
        console.log(note)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSpecificPost();
  }, [])

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
    <div className='flex flex-col w-full sm:w-1/3 border border-purple-400 shadow-md shadow-black  p-10 gap-2 rounded-2xl my-8 bg-gray-900 min-h-fit'
      onDoubleClick={()=> router.push(`/edit-note/${params.id}`)}
    >
      <div className="">
        <h1 className='overflow-clip text-2xl font-bold text-cyan-200'>{note.title}</h1>
      </div>
      <div className="">
        <div className='overflow-auto text-white'>{note.description}</div>
      </div>
    </div>
    </div>
  )
}

export default specificNote
