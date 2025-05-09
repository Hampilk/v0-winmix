import { NextResponse } from "next/server"

// Mock data for spells
const spells = [
  {
    id: "1",
    name: "Flash",
    description: "Teleports your champion a short distance toward your cursor's location.",
    cooldown: 300,
    range: 400,
  },
  {
    id: "2",
    name: "Ignite",
    description: "Ignites target enemy champion, dealing true damage over 5 seconds and applying Grievous Wounds.",
    cooldown: 180,
    range: 600,
  },
  {
    id: "3",
    name: "Teleport",
    description: "After channeling for 4 seconds, teleports your champion to target allied structure, minion, or ward.",
    cooldown: 360,
    range: 25000,
  },
]

export async function GET() {
  return NextResponse.json(spells)
}

export async function POST(request: Request) {
  try {
    const spell = await request.json()

    // In a real app, you would validate and save to a database
    // For now, we'll just return the spell with a mock ID
    const newSpell = {
      id: Date.now().toString(),
      ...spell,
    }

    return NextResponse.json(newSpell, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create spell" }, { status: 400 })
  }
}
