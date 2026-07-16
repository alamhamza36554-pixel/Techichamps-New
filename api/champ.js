// ─────────────────────────────────────────────────────────────
//  "Champ" — Techi Champs AI assistant.
//  Vercel serverless function. The Anthropic API key stays here on
//  the server (env var) and is never exposed to the browser.
// ─────────────────────────────────────────────────────────────
import Anthropic from '@anthropic-ai/sdk'

// Swap to 'claude-haiku-4-5' via the CHAMP_MODEL env var for a cheaper,
// faster widget on high-traffic pages. Default: most capable model.
const MODEL = process.env.CHAMP_MODEL || 'claude-opus-4-8'

const SYSTEM = `You are "Champ", the AI assistant on the Techi Champs website. Techi Champs is a creative digital agency ("Your Digital Champions") — bold ideas, clean code, real impact.

VOICE: friendly, bold, confident, and concise. Warm but never robotic. Match the visitor's language — if they write in Roman Urdu/Hindi, reply in Roman Urdu; if English, reply in English. Keep replies short (2–4 sentences).

WHAT TECHI CHAMPS DOES:
- Services: Web Development, App Development (iOS/Android), AI Solutions, Branding & Identity, Digital Marketing, Logo Design.
- Process: Discover → Plan → Design → Build → Launch.
- Typical timelines: Logo 3–5 business days · Website 1–2 weeks · Branding 2–3 weeks · App 6–12 weeks.
- Guarantees: 30 days free support, client owns all source code & files, 24/7 emergency support, "we work until you're happy". 100% refund before work begins, 50% during concept phase.
- Track record: 500+ projects, 200+ happy clients, 98% satisfaction, 15+ countries.
- Tech: React, Vue, Node, Python, React Native, Flutter, AWS, TensorFlow, and more.
- Contact: info@techichamps.com.

YOUR JOB:
1. Help visitors and answer questions about Techi Champs.
2. Understand their project — naturally ask about their business, goals, timeline, and budget (never interrogate like a form; weave it into conversation).
3. Guide interested visitors to the next step: email info@techichamps.com or book a free consultation.

RULES:
- Only discuss Techi Champs and the visitor's digital/business needs. If asked something unrelated, gently steer back with a friendly line.
- Never invent exact prices. Budgets range from under $1,000 to $50,000+; for a real quote, suggest a free consultation.
- Respond directly with your final answer only — no meta commentary, no "as an AI".
- When it fits, end with a helpful question or a gentle nudge toward starting a project.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(503).json({
      error: 'not_configured',
      reply: "I'm almost ready! The team just needs to plug in my API key. In the meantime, email info@techichamps.com and they'll jump right in. 🙌",
    })
    return
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

    // sanitize + cap the conversation (basic abuse / cost guard)
    const messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter(
        (m) =>
          m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim()
      )
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))

    if (!messages.length || messages[messages.length - 1].role !== 'user') {
      res.status(400).json({ error: 'Send a user message.' })
      return
    }

    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM,
      output_config: { effort: 'low' },
      messages,
    })

    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()

    res.status(200).json({ reply: reply || "Sorry, I didn't quite catch that — could you rephrase?" })
  } catch (err) {
    console.error('Champ error:', err && err.message ? err.message : err)
    res.status(500).json({
      error: 'server_error',
      reply: 'Oops — I hit a snag. Please try again in a moment, or email info@techichamps.com.',
    })
  }
}
