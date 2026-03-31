import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { role, skills } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Placement Roadmap App"
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-super-120b-a12b:free", // 🔥 stable model
        messages: [
          {
            role: "user",
            content: `
You are a strict JSON generator.

Analyze this student for role: ${role}

Skills:
${JSON.stringify(skills)}

Rules:
- Return ONLY valid JSON
- No explanation
- No markdown
- No extra text

IMPORTANT:
Each recommendation must include:
- text (what to do)
- youtubeQuery (what to search on YouTube)

Format:
{
  "strengths": [],
  "areasToImprove": [],
  "weaknesses": [],
  "recommendations": [
    {
      "text": "",
      "youtubeQuery": ""
    }
  ]
}
`
          }
        ]
      })
    });

    const data = await response.json();

    console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

    // ✅ Correct parsing
    let text = data.choices?.[0]?.message?.content || "";

    console.log("RAW TEXT:", text);

    // ✅ Extract JSON safely
    let parsed = {};

try {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
} catch (e) {
  console.error("JSON PARSE ERROR:", e);
  parsed = {};
}


console.log("FINAL PARSED:", parsed);
res.json({
  strengths: parsed.strengths || [],
  areasToImprove: parsed.areasToImprove || [],
  weaknesses: parsed.weaknesses || [],
  recommendations: parsed.recommendations || []
});

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));