import Note from "@/models/note";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const {creator, title, description} = await req.json();
    try {
        await connectToDB();

        const newNote = new Note({
            creator,
            title,
            description
        })

        await newNote.save();

        return NextResponse.json({newNote}, {status:200})

    } catch (error) {
        return NextResponse.json({message: "Can't create a note"},{status:500})
    }
}