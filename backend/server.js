require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express(); // ✅ IMPORTANT : avant les app.use()

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const appointmentRoutes = require("./routes/appointments");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/appointments", appointmentRoutes);

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Serveur lancé sur le port", process.env.PORT || 3000);
    });
  })
  .catch((err) => console.error("Erreur MongoDB:", err));
