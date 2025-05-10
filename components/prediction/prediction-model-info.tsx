import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BrainCircuit, LineChart, History, Sigma, Info } from "lucide-react"

export function PredictionModelInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BrainCircuit className="h-5 w-5 mr-2" />
          About the Prediction Model
        </CardTitle>
        <CardDescription>Understanding how our match predictions work</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                Data Sources
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p>Our prediction model uses multiple data sources to generate accurate predictions:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Team performance statistics</li>
                <li>Head-to-head records</li>
                <li>Recent form and results</li>
                <li>Home/away performance data</li>
                <li>HT/FT (Half Time/Full Time) patterns</li>
                <li>Player availability and performance metrics</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center">
                <Sigma className="h-4 w-4 mr-2" />
                Calculation Methodology
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p>The prediction model uses a multi-stage calculation process:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Base probability calculation using team strength ratings</li>
                <li>Adjustment for home advantage factor</li>
                <li>Form-based modifications using recent results</li>
                <li>Head-to-head record analysis</li>
                <li>Pattern recognition for recurring match scenarios</li>
                <li>Final probability normalization</li>
              </ol>
              <p className="mt-2">
                The model employs both statistical analysis and machine learning techniques to identify patterns and
                generate predictions.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                Accuracy & Limitations
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p>
                Our prediction model has demonstrated an average accuracy of 62-68% for match outcomes, which is
                significantly above random chance (33% for win/draw/loss).
              </p>
              <p className="mt-2 font-medium">Limitations:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Cannot account for last-minute team changes or injuries</li>
                <li>Weather conditions and pitch quality are not fully factored in</li>
                <li>Psychological factors and team motivation can vary</li>
                <li>Unusual events (red cards, penalties) can significantly impact outcomes</li>
              </ul>
              <p className="mt-2 text-xs italic">
                <Info className="h-3 w-3 inline mr-1" />
                Always use predictions as one factor in your decision-making process, not as the sole determinant.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
