import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/* -------- TEMP USER STORAGE -------- */

let currentUser = null;

/* -------- BASIC ROUTES -------- */

app.get("/", (req, res) => {
  res.send("FarmWise backend running 🌱");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend OK 🌾" });
});

/* -------- LOGIN / REGISTER -------- */

app.post("/api/login", (req, res) => {
  const { name, phone, otp, village, district, state, landSize } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({
      success: false,
      message: "Phone and OTP required",
    });
  }

  if (otp !== "1234") {
    return res.status(401).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  /* Save user details */

  currentUser = {
    name: name || "Farmer",
    phone: phone,
    village: village || "Not provided",
    district: district || "Not provided",
    state: state || "Not provided",
    landSize: landSize || "Not provided",
  };

  res.json({
    success: true,
    user: currentUser,
  });
});

/* -------- USER PROFILE -------- */

app.get("/api/user/me", (req, res) => {
  if (!currentUser) {
    return res.status(401).json({
      message: "User not logged in",
    });
  }

  res.json(currentUser);
});

/* -------- CROPS -------- */

app.get("/api/crops", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Rice",
      variety: "Sona Masoori",
      area: "2 acres",
      season: "Kharif 2024",
      status: "Growing",
    },
    {
      id: 2,
      name: "Sugarcane",
      variety: "Co 86032",
      area: "2 acres",
      season: "Annual",
      status: "Harvested",
    },
    
  ]);
});

/* -------- START SERVER -------- */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
