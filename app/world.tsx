"use client"

import {
  useState,
  useEffect,
  useRef,
  Fragment,
  forwardRef,
} from "react"
import { Dialog, Transition } from '@headlessui/react'
import dynamic from "next/dynamic"
import GlobeTmpl from "./globe"

const Globe = forwardRef((props: any, ref) => (
  <GlobeTmpl {...props} forwardRef={ref} />
))

const World = () => {

  const globeRef = useRef()
  const cancelButtonRef = useRef(null)

  const [globeReady, setGlobeReady] = useState(false)
  const [countries, setCountries] = useState({ features: []});
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    // load data
    fetch("https://unpkg.com/three-globe@2.30.0/example/country-polygons/ne_110m_admin_0_countries.geojson").then(res => res.json())
      .then(countries=> {
        setCountries(countries);
        console.log(countries);
      });
  }, []);

  useEffect(() => {
    // Auto-rotate
    if (!globeRef.current) {
        return
    }
    (globeRef.current as any).controls().autoRotate = true;
    (globeRef.current as any).controls().autoRotateSpeed = 0.3;

    (globeRef.current as any).pointOfView({ altitude: 4 }, 5000);
  }, [globeReady]);

  // const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
  function getCountry(polygon: any){
    console.log(polygon.properties.ISO_A2);
    (globeRef.current as any).controls().autoRotate = false;
    setOpen(true);
  }

  function closeDialogue(){
    (globeRef.current as any).controls().autoRotate = true;
    setOpen(false)
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
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeDialogue}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Deactivate account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to deactivate your account? All of your data will be permanently
                            removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={closeDialogue}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={closeDialogue}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}

export default World