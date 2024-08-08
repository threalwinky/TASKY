import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name : String,
    done : Boolean,
},
{
    timestamps: true,
})

export const taskModel = mongoose.model("task", taskSchema)