export interface Pattern {
  id: string
  name: string
  description: string
  applicability: number // 0-1 scale
}

export const patterns = [
  {
    id: "pattern1",
    name: "High Press",
    description: "Teams that employ high pressing tend to dominate possession but may be vulnerable to counter-attacks",
    applicability: 0.85,
  },
  {
    id: "pattern2",
    name: "Counter Attack",
    description: "Teams that excel at counter-attacking often perform well against possession-based teams",
    applicability: 0.78,
  },
  {
    id: "pattern3",
    name: "Possession Based",
    description:
      "Teams that maintain high possession can control the game tempo but may struggle against organized defenses",
    applicability: 0.82,
  },
  {
    id: "pattern4",
    name: "Set Piece Dominance",
    description: "Teams with strong set piece tactics often score from corners and free kicks",
    applicability: 0.75,
  },
]
