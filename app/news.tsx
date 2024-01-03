import {
  useState,
  useEffect,
  useRef,
  Fragment,
  forwardRef,
} from "react"
import { Dialog, Transition } from '@headlessui/react'
import dynamic from "next/dynamic"

const News = (props: any) => {
  const cancelButtonRef = useRef(null)
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    if(props.country){
        const requestOptions : Object = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://api.worldnewsapi.com/search-news?source-countries=${props.country}&sort=publish-time&sort-direction=DESC&api-key=7a7ad3aa35344b389cca985f700d823a`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }, [])

  var requestOptions: object = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=747ba7350a824b9488fe577aab6a12d0`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  return(
    <Transition.Root show={props.open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => props.setOpen(false)}>
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
                    onClick={() => props.setOpen(false)}
                    >
                    Deactivate
                    </button>
                    <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => props.setOpen(false)}
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
  );
}

export default News
