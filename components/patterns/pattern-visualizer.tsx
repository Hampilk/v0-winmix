"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Pattern } from "@/types/pattern"

interface PatternVisualizerProps {
  pattern: Pattern
}

export default function PatternVisualizer({ pattern }: PatternVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw soccer field
    drawField(ctx, canvas.width, canvas.height)

    // Draw nodes
    pattern.nodes.forEach((node) => {
      drawNode(ctx, node)
    })

    // Draw connections
    pattern.connections.forEach((connection) => {
      const sourceNode = pattern.nodes.find((n) => n.id === connection.source)
      const targetNode = pattern.nodes.find((n) => n.id === connection.target)

      if (sourceNode && targetNode) {
        drawConnection(ctx, sourceNode, targetNode, connection.type)
      }
    })
  }, [pattern, dimensions])

  const drawField = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw field background
    ctx.fillStyle = "#3a8c3f"
    ctx.fillRect(0, 0, width, height)

    // Draw field lines
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2

    // Outline
    ctx.strokeRect(50, 50, width - 100, height - 100)

    // Center line
    ctx.beginPath()
    ctx.moveTo(width / 2, 50)
    ctx.lineTo(width / 2, height - 50)
    ctx.stroke()

    // Center circle
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, 60, 0, Math.PI * 2)
    ctx.stroke()

    // Penalty areas
    ctx.strokeRect(50, height / 2 - 100, 120, 200)
    ctx.strokeRect(width - 170, height / 2 - 100, 120, 200)

    // Goal areas
    ctx.strokeRect(50, height / 2 - 50, 50, 100)
    ctx.strokeRect(width - 100, height / 2 - 50, 50, 100)

    // Goals
    ctx.fillStyle = "white"
    ctx.fillRect(40, height / 2 - 30, 10, 60)
    ctx.fillRect(width - 50, height / 2 - 30, 10, 60)
  }

  const drawNode = (ctx: CanvasRenderingContext2D, node: Pattern["nodes"][0]) => {
    ctx.beginPath()
    ctx.arc(node.x, node.y, 15, 0, Math.PI * 2)

    // Different colors for different node types
    if (node.type === "player") {
      ctx.fillStyle = "#3b82f6"
    } else if (node.type === "ball") {
      ctx.fillStyle = "#f59e0b"
    } else {
      ctx.fillStyle = "#10b981"
    }

    ctx.fill()
    ctx.stroke()

    // Draw label
    ctx.fillStyle = "white"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(node.label, node.x, node.y)
  }

  const drawConnection = (
    ctx: CanvasRenderingContext2D,
    source: Pattern["nodes"][0],
    target: Pattern["nodes"][0],
    type: string,
  ) => {
    ctx.beginPath()
    ctx.moveTo(source.x, source.y)

    // Different styles for different connection types
    if (type === "pass") {
      ctx.strokeStyle = "#3b82f6"
      ctx.setLineDash([5, 5])
    } else if (type === "movement") {
      ctx.strokeStyle = "#ef4444"
      ctx.setLineDash([])
    } else {
      ctx.strokeStyle = "white"
      ctx.setLineDash([2, 2])
    }

    ctx.lineWidth = 2
    ctx.lineTo(target.x, target.y)
    ctx.stroke()

    // Reset line dash
    ctx.setLineDash([])

    // Draw arrow at the end
    const angle = Math.atan2(target.y - source.y, target.x - source.x)
    ctx.beginPath()
    ctx.moveTo(target.x, target.y)
    ctx.lineTo(target.x - 15 * Math.cos(angle - Math.PI / 6), target.y - 15 * Math.sin(angle - Math.PI / 6))
    ctx.lineTo(target.x - 15 * Math.cos(angle + Math.PI / 6), target.y - 15 * Math.sin(angle + Math.PI / 6))
    ctx.closePath()
    ctx.fillStyle = ctx.strokeStyle
    ctx.fill()
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{pattern.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{pattern.description}</p>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="w-full h-auto" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Pattern Type</h3>
              <div className="text-sm capitalize">{pattern.type}</div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Complexity</h3>
              <div className="text-sm capitalize">{pattern.complexity}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
