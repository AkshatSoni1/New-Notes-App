import Note from "@/models/note";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {

        await connectToDB();

        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const user = searchParams.get("user");
        
        const notes = await Note.find({ creator: user })

        return new Response(JSON.stringify(notes), { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Cannot fetch notes" }, { status: 500 })
    }
}