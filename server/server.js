const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const formRoutes = require("./routes/formRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// docs
if (process.env.NODE_ENV !== "production") {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Routes
app.use("/api/forms", formRoutes);
app.use("/api/careers", require("./routes/careersRoutes"));

// Auth routes (no token required)
app.use("/api/auth", require("./routes/authRoutes"));

// Public webhook for Admin Portal status updates (no auth required)
app.post("/api/webhook/status-update", require("./controllers/adminController").handleStatusUpdate);

// Admin routes (with admin middleware)
app.use(
  "/api/admin",
  authMiddleware,
  adminMiddleware,
  require("./routes/adminRoutes"),
);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("VNEST Incubation Application API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
