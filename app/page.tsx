"use client"

import {useState} from "react"
// import World from './world'
import News from "./news"
import dynamic from "next/dynamic"
import { Staatliches } from 'next/font/google'

const staatliches = Staatliches({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

const World = dynamic(
  () => import('./world'),
  { ssr: false },
)

export default function Home() {
  const [open, setOpen] = useState(false)
  const [country, setCountry] = useState(null)

  return (
    <main className="flex min-h-screen">
      <style jsx global>{`
        html {
          font-family: ${staatliches.style.fontFamily};
        }
      `}</style>
      <World open={open} setOpen={setOpen} setCountry={setCountry}/>
      <News open={open} country={country} setOpen={setOpen}/>
    </main>
  )
}
