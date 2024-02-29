"use client"
import NoteForm from '@/components/NoteForm'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppContext } from '@/context/AppContext/page'
import ShowToast from '@/helper/page'

const createNote = () => {
  const { user } = useContext(AppContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/notes/new',{
        method:"POST",
        body: JSON.stringify({
          creator: user,
          title: title,
          description: description
        })
      });
      let response = await res.json()
      if(res.ok){
        router.push("/");
        setTitle('')
        setDescription('')
        ShowToast(true, "Note created!")
      }
      else{
        console.log(res)
        ShowToast(false, response.message)
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='flex flex-col items-center justify-center my-20'>
      <div className="text-3xl text-blue-950 font-semibold py-5">
        Create Note
      </div>
      <div>
        <NoteForm
          type="Create"
          title = {title}
          description = {description}
          setTitle={setTitle}
          setDescription = {setDescription}
          handleSubmit = {handleCreateSubmit}
        />
      </div>
    </div>
  )
}

export default createNote
