import Image from 'next/image'
import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from 'react-icons/hi'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { ImLocation, ImEarth} from 'react-icons/im'

function CharacterDetails({ data }) {
  const { name, status, species, gender, origin, location, image } = data

  const statusIcon = status === 'Alive' ? 
    <HiOutlineEmojiHappy className="inline text-green-500 h-5" /> : 
    <HiOutlineEmojiSad className="inline text-red-500 h-5" />

  const genderIcon = gender === 'Male' ?
    <BsGenderMale className="inline text-blue-500 h-5" /> :
    <BsGenderFemale className="inline text-pink-400 h-5" />
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl mb-8 text-green-500 font-semibold ">{name}</h1>
      <Image src={image} width={200} height={200} className="rounded-full" />
      <ul className="text-lg bg-black opacity-60 text-white p-5 rounded-2xl w-80 mt-8">
        <li>Status: {statusIcon} {status}</li>
        <li>Species: <FaUser className="inline h-5" /> {species}</li>
        <li>Gender: {genderIcon} {gender}</li>
        <li>Origin: <ImEarth className="inline h-5" /> {origin.name}</li>
        <li>Location: <ImLocation className="inline h-5" /> {location.name}</li>
      </ul>
    </div>
  )
}

export default CharacterDetails
