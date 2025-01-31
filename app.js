const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/innovation-day", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define Schemas
const visitorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const participantSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  teamLeader: String,
  teamMembers: [String]
});

// Create Models
const Visitor = mongoose.model("Visitor", visitorSchema);
const Participant = mongoose.model("Participant", participantSchema);

// Register Visitor
app.post("/register/visitor", (req, res) => {
  const { name, email, password } = req.body;

  const newVisitor = new Visitor({ name, email, password });
  newVisitor.save()
    .then(() => res.json({ message: "Visitor registered successfully" }))
    .catch((err) => res.status(400).json({ error: "Error registering visitor" }));
});

// Register Participant
app.post("/register/participant", (req, res) => {
  const { name, email, password, teamLeader, teamMembers } = req.body;

  const newParticipant = new Participant({ name, email, password, teamLeader, teamMembers });
  newParticipant.save()
    .then(() => res.json({ message: "Participant registered successfully" }))
    .catch((err) => res.status(400).json({ error: "Error registering participant" }));
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
