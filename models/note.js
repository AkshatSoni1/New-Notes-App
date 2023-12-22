import { Schema, models, model } from "mongoose";

const NoteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    // to add date functionality
})

const Note = models.Note || model('Note', NoteSchema)
export default Note;