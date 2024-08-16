import React from 'react'
import { FaStar } from 'react-icons/fa6'

const Rating = () => {
	return (
		<div>
			<div className=' flex items-center gap-1'>
				<div className=' flex gap-1 items-center'>
					<FaStar className=' text-[#FD8E1F]' />
					<FaStar className=' text-[#FD8E1F]' />
					<FaStar className=' text-[#FD8E1F]' />
					<FaStar className=' text-[#FD8E1F]' />
					<FaStar className=' text-[#FD8E1F]' />
				</div>

				<p className=' text-white text-sm'>
					4.7{' '}
					<span className='text-[#aaaaaa] text-[0.8rem]'>(4,514 Rating)</span>
				</p>
			</div>
		</div>
	)
}

export default Rating
