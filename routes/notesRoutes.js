import express from "express";
import {
  getAllNotes,
  createNotes,
  getSingleNotes,
  updateNote,
  deleteNote,
} from "../controllers/notesControllers.js";
import { protect } from "../middlewars/auth.js";
const router = express.Router();

//apis

router.get("/allNotes", protect, getAllNotes);

router.post("/createNotes", protect, createNotes);

router.route("/:id").get(getSingleNotes).put(protect, updateNote).delete(protect,deleteNote);

export default router;
