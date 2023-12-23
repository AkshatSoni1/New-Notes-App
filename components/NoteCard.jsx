'use client'
import { AppContext } from "@/context/AppContext/page";
import ShowToast from "@/helper/page";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const NoteCard = ({ title, description, id}) => {
  const { setCount } = useContext(AppContext)

  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure to delete this note?')
    if(confirmDelete){
      try {
        const res = await fetch(`/api/notes/${id}`,{
          method:"DELETE"
        })
        if(res.ok){
          setCount((count)=> count+1)
          ShowToast(true, "Note deleted!")
        }
      } catch (error) {
        console.log(error)
        ShowToast(false, "Cannot delete note!")
      }
    }
  }
  
  return (
    <div className='flex flex-col shadow-gray-600 shadow-md bg-gradient-to-r from-gray-900 to-gray-800 text-sky-100 w-80 px-8 py-2 pt-5 rounded-xl max-h-60'>
      {/* <div className="absolute right-6 top-2.5 text-xs text-purple-100">
        1:15 AM Monday
      </div> */}
      <div onClick={()=>router.push(`/notes/${id}`)} className="flex-1 cursor-pointer">
      <div className="">
        <h2 className='text-2xl text-cyan-100 font-semibold truncate mb-2'>
          {title}
        </h2>
      </div>
      <div className="text-sm text-white">
        <p className="truncate_text">{description}</p>
      </div>
      </div>
      <div className="my-4 flex items-center gap-4 justify-end">
        <FaEdit
          className="cursor-pointer text-gray-300 text-xl hover:text-white"
          onClick={() => router.push(`/edit-note/${id}`)}
        />
        <MdDelete
          className="cursor-pointer text-red-300 text-2xl hover:shadow-sm hover:text-red-200 me-2"
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

export default NoteCard
