import express from "express";
import { db } from "./config/db.js";
import { cars } from "./config/schema.js";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  console.log("Server is running successfully");
  res.send("Hello from API 🚀");
});

// Create a new car
app.post("/cars", async (req, res) => {
  try {
    const { make, name, model, year, price } = req.body;

    // Validate required fields
    if (!make || !name || !model || !year || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    // Insert into database
    const [newCar] = await db
      .insert(cars)
      .values({ make, name, model, year, price })
      .returning();

    res.status(201).json({
      success: true,
      data: newCar,
    });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/cars", async (req, res) => {
  const AllCars = await db.select().from(cars);
  res.json(AllCars);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
