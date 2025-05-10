export interface Team {
  id: string
  name: string
  shortName: string
  logo: string
  strength: number
  form: string[]
  homeAdvantage: number
}

export const teams: Team[] = [
  {
    id: "team1",
    name: "Manchester United",
    shortName: "MUN",
    logo: "/teams/manchester-united.svg",
    strength: 85,
    form: ["W", "W", "D", "L", "W"],
    homeAdvantage: 1.2,
  },
  {
    id: "team2",
    name: "Liverpool",
    shortName: "LIV",
    logo: "/teams/liverpool.svg",
    strength: 88,
    form: ["W", "W", "W", "D", "W"],
    homeAdvantage: 1.15,
  },
  {
    id: "team3",
    name: "Manchester City",
    shortName: "MCI",
    logo: "/teams/manchester-city.svg",
    strength: 90,
    form: ["W", "W", "W", "W", "D"],
    homeAdvantage: 1.1,
  },
  {
    id: "team4",
    name: "Chelsea",
    shortName: "CHE",
    logo: "/teams/chelsea.svg",
    strength: 86,
    form: ["W", "L", "W", "W", "D"],
    homeAdvantage: 1.18,
  },
  {
    id: "team5",
    name: "Arsenal",
    shortName: "ARS",
    logo: "/teams/arsenal.svg",
    strength: 84,
    form: ["D", "W", "W", "L", "W"],
    homeAdvantage: 1.12,
  },
  {
    id: "team6",
    name: "Tottenham Hotspur",
    shortName: "TOT",
    logo: "/teams/tottenham.svg",
    strength: 83,
    form: ["L", "W", "D", "W", "W"],
    homeAdvantage: 1.14,
  },
]
