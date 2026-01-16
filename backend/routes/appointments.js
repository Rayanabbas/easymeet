const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const Appointment = require("../models/Appointment");

// ✅ GET /api/appointments  -> mes rendez-vous
router.get("/", auth, async (req, res) => {
  try {
    const items = await Appointment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ POST /api/appointments -> prendre rdv
router.post("/", auth, async (req, res) => {
  try {
    const { reason, date, time } = req.body;

    if (!reason || !date || !time) {
      return res.status(400).json({ message: "Motif, date et heure requis." });
    }

    // (simple anti-doublon) même user + même date + même time
    const exists = await Appointment.findOne({
      userId: req.user.id,
      date,
      time,
      status: "confirmed",
    });

    if (exists) {
      return res.status(409).json({ message: "Tu as déjà un rendez-vous sur ce créneau." });
    }

    const created = await Appointment.create({
      userId: req.user.id,
      reason: String(reason).trim(),
      date,
      time,
      status: "confirmed",
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: "Erreur création rendez-vous" });
  }
});

// ✅ DELETE /api/appointments/:id -> annuler rdv (soft cancel)
router.delete("/:id", auth, async (req, res) => {
  try {
    const appt = await Appointment.findOne({ _id: req.params.id, userId: req.user.id });
    if (!appt) return res.status(404).json({ message: "Rendez-vous introuvable." });

    appt.status = "canceled";
    await appt.save();

    res.json({ message: "Rendez-vous annulé." });
  } catch (err) {
    res.status(500).json({ message: "Erreur annulation" });
  }
});

module.exports = router;
