'use client'

import React, { useState } from 'react'
import { MdOutlinePlayCircle, MdOutlinePause } from 'react-icons/md'
import { IoMdTime } from 'react-icons/io'
import { RiCheckDoubleLine } from 'react-icons/ri'
import { FaChevronDown } from 'react-icons/fa6'
import { FaPlay } from 'react-icons/fa'

const CourseContent = () => {
	const [isActive, setIsActive] = useState(1)
	const [isPlay, setIsPlay] = useState(0)

	const modules = [
		{
			title: 'Get Started',
			id: 1,
			duration: 53,
			courses: [
				{
					title: 'What is Blockchain?',
					duration: '7:31',
				},
				{
					title: 'History of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The impact of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The future of Blockchain',
					duration: '7:31',
				},
			],
		},
		{
			title: 'Introduction to Web3',
			id: 2,
			duration: 53,
			courses: [
				{
					title: 'What is Blockchain?',
					duration: '7:31',
				},
				{
					title: 'History of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The impact of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The future of Blockchain',
					duration: '7:31',
				},
			],
		},
		{
			title: 'How to Create NFTs',
			id: 3,
			duration: 53,
			courses: [
				{
					title: 'What is Blockchain?',
					duration: '7:31',
				},
				{
					title: 'History of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The impact of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The future of Blockchain',
					duration: '7:31',
				},
			],
		},
		{
			title: 'Crypto as the Future',
			id: 4,
			duration: 53,
			courses: [
				{
					title: 'What is Blockchain?',
					duration: '7:31',
				},
				{
					title: 'History of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The impact of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The future of Blockchain',
					duration: '7:31',
				},
			],
		},
		{
			title: 'The future of Alt coins',
			id: 5,
			duration: 53,
			courses: [
				{
					title: 'What is Blockchain?',
					duration: '7:31',
				},
				{
					title: 'History of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The impact of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The future of Blockchain',
					duration: '7:31',
				},
			],
		},
		{
			title: 'Advanced',
			id: 6,
			duration: 53,
			courses: [
				{
					title: 'What is Blockchain?',
					duration: '7:31',
				},
				{
					title: 'History of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The impact of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The future of Blockchain',
					duration: '7:31',
				},
			],
		},
		{
			title: 'What’s Next',
			id: 7,
			duration: 53,
			courses: [
				{
					title: 'What is Blockchain?',
					duration: '7:31',
				},
				{
					title: 'History of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The impact of Blockchain',
					duration: '7:31',
				},
				{
					title: 'The future of Blockchain',
					duration: '7:31',
				},
			],
		},
	]

	const handleActive = (id: number) => {
		if (isActive === id) {
			setIsActive(0)
		} else {
			setIsActive(id)
		}
	}

	return (
		<div className=' max-lg:w-[100%] w-[50%] bg-[#00122C] p-[1rem]'>
			<div className=' flex justify-between items-center mb-[1rem]'>
				<h1 className=' text-white font-medium'>Course Content</h1>
				<p className=' text-[#23BD33] text-sm'>15% Completed</p>
			</div>

			{/* Progress bar */}
			<div className=''></div>

			<div className=''>
				{modules.map((module, index) => (
					<div
						className={` text-white ${
							modules.length !== index + 1 && 'border-b border-white'
						} ${isActive === module.id && 'pb-[1rem]'}`}
						key={module.id}
					>
						<div
							className={`${
								isActive === module.id && 'bg-[#192A41] mb-[1rem]'
							} flex justify-between items-center  p-[1rem] cursor-pointer max-lg:px-[0.5rem]`}
							onClick={() => handleActive(module.id)}
						>
							<div className=' flex items-center gap-2 font-medium max-lg:gap-1'>
								<div
									className={` ${
										isActive === module.id && 'rotate-180'
									} transition-all ease-in-out duration-100 max-lg:text-sm`}
								>
									<FaChevronDown />
								</div>
								<p className=' max-lg:text-sm'>{module.title}</p>
							</div>

							<div className=' text-sm flex items-center gap-3 max-lg:text-[0.7rem] max-lg:gap-1'>
								<p className=' flex gap-1 items-center'>
									<MdOutlinePlayCircle color='#564FFD' />
									{module.courses.length} lectures
								</p>
								<p className=' flex gap-1 items-center'>
									<IoMdTime color='#FD8E1F' />
									{module.duration}m
								</p>
								{module.id === 1 && (
									<p className=' flex gap-1 items-center'>
										<RiCheckDoubleLine color='#23BD33' />
										25% finish (1/4)
									</p>
								)}
							</div>
						</div>

						{isActive === module.id &&
							module.courses.map((course, index) => (
								<div
									className=' flex justify-between items-center py-[1rem] px-[3rem] hover:bg-[#192A41] transition-all ease-in-out duration-75 max-lg:px-[1.5rem]'
									key={index}
								>
									<div className=' flex items-center gap-2 text-sm'>
										<input
											type='checkbox'
											name=''
											id=''
											className=' border border-[#F9B142] checked:bg-[#F9B142]'
										/>
										<p className=''>
											{index + 1}. {course.title}
										</p>
									</div>

									<div className=' flex items-center text-sm gap-2'>
										{isPlay === index + 1 ? <MdOutlinePause /> : <FaPlay />}
										<p className=''>{course.duration}</p>
									</div>
								</div>
							))}
					</div>
				))}
			</div>
		</div>
	)
}

export default CourseContent
