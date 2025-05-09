import { NextResponse } from "next/server"

// Mock data for items
const items = [
  {
    id: "1",
    name: "B.F. Sword",
    description: "Greatly increases Attack Damage.",
    cost: 1300,
    stats: {
      attackDamage: 40,
    },
  },
  {
    id: "2",
    name: "Needlessly Large Rod",
    description: "Greatly increases Ability Power.",
    cost: 1250,
    stats: {
      abilityPower: 60,
    },
  },
  {
    id: "3",
    name: "Ruby Crystal",
    description: "Increases Health.",
    cost: 400,
    stats: {
      health: 150,
    },
  },
]

export async function GET() {
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  try {
    const item = await request.json()

    // In a real app, you would validate and save to a database
    // For now, we'll just return the item with a mock ID
    const newItem = {
      id: Date.now().toString(),
      ...item,
    }

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create item" }, { status: 400 })
  }
}
