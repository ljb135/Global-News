import {
  useState,
  useEffect,
  useRef,
  Fragment,
  forwardRef,
} from "react"
import GlobeTmpl from "./globe"
import * as THREE from 'three';

// eslint-disable-next-line react/display-name
const Globe = forwardRef((props: any, ref) => (
  <GlobeTmpl {...props} forwardRef={ref} />
))

function World(props: any){

  const globeRef = useRef();

  const [globeReady, setGlobeReady] = useState(false);
  const [countries, setCountries] = useState({ features: []});
  const [hovered, setHover] = useState(null);
  
  useEffect(() => {
    // load data
    fetch("https://unpkg.com/three-globe@2.30.0/example/country-polygons/ne_110m_admin_0_countries.geojson").then(res => res.json())
      .then(countries=> {
        setCountries(countries);
      });
  }, []);

  useEffect(() => {
    // Auto-rotate
    const globeEl = globeRef.current;

    if (!globeEl) {
        return
    }
    (globeEl as any).controls().autoRotateSpeed = 0.3;
    (globeEl as any).controls().autoRotate = 0.3;

    (globeEl as any).pointOfView({ altitude: 4 }, 5000);

    // Add clouds sphere
    const CLOUDS_IMG_URL = 'https://unpkg.com/three-globe@2.30.0/example/clouds/clouds.png'; // from https://github.com/turban/webgl-earth
    const CLOUDS_ALT = 0.005;
    const CLOUDS_ROTATION_SPEED = -0.01; // deg/frame

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry((globeEl as any).getGlobeRadius() * (1 + CLOUDS_ALT), 300, 300),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true , opacity: 1})
      );
      (globeEl as any).scene().add(clouds);

      // (function rotateClouds() {
      //   requestAnimationFrame(rotateClouds);
      //   clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
      // })();
    });
  }, [globeReady]);

  useEffect(() => {
    (globeRef.current as any).controls().autoRotate = !props.open;
  }, [props.open])

  // const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
  function getCountry(polygon: any){
    console.log(polygon.properties);
    (globeRef.current as any).controls().autoRotate = false;
    props.setOpen(true);
    props.setCountry(polygon.properties)
  }

  return (
    <>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere={true}
        polygonsData={countries.features}
        // polygonCapColor={(feature: any) => Math.max(0.1, Math.floor(Math.sqrt(+feature.properties.POP_EST/1.4e9)*255))}
        polygonSideColor="#ffffff"
        polygonCapMaterial={(polygon:any) => polygon === hovered ? new THREE.MeshBasicMaterial({'wireframe': true}) : {}}
        // polygonSideMaterial={{opacity: 0}}
        polygonAltitude={0.003}
        onPolygonClick={(polygon: any) => getCountry(polygon)}
        onPolygonHover={setHover}
        onGlobeReady={() => setGlobeReady(true)}
        animateIn={false}
        ref={globeRef}
      />
    </>
  )
}

export default World