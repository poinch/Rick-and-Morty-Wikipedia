import Link from 'next/link'
import Image from 'next/image'

function CharacterCard({ results }) {
  return (
    <ul 
      className="grid sm:grid-cols-2 sm:gap-x-20 lg:grid-cols-3 lg:gap-x-20 items-center max-w-4xl mt-6 sm:w-full"
    >
      {results ? 
        results.map(({ id, name, image }) => {
          return (
            <Link href="/character/[id]" as={`/character/${id}`} key={id}> 
              <li 
                className="cursor-pointer p-6 mt-6 text-center w-60 bg-black bg-opacity-60 rounded-xl text-white shadow-2xl hover:text-green-500 hover:scale-105 active:scale-100 transform duration-200"
              >
                <a>
                  <Image 
                    className="rounded-xl" 
                    src={image} 
                    width={200} 
                    height={200} 
                    alt={`${image} Thumb`} 
                  />
                  <h3 className="text-2xl font-bold w-50">{name}</h3>
                </a>
              </li>
            </Link>
          ) 
        }) : 
      <p className="text-2xl font-semibold mt-12">
        OPS! Something went wrong, try search again using the right syntax
      </p>}
    </ul>
  )
}

export default CharacterCard