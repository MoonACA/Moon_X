'use client'

import React from 'react'
import GoBack from './GoBack'
import Image from 'next/image'
import BreadCrumbs from './BreadCrumbs'
import CourseTop from './CourseTop'
import img from '@/public/assets/course.jpeg'
import { FaPlay } from 'react-icons/fa'
import CourseContent from './CourseContent'
import Comments from './Comments'

const Watch = () => {
	return (
		<div>
			<GoBack text='Watch Course' route='/courses' />

			<div className=' p-[1rem] border border-white rounded-2xl mt-[1rem] bg-[#192A41]'>
				<BreadCrumbs text='Development' />

				<CourseTop text='Introduction to Blockchain Technology' />

				{/* <div className='flex justify-between items-center max-md:flex-col gap-3 max-md:items-start'>
					<Creators />
					<Rating />
				</div> */}

				<div className=' relative w-full h-[20rem] my-[1rem]'>
					<Image
						src={img}
						alt=''
						layout='fill'
						objectFit='cover'
						className=' rounded-2xl'
					/>

					<div className=' absolute top-[50%] bottom-[50%] left-[50%] mx-auto right-[50%] text-[#FF6636] text-2xl p-[0.5rem] bg-white w-[3rem] h-[3rem] rounded-full flex items-center justify-center cursor-pointer'>
						<FaPlay />
					</div>
				</div>

				<div className=' flex gap-5 max-lg:flex-col'>
					<CourseContent />

					<Comments />
				</div>
			</div>
		</div>
	)
}

export default Watch
