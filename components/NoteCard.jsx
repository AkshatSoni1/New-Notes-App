'use client'
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const NoteCard = ({title, description}) => {

  const router = useRouter();
  
  return (
    <div className='relative shadow-gray-600 shadow-md bg-gradient-to-r from-gray-700 to-gray-800 text-sky-100 sm:w-60 w-60 lg:w-80 px-8 py-5 rounded-xl max-h-60'>
      {/* <div className="absolute right-6 top-2.5 text-xs text-purple-100">
        1:15 AM Monday
      </div> */}
      <div onClick={()=>router.push("/notes/1")} className=" cursor-pointer">
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
          onClick={() => router.push("/edit-note/1")}
        />
        <MdDelete
          className="cursor-pointer text-red-300 text-2xl hover:shadow-sm hover:text-red-200 me-2"
        />
      </div>
    </div>
  )
}

export default NoteCard
