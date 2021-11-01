import Head from 'next/head'
import Link from 'next/link'

import CharacterDetails from '../../../components/CharacterDetails/CharacterDetails'

const defaultEndpoint = 'https://rickandmortyapi.com/api/character'

export async function getServerSideProps({ query }) {
  const { id } = query
  const res = await fetch(`${defaultEndpoint}/${id}`)
  const data = await res.json()
  
  return {
    props: {
      data
    }
  }
}

export default function Character({ data }) {
  return (
    <div 
      className="bg-space bg-center bg-cover bg-fixed h-screen w-screen flex flex-col items-center justify-center py-2"
    >
      <Head>
        <title>Rick & Morty Wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col text-center">
        <div>
          <CharacterDetails data={data} />
          <Link href="/">
            <button className="bg-green-500 border border-blue-200 p-2 text-lg text-white rounded-xl mt-20 shadow-2xl hover:scale-105 active:scale-100 transform duration-200">
              Back to all Characters
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}
