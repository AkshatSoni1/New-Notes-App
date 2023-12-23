import connectToDB from "@/utils/database";
import Note from "@/models/note";

export const GET = async (req,{params}) => {
    try {
        await connectToDB();

        const note = await Note.findById(params.id);

        if(!note){
            return new Response("Note not found!", {status:404})
        }
        return new Response(JSON.stringify(note), {status:200})
    } catch (error) {
        return new Response("Cannot find note", {status:500})
    }
}

export const PATCH = async (req, {params}) => {
    const {title, description} = await req.json()

    try {
        await connectToDB();

        const note = await Note.findByIdAndUpdate(params.id,{
            title: title,
            description: description
        })

        await note.save();

        return new Response(JSON.stringify(note), {status:200})
    } catch (error) {
        return new Response("Cannot update note!", {status:500})
    }
}

export const DELETE = async (req,{params}) => {
    try {
        await Note.findByIdAndDelete(params.id)
        return new Response("Note deleted successfully!", { status:200 })
    } catch (error) {
        return new Response("Cannot delete Note!", { status:500 })
    }
}