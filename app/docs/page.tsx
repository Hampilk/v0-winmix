import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6 container mx-auto">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-muted-foreground">Learn how to use the League Data Editor Pro application.</p>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>League Data Editor Pro</CardTitle>
                  <CardDescription>Professional tool for editing League of Legends game data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    League Data Editor Pro is a comprehensive tool designed for editing and managing League of Legends
                    game data. It provides a user-friendly interface for modifying champions, items, runes, and spells.
                  </p>
                  <p>
                    This application is built with Next.js and uses modern web technologies to provide a smooth and
                    responsive user experience.
                  </p>
                  <h3 className="text-lg font-semibold mt-4">Key Features</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Edit champion statistics and abilities</li>
                    <li>Modify item properties and effects</li>
                    <li>Customize rune effects and values</li>
                    <li>Adjust summoner spell parameters</li>
                    <li>Track changes with detailed history</li>
                    <li>Import and export data in various formats</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="architecture" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Architecture</CardTitle>
                  <CardDescription>System design and technical architecture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    League Data Editor Pro follows a modern web application architecture using Next.js with the App
                    Router.
                  </p>
                  <h3 className="text-lg font-semibold mt-4">Frontend</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>React components for UI elements</li>
                    <li>Next.js App Router for routing</li>
                    <li>Tailwind CSS for styling</li>
                    <li>Client-side state management with React hooks</li>
                  </ul>
                  <h3 className="text-lg font-semibold mt-4">Backend</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Next.js API routes for data handling</li>
                    <li>Server-side rendering for improved performance</li>
                    <li>Data persistence through API endpoints</li>
                  </ul>
                  <h3 className="text-lg font-semibold mt-4">Data Flow</h3>
                  <p>The application follows a unidirectional data flow pattern:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>User interacts with the UI</li>
                    <li>Actions are dispatched to modify state</li>
                    <li>API requests are made to persist changes</li>
                    <li>UI updates to reflect the new state</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="getting-started" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>How to set up and start using the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-semibold">Installation</h3>
                  <p>To install and run the application locally:</p>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      {`# Clone the repository
git clone https://github.com/yourusername/league-data-editor-pro.git

# Navigate to the project directory
cd league-data-editor-pro

# Install dependencies
npm install

# Start the development server
npm run dev`}
                    </code>
                  </pre>

                  <h3 className="text-lg font-semibold mt-4">Configuration</h3>
                  <p>
                    Create a <code>.env.local</code> file in the root directory with the following variables:
                  </p>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      {`# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Authentication
# AUTH_SECRET=your-secret-key`}
                    </code>
                  </pre>

                  <h3 className="text-lg font-semibold mt-4">Basic Usage</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Navigate to the dashboard</li>
                    <li>Select the type of data you want to edit (champions, items, etc.)</li>
                    <li>Choose a specific entity to modify</li>
                    <li>Make your changes in the editor</li>
                    <li>Save your changes</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="components" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Components</CardTitle>
                  <CardDescription>UI components and their usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    League Data Editor Pro is built with a component-based architecture. Here are the main components:
                  </p>

                  <h3 className="text-lg font-semibold mt-4">Editor Components</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>ChampionEditor</strong> - For editing champion data
                    </li>
                    <li>
                      <strong>ItemEditor</strong> - For editing item data
                    </li>
                    <li>
                      <strong>RuneEditor</strong> - For editing rune data
                    </li>
                    <li>
                      <strong>SpellEditor</strong> - For editing spell data
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-4">UI Components</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>DashboardHeader</strong> - Main navigation header
                    </li>
                    <li>
                      <strong>RecentChanges</strong> - Displays recent modifications
                    </li>
                    <li>
                      <strong>SearchBar</strong> - For searching entities
                    </li>
                    <li>
                      <strong>EntityList</strong> - Displays a list of entities
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-4">Form Components</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>StatEditor</strong> - For editing numerical stats
                    </li>
                    <li>
                      <strong>TextEditor</strong> - For editing text fields
                    </li>
                    <li>
                      <strong>ImageUploader</strong> - For uploading images
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>API endpoints and usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>League Data Editor Pro provides a RESTful API for interacting with game data.</p>

                  <h3 className="text-lg font-semibold mt-4">Champions API</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <code>GET /api/champions</code> - Get all champions
                    </li>
                    <li>
                      <code>GET /api/champions/:id</code> - Get a specific champion
                    </li>
                    <li>
                      <code>POST /api/champions</code> - Create a new champion
                    </li>
                    <li>
                      <code>PUT /api/champions/:id</code> - Update a champion
                    </li>
                    <li>
                      <code>DELETE /api/champions/:id</code> - Delete a champion
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-4">Items API</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <code>GET /api/items</code> - Get all items
                    </li>
                    <li>
                      <code>GET /api/items/:id</code> - Get a specific item
                    </li>
                    <li>
                      <code>POST /api/items</code> - Create a new item
                    </li>
                    <li>
                      <code>PUT /api/items/:id</code> - Update an item
                    </li>
                    <li>
                      <code>DELETE /api/items/:id</code> - Delete an item
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-4">Runes API</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <code>GET /api/runes</code> - Get all runes
                    </li>
                    <li>
                      <code>GET /api/runes/:id</code> - Get a specific rune
                    </li>
                    <li>
                      <code>POST /api/runes</code> - Create a new rune
                    </li>
                    <li>
                      <code>PUT /api/runes/:id</code> - Update a rune
                    </li>
                    <li>
                      <code>DELETE /api/runes/:id</code> - Delete a rune
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-4">Spells API</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <code>GET /api/spells</code> - Get all spells
                    </li>
                    <li>
                      <code>GET /api/spells/:id</code> - Get a specific spell
                    </li>
                    <li>
                      <code>POST /api/spells</code> - Create a new spell
                    </li>
                    <li>
                      <code>PUT /api/spells/:id</code> - Update a spell
                    </li>
                    <li>
                      <code>DELETE /api/spells/:id</code> - Delete a spell
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
