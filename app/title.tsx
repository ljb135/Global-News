import { Staatliches } from 'next/font/google'
import { useEffect, useState } from 'react'

const staatliches = Staatliches({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
  })

function Title(){
    const [visible, setVisible] = useState(true)
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        setTimeout(function() {
            setOpacity(0);
        }, 500);
        setTimeout(function() {
            setVisible(false);
        }, 5000);
    })

    return(
        <div style={{visibility: visible ? 'visible' : 'hidden', opacity: opacity}} className="absolute flex flex-col w-screen h-screen z-10 text-white justify-center items-center text-center transition delay-[3000ms] duration-1000">
            <h1 className={`text-[13rem] ${staatliches.className}`}>Global News.</h1>
        </div>
    )
}

export default Title