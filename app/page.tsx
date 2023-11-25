import Image from 'next/image'
import World from './world'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <World/>
    </main>
  )
}
