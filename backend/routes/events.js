const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Modèle Event simple (si tu n'as pas models/Event.js)
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: String, required: true },
    time: { type: String, default: "" },
    category: { type: String, default: "Général" },
    capacity: { type: Number, default: null },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

// GET /api/events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST /api/events
router.post("/", async (req, res) => {
  try {
    const { title, description, date, time, category, capacity } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Titre et date obligatoires." });
    }

    const created = await Event.create({
      title,
      description,
      date,
      time,
      category,
      capacity,
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: "Erreur création événement" });
  }
});

// DELETE /api/events/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Événement introuvable." });
    }

    res.json({ message: "Événement supprimé." });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression événement" });
  }
});

module.exports = router;

