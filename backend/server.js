const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // Allow specific origin if defined
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Connect to MongoDB
connectDB();

// Health check route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Admin routes
app.use("/api/admin", adminRoutes);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found." });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal server error." });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
