import {
  useState,
  useEffect,
  useRef,
  Fragment,
  forwardRef,
} from "react"
import GlobeTmpl from "./globe"

const Globe = forwardRef((props: any, ref) => (
  <GlobeTmpl {...props} forwardRef={ref} />
))

const World = (props: any) => {

  const globeRef = useRef()

  const [globeReady, setGlobeReady] = useState(false)
  const [countries, setCountries] = useState({ features: []});
  
  useEffect(() => {
    // load data
    fetch("https://unpkg.com/three-globe@2.30.0/example/country-polygons/ne_110m_admin_0_countries.geojson").then(res => res.json())
      .then(countries=> {
        setCountries(countries);
      });
  }, []);

  useEffect(() => {
    // Auto-rotate
    if (!globeRef.current) {
        return
    }
    (globeRef.current as any).controls().autoRotateSpeed = 0.3;

    (globeRef.current as any).pointOfView({ altitude: 4 }, 5000);
  }, [globeReady]);

  useEffect(() => {
    (globeRef.current as any).controls().autoRotate = !props.open;
  }, [props.open])

  // const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
  function getCountry(polygon: any){
    console.log(polygon.properties);
    (globeRef.current as any).controls().autoRotate = false;
    props.setOpen(true);
    props.setCountry(polygon.properties.ISO_A2)
  }

  return (
    <>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        showAtmosphere={false}
        polygonsData={countries.features}
        polygonCapColor={(feature: any) => Math.max(0.1, Math.floor(Math.sqrt(+feature.properties.POP_EST/1.4e9)*255))}
        polygonSideColor="#ffffff"
        onPolygonClick={(polygon: any, event: any, {lat, lng, altitude}: any) => getCountry(polygon)}
        onGlobeReady={() => setGlobeReady(true)}
        animateIn={false}
        ref={globeRef}
      />
    </>
  )
}

export default World