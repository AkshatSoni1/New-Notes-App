"use client"
import { useContext } from "react";
import NoteCard from "./NoteCard"
import { AppContext } from "@/context/AppContext/page";
import { useState, useEffect } from "react";

const NoteCardList = ({ data }) => {
    const { user } = useContext(AppContext)
    return (
        <>
            {data.map((note) => (
                (note.creator === user) &&
                <NoteCard
                    key={note._id}
                    title={note.title}
                    description={note.description}
                    id={note._id}
                />
            ))}
        </>
    )
}

const Feed = () => {

    const { isLoggedIn, user, count } = useContext(AppContext);
    const [allNotes, setAllNotes] = useState([])
    

    //search
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPosts = async () => {
        // console.log(user)
        const res = await fetch(`/api/notes?user=${user}`)
        const data = await res.json();
        // console.log(data)
        setAllNotes(data);
    }

    useEffect(() => {
        if (!user) return
        fetchPosts();
    }, [user, count])

    const filterNotes = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allNotes.filter(
            (item) =>
                regex.test(item.title) ||
                regex.test(item.description)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterNotes(e.target.value);
                setSearchedResults(searchResult);
            }, 200)
        );
    };

    return (
        <>
            <section>
                {isLoggedIn ?
                    <>
                        <div className="">
                            <h1 className='mt-24 text-center text-4xl my-5 font-bold text-amber-600'>  {/* mt-10 */}
                                Hey Buddy👋
                            </h1>
                        </div>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                value={searchText}
                                onChange={handleSearchChange}
                                className=" z-10 outline-none mb-10 px-4 py-2 rounded-lg w-[25rem] shadow-sm shadow-gray-300 md:shadow-sm md:shadow-gray-500 text-sm"
                                placeholder="Search a note!"
                            />
                        </div>
                        <div className="border-t py-4 border-slate-300 flex flex-wrap justify-center gap-5">
                            {(allNotes.length === 0) && <div className="z-10 text-xl sm:text-3xl">
                                <h1 className="text-slate-700 my-3">Nothing to show here.. <span className="relative sm:hidden"><br/></span>Create some new notes!</h1>
                            </div>
                            }
                            {searchText ? (
                                <NoteCardList
                                    data={searchedResults}
                                />
                            ) : (
                                <NoteCardList
                                    data={allNotes}
                                />
                            )}

                        </div>
                    </>
                    :
                    <div className="flex items-center justify-center flex-col h-[70vh]">
                        <div className="">
                            <h1 className='text-center text-4xl my-5 font-bold text-yellow-600'>
                                Welcome
                            </h1>
                        </div>
                        <div className="text-center text-2xl text-slate-700 font-bold">
                            Add notes by logging in first😉
                        </div>
                    </div>
                }
            </section>

        </>
    )
}

export default Feed
