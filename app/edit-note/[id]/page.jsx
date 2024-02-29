'use client'
import NoteForm from "@/components/NoteForm"
import ShowToast from "@/helper/page"
import { useRouter } from "next/navigation"
import { useState,useEffect } from "react"

const editNote = ({params}) => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const fetchNoteById = async () => {
    const res = await fetch(`/api/notes/${params.id}`)
    const response = await res.json();
    if(res.ok){
      setTitle(response.title)
      setDescription(response.description)
    }
  }
  useEffect(() => {
    fetchNoteById();
  }, [])
  

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/notes/${params.id}`,{
        method: "PATCH",
        body: JSON.stringify({
          title: title,
          description: description
        })
      })
  
      if(res.ok){
        router.push("/")
        ShowToast(true, "Note edited!")
      }
    } catch (error) {
      ShowToast(false, "Cannot edit note!")
      console.log(error)
    }

  }
  return (
    <div className='flex flex-col items-center justify-center my-20'>
      <div className="text-3xl text-blue-950 font-semibold py-5">
        Edit Note
      </div>
      <div>
        <NoteForm
          type="Edit"
          title = {title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          handleSubmit={handleEditSubmit}
        />
      </div>
    </div>
  )
}

export default editNote
