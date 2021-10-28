import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

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
  const { name, status, species, gender, origin, location, image } = data
  return (
    <div 
      className="bg-space bg-center bg-cover bg-fixed h-screen w-screen flex flex-col items-center justify-center py-2"
    >
      <Head>
        <title>Rick & Morty Wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div>
          <h1 className="text-5xl mb-8 text-green-500 font-semibold ">{name}</h1>
          <Image src={image} width={200} height={200} className="rounded-full" />
          <ul className="text-lg bg-black opacity-60 text-white p-5 rounded-2xl w-80 mt-8">
            <li>Status: {status}</li>
            <li>Species: {species}</li>
            <li>Gender: {gender}</li>
            <li>Origin: {origin.name}</li>
            <li>Location: {location.name}</li>
          </ul>
          <Link href="/">
            <button className="bg-green-500 border border-blue-200 p-2 text-lg text-white rounded-xl mt-20 hover:scale-105 active:scale-100 transform duration-200">
              Back to all Characters
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}
