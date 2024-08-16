'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import BreadCrumbs from './BreadCrumbs'
import { BtnPrimaryWhite } from './Btn'
import CourseTop from './CourseTop'
import img from '@/public/assets/course.jpeg'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import Creators from './Creators'
import Rating from './Rating'

const CourseDetails = () => {
	const router = useRouter()

	return (
		<div>
			<div
				className=' flex gap-2 items-center text-white font-medium cursor-pointer'
				onClick={() => router.back()}
			>
				<IoMdArrowRoundBack />
				Course details
			</div>
			<div className=' p-[1rem] border border-white rounded-2xl mt-[1rem] bg-[#192A41]'>
				<BreadCrumbs text='Development' />

				<CourseTop />

				<p className=' text-sm text-[#aaaaaa] max-sm:text-[0.8rem]'>
					Learn about the fundamentals of blockchain technology. Understand how
					it works, its history, and its potential applications across various
					industries. This course is perfect for beginners looking to grasp the
					basics
				</p>

				<div className='flex justify-between items-center max-md:flex-col gap-3 max-md:items-start'>
					<Creators />
					<Rating />
				</div>

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

				<h2 className=' text-xl text-white font-bold mb-[1rem]'>Description</h2>
				<p className=' text-[#aaaaaa] text-sm max-md:text-[0.8rem]'>
					Lorem ipsum dolor sit amet consectetur. Tortor nec tempus nibh quis ut
					quis eget quisque laoreet. Non egestas lectus et scelerisque ornare
					neque massa leo integer. Urna a vitae posuere fames laoreet
					pellentesque eu augue. Leo pellentesque tincidunt eu fusce. Praesent
					eu scelerisque etiam et sollicitudin nunc quam dolor egestas. Erat ut
					mi morbi pulvinar nullam aenean mi lacus. Molestie facilisis gravida
					pellentesque massa diam vel orci tristique nibh. Hendrerit eget tellus
					felis gravida tortor. Hac laoreet in varius egestas tempor varius
					massa suspendisse.Lorem ipsum dolor sit amet consectetur. Tortor nec
					tempus nibh quis ut quis eget quisque laoreet. Non egestas lectus et
					scelerisque ornare neque massa leo integer. Urna a vitae posuere fames
					laoreet pellentesque eu augue. Leo pellentesque tincidunt eu fusce.
					Praesent eu scelerisque etiam et sollicitudin nunc quam dolor egestas.
					Erat ut mi morbi pulvinar nullam aenean mi lacus. Molestie facilisis
					gravida pellentesque massa diam vel orci tristique nibh. Hendrerit
					eget tellus felis gravida tortor. Hac laoreet in varius egestas tempor
					varius massa suspendisse.Lorem ipsum dolor sit amet consectetur.
					Tortor nec tempus nibh quis ut quis eget quisque laoreet. Non egestas
					lectus et scelerisque ornare neque massa leo integer. Urna a vitae
					posuere fames laoreet pellentesque eu augue. Leo pellentesque
					tincidunt eu fusce. Praesent eu scelerisque etiam et sollicitudin nunc
					quam dolor egestas. Erat ut mi morbi pulvinar nullam aenean mi lacus.
					Molestie facilisis gravida pellentesque massa diam vel orci tristique
					nibh. Hendrerit eget tellus felis gravida tortor. Hac laoreet in
					varius egestas tempor varius massa suspendisse.Lorem ipsum dolor sit
					amet consectetur. Tortor nec tempus nibh quis ut quis eget quisque
					laoreet. Non egestas lectus et scelerisque ornare neque massa leo
					integer. Urna a vitae posuere fames laoreet pellentesque eu augue. Leo
					pellentesque tincidunt eu fusce. Praesent eu scelerisque etiam et
					sollicitudin nunc quam dolor egestas. Erat ut mi morbi pulvinar nullam
					aenean mi lacus. Molestie facilisis gravida pellentesque massa diam
					vel orci tristique nibh. Hendrerit eget tellus felis gravida tortor.
					Hac laoreet in varius egestas tempor varius massa suspendisse.
				</p>
			</div>
		</div>
	)
}

export default CourseDetails
