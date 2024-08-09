import Notes from "../models/noteModels.js";
import asyncHandeler from "express-async-handler";

export const getAllNotes = asyncHandeler(async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user._id });

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found for this user" });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

export const createNotes = asyncHandeler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400).json({ message: "Please fill in all fields" });
    throw new Error("Please fill in all fields");
  } else {
    const note = new Notes({ user: req.user._id, title, content, category });
    const createdNote = await note.save();
    res.status(200).json(createdNote);
  }
});

export const getSingleNotes = asyncHandeler(async (req, res) => {
  const noteId = req.params.id;
  const note = await Notes.findById(noteId);
  if (note) {
    res.status(200).json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

export const updateNote = asyncHandeler(async (req, res) => {
  const noteId = req.params.id;
  const note = await Notes.findById(noteId);
  if (!note) {
    res.status(404).json({ message: "Note not found" });
    throw new Error("Note not found");
  } else {
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(400).json("You can not perform this action");
      throw new Error("You can not perform this action");
    }
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      res.status(400).json({ message: "Please fill in all fields" });
      throw new Error("Please fill in all fields");
    }
    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;
      const updatedNote = await note.save();
      res.status(200).json(updatedNote);
    }
  }
});

export const deleteNote = asyncHandeler(async (req,res) => {
    const noteId = req.params.id;
    const note = await Notes.findById(noteId);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      throw new Error("Note not found");
    } else {
      if (note.user.toString() !== req.user._id.toString()) {
        res.status(400).json("You can not perform this action");
        throw new Error("You can not perform this action");
      }
        await Notes.findByIdAndDelete(noteId);
        res.status(200).json({message:"Note Remove"})
      
    }
});
