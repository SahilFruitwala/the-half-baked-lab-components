import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { YearProgress } from "@/registry/new-york/blocks/year-progress/year-progress"
import { ModeToggle } from "@/components/mode-toggle"
import { Loading1 } from "@/registry/new-york/blocks/loading-states/loading-state-1"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex gap-1 justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">The Half Baked Lab Registry</h1>
          <p className="text-muted-foreground">
            A custom registry for distributing components, blocks and page using shadcn.
          </p>
        </div>
        <ModeToggle />
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Year Progress Component
            </h2>
            <OpenInV0Button name="year-progress" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[500px] relative">
            <YearProgress />
          </div>
        </div>
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Loading State 1
            </h2>
            <OpenInV0Button name="year-progress" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[500px] relative">
            <Loading1 />
          </div>
        </div>
      </main>
    </div>
  )
}
