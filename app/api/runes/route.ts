import { NextResponse } from "next/server"

// Mock data for runes
const runes = [
  {
    id: "1",
    name: "Press the Attack",
    description:
      "Hitting an enemy champion 3 consecutive times makes them vulnerable, dealing bonus damage and causing them to take more damage from all sources for 6s.",
    path: "Precision",
    tier: 1,
  },
  {
    id: "2",
    name: "Electrocute",
    description: "Hitting a champion with 3 separate attacks or abilities within 3s deals bonus adaptive damage.",
    path: "Domination",
    tier: 1,
  },
  {
    id: "3",
    name: "Summon Aery",
    description: "Your attacks and abilities send Aery to a target, damaging enemies or shielding allies.",
    path: "Sorcery",
    tier: 1,
  },
]

export async function GET() {
  return NextResponse.json(runes)
}

export async function POST(request: Request) {
  try {
    const rune = await request.json()

    // In a real app, you would validate and save to a database
    // For now, we'll just return the rune with a mock ID
    const newRune = {
      id: Date.now().toString(),
      ...rune,
    }

    return NextResponse.json(newRune, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create rune" }, { status: 400 })
  }
}
