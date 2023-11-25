"use client"

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
} from "react"
import dynamic from "next/dynamic"

const GlobeTmpl = dynamic(() => import("react-globe.gl"), {
  ssr: false,
})
const Globe = forwardRef((props: any, ref) => (
  <GlobeTmpl {...props} forwardRef={ref} />
))

const World = () => {

  const globeRef = useRef()

  const [globeReady, setGlobeReady] = useState(false)
  const [countries, setCountries] = useState({ features: []});

  const startTime = 1000

  useEffect(() => {
    if (!globeRef.current) {
      return
    }
    ;(globeRef.current as any).pointOfView(
      {
        lat: 39.609913,
        lng: -105.962477,
        altitude: 2.5,
      },
      startTime
    )
    ;(globeRef.current as any).controls().enableZoom = false
  }, [globeReady])

  useEffect(() => {
    // load data
    fetch("https://unpkg.com/three-globe@2.30.0/example/country-polygons/ne_110m_admin_0_countries.geojson").then(res => res.json())
      .then(countries=> {
        setCountries(countries);
        console.log(countries);
      });
  }, []);

  const randomColor = () => {
    var color = Math.floor(Math.random()*16777215).toString(16);
    while(color.length < 6){
        color = "0" + color;
    }
    console.log(color);
    return "#" + color;
  }

  return (
    <>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        polygonsData={countries.features}
        polygonCapColor={(feature: any) => Math.max(0.1, Math.sqrt(+feature.properties.POP_EST) * 1e-2)}
        onGlobeReady={() => setGlobeReady(true)}
        animateIn={false}
        ref={globeRef}
      />
    </>
  )
}

export default World