"use client"

import {useState} from "react"
// import World from './world'
import News from "./news"
import dynamic from "next/dynamic"

const World = dynamic(
  () => import('./world'),
  { ssr: false },
)

export default function Home() {
  const [open, setOpen] = useState(false)
  const [country, setCountry] = useState(null)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <World open={open} setOpen={setOpen} setCountry={setCountry}/>
      <News open={open} country={country} setOpen={setOpen}/>
    </main>
  )
}
