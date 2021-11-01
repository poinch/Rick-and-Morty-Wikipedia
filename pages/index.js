import { useState, useEffect } from 'react'
import Head from 'next/head'

import Logo from '../components/Logo/Logo'
import SearchBar from '../components/SearchBar/SearchBar'
import CharacterCard from '../components/CharacterCard/CharacterCard'
import Footer from '../components/Footer/Footer'

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

  const onHandleOnSubmitSearch = (endpoint) => {
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
      <Logo />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <SearchBar submit={onHandleOnSubmitSearch} />
        <div>
          <CharacterCard results={results} />
          {results && 
            <button 
              className="bg-green-500 border border-blue-200 p-3 rounded-2xl text-white m-12 shadow-2xl hover:scale-105 active:scale-100 transform duration-200"
              onClick={handleLoadMore}
            >
              Load More...
            </button>
          }
        </div>
      </main>
      <Footer />
    </div>
  )
}
