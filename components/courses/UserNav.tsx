import Image from 'next/image'
import React from 'react'
import logo from '@/public/assets/BrandLogo.png'

const UserNav = () => {
	return (
		<div>
			<div className=' fixed flex w-[80vw] justify-between text-white mx-auto bg-[#192A41] border border-white left-0 right-0 p-[1rem] rounded-full items-center top-[2rem] z-[10]'>
				<Image
					src={logo}
					width={100}
					height={100}
					alt='logo'
					objectFit='contain'
				/>

				<input
					type='text'
					placeholder='Search'
					className=' w-[30rem] border border-white bg-none rounded-lg p-[0.3rem]'
				/>

				<div className=''>
					<p className=' bg-[#021128] rounded-lg p-[0.3rem] text-sm'>
						0xE....3412
					</p>
				</div>

				<div className=''>
					<p className=' text-sm '>0.00123 MAND</p>
				</div>
			</div>
		</div>
	)
}

export default UserNav
