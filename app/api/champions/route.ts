import { NextResponse } from "next/server"

// Mock data for champions
const champions = [
  {
    id: "1",
    name: "Ahri",
    title: "the Nine-Tailed Fox",
    stats: {
      health: 526,
      mana: 418,
      armor: 20.88,
      attackDamage: 53.04,
      attackSpeed: 0.668,
      moveSpeed: 330,
    },
  },
  {
    id: "2",
    name: "Darius",
    title: "the Hand of Noxus",
    stats: {
      health: 582.24,
      mana: 263,
      armor: 39,
      attackDamage: 64,
      attackSpeed: 0.625,
      moveSpeed: 340,
    },
  },
  {
    id: "3",
    name: "Lux",
    title: "the Lady of Luminosity",
    stats: {
      health: 490,
      mana: 480,
      armor: 18.72,
      attackDamage: 53.54,
      attackSpeed: 0.669,
      moveSpeed: 330,
    },
  },
]

export async function GET() {
  return NextResponse.json(champions)
}

export async function POST(request: Request) {
  try {
    const champion = await request.json()

    // In a real app, you would validate and save to a database
    // For now, we'll just return the champion with a mock ID
    const newChampion = {
      id: Date.now().toString(),
      ...champion,
    }

    return NextResponse.json(newChampion, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create champion" }, { status: 400 })
  }
}
