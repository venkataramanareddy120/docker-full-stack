const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || "http://backend:5000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/submit", async (req, res) => {
  try {
    // Express forwards the browser's form data to the Flask service.
    const backendResponse = await fetch(`${BACKEND_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const result = await backendResponse.json();
    res.status(backendResponse.status).json(result);
  } catch (error) {
    console.error("Could not contact Flask backend:", error.message);
    res.status(502).json({
      success: false,
      message: "Cannot reach the Flask backend. Check that both containers are running."
    });
  }
});

app.get("/health", (_req, res) => res.json({ status: "frontend healthy" }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend running on port ${PORT}`);
});
