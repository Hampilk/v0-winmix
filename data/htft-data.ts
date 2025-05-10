export interface HTFTData {
  teamId: string
  data: {
    htWin_ftWin: number
    htWin_ftDraw: number
    htWin_ftLoss: number
    htDraw_ftWin: number
    htDraw_ftDraw: number
    htDraw_ftLoss: number
    htLoss_ftWin: number
    htLoss_ftDraw: number
    htLoss_ftLoss: number
  }
}

export const htftData: HTFTData[] = [
  {
    teamId: "team1",
    data: {
      htWin_ftWin: 75,
      htWin_ftDraw: 15,
      htWin_ftLoss: 10,
      htDraw_ftWin: 35,
      htDraw_ftDraw: 45,
      htDraw_ftLoss: 20,
      htLoss_ftWin: 15,
      htLoss_ftDraw: 25,
      htLoss_ftLoss: 60,
    },
  },
  {
    teamId: "team2",
    data: {
      htWin_ftWin: 80,
      htWin_ftDraw: 12,
      htWin_ftLoss: 8,
      htDraw_ftWin: 40,
      htDraw_ftDraw: 40,
      htDraw_ftLoss: 20,
      htLoss_ftWin: 18,
      htLoss_ftDraw: 22,
      htLoss_ftLoss: 60,
    },
  },
  {
    teamId: "team3",
    data: {
      htWin_ftWin: 85,
      htWin_ftDraw: 10,
      htWin_ftLoss: 5,
      htDraw_ftWin: 45,
      htDraw_ftDraw: 40,
      htDraw_ftLoss: 15,
      htLoss_ftWin: 20,
      htLoss_ftDraw: 25,
      htLoss_ftLoss: 55,
    },
  },
  {
    teamId: "team4",
    data: {
      htWin_ftWin: 78,
      htWin_ftDraw: 14,
      htWin_ftLoss: 8,
      htDraw_ftWin: 38,
      htDraw_ftDraw: 42,
      htDraw_ftLoss: 20,
      htLoss_ftWin: 16,
      htLoss_ftDraw: 24,
      htLoss_ftLoss: 60,
    },
  },
  {
    teamId: "team5",
    data: {
      htWin_ftWin: 76,
      htWin_ftDraw: 15,
      htWin_ftLoss: 9,
      htDraw_ftWin: 36,
      htDraw_ftDraw: 44,
      htDraw_ftLoss: 20,
      htLoss_ftWin: 15,
      htLoss_ftDraw: 25,
      htLoss_ftLoss: 60,
    },
  },
  {
    teamId: "team6",
    data: {
      htWin_ftWin: 74,
      htWin_ftDraw: 16,
      htWin_ftLoss: 10,
      htDraw_ftWin: 35,
      htDraw_ftDraw: 45,
      htDraw_ftLoss: 20,
      htLoss_ftWin: 15,
      htLoss_ftDraw: 25,
      htLoss_ftLoss: 60,
    },
  },
]

export function getTeamHTFTData(teamId: string): HTFTData | undefined {
  return htftData.find((item) => item.teamId === teamId)
}
