"use client"
import { useContext } from "react";
import NoteCard from "./NoteCard"
import { AppContext } from "@/context/AppContext/page";
import { useState, useEffect } from "react";

const NoteCardList =({data}) => {
    const { user } = useContext(AppContext)
    return(
        <>
        {data.map((note)=>(
            (note.creator === user) &&
            <NoteCard 
                key={note._id}
                title={note.title}
                description={note.description}
            />
        ))}
        </>
    )
}

const Feed = () => {
        
    const { isLoggedIn, user } = useContext(AppContext);
    const [allNotes, setAllNotes] = useState([])
    // console.log(user)

    const fetchPosts = async () => {
        console.log(user)
        const res = await fetch(`/api/notes?user=${user}`)
        const data = await res.json();
        console.log(data)
        setAllNotes(data);
    }

    useEffect(() => {
        console.log(user)
        if(!user) return
        fetchPosts();
    }, [user, isLoggedIn])

    useEffect(() => {
        console.log(user)
    }, [isLoggedIn])

    return (
        <>
            <section>
                {isLoggedIn ?
                    <>
                        <div className="">
                            <h1 className='text-center text-4xl my-5 font-bold text-amber-600'>
                                Hey Buddy👋
                            </h1>
                        </div>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                className="mb-10 px-4 py-2 rounded-lg w-[25rem] shadow-sm shadow-gray-800 text-sm"
                                placeholder="Search a note!"
                            />
                        </div>
                        <div className="border-t py-4 border-slate-300 flex flex-wrap justify-center gap-5">
                            {allNotes && <NoteCardList 
                                data={allNotes}
                            />}
                        </div>
                    </>
                    :
                    <div className="flex items-center justify-center flex-col h-[70vh]">
                        <div className="">
                            <h1 className='text-center text-4xl my-5 font-bold text-yellow-600'>
                            Welcome
                            </h1>
                        </div>
                        <div className="text-center text-2xl font-bold">
                            Add notes by logging in first😉
                        </div>
                    </div>
                }
            </section>

        </>
    )
}

export default Feed
