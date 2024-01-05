import {
  useState,
  useEffect,
  useRef,
  Fragment,
  forwardRef,
} from "react"
import { Dialog, Transition } from '@headlessui/react'
import { CircleFlag } from 'react-circle-flags'
import dynamic from "next/dynamic"

function News(props: any){
  const cancelButtonRef = useRef(null)
  const [articles, setArticles] = useState<any[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if(props.country){
        const requestOptions : Object = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://api.worldnewsapi.com/search-news?source-countries=${props.country.ISO_A2}&sort=publish-time&sort-direction=DESC&api-key=7a7ad3aa35344b389cca985f700d823a`, requestOptions)
        .then(response => response.text())
        .then(result => {setArticles(JSON.parse(result).news); setLoaded(true)})
        .catch(error => console.log('error', error));

        // fetch(`https://newsapi.org/v2/top-headlines?country=${props.country.ISO_A2}&apiKey=747ba7350a824b9488fe577aab6a12d0`, requestOptions)
        // .then(response => response.text())
        // .then(result => setArticles(JSON.parse(result).articles))
        // .catch(error => console.log('error', error));

        // console.log(articles)
    }
  }, [props])

  const cards = articles.map((article, i) =>
    <>
    <div className="bg-white px-4 pb-4 py-3 sm:p-6 sm:pb-4">
    <div className="sm:flex sm:items-start">
    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
    </div> */}
    <div className="mt-3 text-center sm:mt-0 sm:text-left">
        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            <a href={article.url}>{article.title}</a>
        </Dialog.Title>
        <div className="mt-2">
        <p className="text-sm text-gray-500" style={{
            '-webkit-line-clamp': '3',
            'display': '-webkit-box',
            '-webkit-box-orient': 'vertical',
            'overflow': 'hidden'
            }}>
            {article.text}
        </p>
        </div>
    </div>
    </div>
    </div>
    {i !== articles.length ? <hr/> : null}
    </>
  )

  const get_name = () => {
    return (props.country) ? props.country.BRK_NAME : "this"
  }

  const get_country_code = () => {
    return (props.country) ? props.country.ISO_A2.toLowerCase() : null
  }

  const loading = [...Array(3)].map((_, i) => 
  <>
  <div className="bg-white px-4 pb-4 py-3 sm:p-6 sm:pb-4">
  <div className="flex animate-pulse">
  <div className="mt-3 flex-1">
      <div className="h-6 bg-slate-200 rounded"/>
      <div className="mt-4 grid gap-2 grid-cols-3">
      <p className="h-3 bg-slate-200 rounded col-span-3"/>
      <p className="h-3 bg-slate-200 rounded col-span-3"/>
      <p className="h-3 bg-slate-200 rounded col-span-2"/>
      </div>
  </div>
  </div>
  </div>
  {i !== 2 ? <hr/> : null}
  </>
  )

  const no_cards =
    <div className="bg-white px-4 sm:p-6 sm:py-2">
    <div className="sm:flex sm:items-start">
    <div className="mb-3 text-center sm:text-left">
        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            No news found, sorry!
        </Dialog.Title>
        <div className="mt-2">
        <p className="text-sm text-gray-500">
            Our news API supports a limited number of countries and {get_name()} is not one of them. Support may be added in future updates.
        </p>
        </div>
    </div>
    </div>
    </div>

  const closeDialogue = () => {
    props.setOpen(false);
    setTimeout(function() {
        setLoaded(false);
    }, 1000);
  }

  return(
    <Transition.Root show={props.open} as={Fragment}>
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
                    <div className="bg-white px-4 py-3 sm:p-6 sm:py-4">
                    <div className="sm:flex sm:items-center justify-center">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <CircleFlag countryCode={get_country_code()} height="1"/>
                        </div>
                        <div className="sm:ml-3 sm:mt-0 mt-2 text-center sm:text-left">
                        <Dialog.Title as="h2" className="text-base font-semibold leading-6 text-gray-900">
                            {get_name()}
                        </Dialog.Title>
                        </div>
                    </div>
                    </div>
                    {loaded ? (cards.length > 0 ? cards : no_cards) : loading}
                </Dialog.Panel>
            </Transition.Child>
        </div>
        </div>
    </Dialog>
    </Transition.Root>
  );
}

export default News
