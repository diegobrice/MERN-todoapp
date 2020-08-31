const Note = require("../models/Note");
const notesCtrl = {};

notesCtrl.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};
notesCtrl.createNote = async (req, res) => {
  const { title, content, date, author } = req.body;
  const newNote = new Note({
    title,
    content,
    date,
    author,
  });
  await newNote.save();
  res.json({ message: "Nota añadida" });
};
notesCtrl.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};
notesCtrl.updateNote = async (req, res) => {
  const { title, content, date, author } = req.body;
  await Note.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title,
      content,
      date,
      author,
    }
  );
  res.json({ message: "Nota actualizada" });
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Nota eliminada" });
};

module.exports = notesCtrl;
