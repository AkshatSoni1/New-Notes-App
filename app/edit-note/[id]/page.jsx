import NoteForm from "@/components/NoteForm"

const editNote = ({params}) => {
  return (
    <div className='flex flex-col items-center justify-center my-10'>
      <div className="text-3xl text-blue-950 font-semibold py-5">
        Edit Note
      </div>
      <div>
        <NoteForm
          type="Edit"
        />
      </div>
    </div>
  )
}

export default editNote
