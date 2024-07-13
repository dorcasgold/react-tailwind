import { Link } from 'react-router-dom'
import { logoDark } from '../assets/Index'
import { cartpic } from '../assets/Index'
import { userLogo } from '../assets/Index'
import { useSelector } from 'react-redux'

function Header() {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  console.log(userInfo);
  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-800 font-titleFont sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-5 flex items-center justify-between">

        <Link to='/'>
          <div>
            <img className='w-28' src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <div className='flex items-center gap-8'>
          <ul className='flex items-center gap-8'>
            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-3000'>Home</li>
            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-3000'>Pages</li>
            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-3000'>Shop</li>
            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-3000'>Blog</li>
          </ul>
          <Link to='/cart'>
            <div className=' relative'>
              <img src={cartpic} alt="cartpic" className='w-6' />
              <span className=' absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-semibold'>{productData.length}</span>
            </div>
          </Link>
          <Link to='/login'>
            <img src={
              userInfo
                ? userInfo.image
                : userLogo
            } alt="userLogo" className='w-8 h-8 rounded-full object-cover' />
          </Link>
          {userInfo && <p className='text-base fonttitleFont font-semibold underline underline-offset-2'>{userInfo.name}</p>}
        </div>
      </div>
    </div>
  )
}

export default Header