import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo.png'

const defaultEndpoint = 'https://rickandmortyapi.com/api/character'

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  const { info, results: defaultResults = [] } = data

  const [results, updateResults] = useState(defaultResults)
  const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint
  })
  const { current } = page

  useEffect(() => {
    if (current === defaultEndpoint) return

    async function request() {
      const res = await fetch(current)
      const nextData = await res.json()
      
      updatePage({
        current,
        ...nextData.info
      })

      if (!nextData.info.prev) {
        updateResults(nextData?.results) 
        return
      }

      updateResults(prev => {
        return [
          ...prev,
          ...nextData.results
        ]
      })
    } 
    request()
  }, [current])

  const handleLoadMore = () => {
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.next
      }
    })
  }

  const handleOnSubmitSearch = (e) => {
    e.preventDefault()
    
    const { currentTarget = {} } = e
    const fields = Array.from(currentTarget?.elements)
    console.log(fields);
    const fieldsQuery = fields.find((field) => field.name === 'query')

    const value = fieldsQuery.value || ''
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`

    updatePage({
      current: endpoint
    })
  }

  return (
    <div 
      className="bg-space bg-fixed bg-center flex flex-col items-center justify-center py-2 px-5"
    >
      <Head>
        <title>Rick & Morty Wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src={logo} width={700} height={400} />

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <form onSubmit={handleOnSubmitSearch} className="flex h-10 mt-10">
          <input 
            className="outline-none border border-blue-200 p-3 mr-2 rounded-2xl focus:border-blue-500" 
            type="search" 
            name="query" />
          <button 
            className="bg-green-500 border border-blue-200 p-2 text-white font-light text-sm rounded-xl hover:scale-105 active:scale-100 transform duration-200"
          >
            Search
          </button>
        </form>

        <div>
          <ul className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            {results ? 
              results.map(({ id, name, image }) => {
                return (
                  <Link href="/character/[id]" as={`/character/${id}`} key={id}> 
                    <li 
                      className="cursor-pointer py-8 mt-6 text-center w-80 bg-black bg-opacity-60 rounded-xl text-white shadow-2xl hover:text-green-500 hover:scale-105 active:scale-100 transform duration-200"
                    >
                      <a>
                        <Image 
                          className="rounded-xl" 
                          src={image} 
                          width={200} 
                          height={200} 
                          alt={`${image} Thumb`} 
                        />
                        <h3 className="text-2xl font-bold">{name}</h3>
                      </a>
                    </li>
                  </Link>
                ) 
              }) : 
            <p className="text-2xl font-semibold mt-12">OPS! Something went wrong, try search again using the right syntax</p>}
          </ul>
          {results && 
            <button 
              className="bg-green-500 border border-blue-200 p-3 rounded-2xl text-white m-12 hover:scale-105 active:scale-100 transform duration-200"
              onClick={handleLoadMore}
            >
              Load More...
            </button>
          }
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="flex items-center justify-center text-white">
          Made with <span className="text-red-600 mx-2">❤️</span> Stefano Visentin
        </p>
      </footer>
    </div>
  )
}
