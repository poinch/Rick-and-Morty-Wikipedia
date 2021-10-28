import Image from 'next/image'
import logo from '../../public/logo.png'

function Logo() {
  return (
    <Image src={logo} width={700} height={400} />
  )
}

export default Logo
