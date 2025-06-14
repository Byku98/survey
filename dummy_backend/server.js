const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Enable CORS for all routes and origins
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true // if you're using cookies (optional)
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Route for admin authentication
app.post("/admin/auth", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    return res.json({ token: "admin-token-123" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// Route for responder login
app.post("/responder/login", (req, res) => {
  const { idToken } = req.body;

//  if (typeof idToken === "string" && idToken.length > 10) {
//    return res
//      .status(200)
//      .json({ message: "Responder logged in", token: "responder-jwt-token" });
//  }


  return res.json({ token: idToken });

  //res.status(400).json({ message: "Invalid token" });
});

app.post("/survey", (req, res) => {
  console.log("Received survey data:", req.body);
  return res.json(req.body); // send back request body as response
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});