import React from 'react'
import Card from './Card'

const Courses = () => {
	const courses = [
		{
			img: '/assets/moonxImg1.png',
			category: 'Blockchain',
			title: 'Introduction to Blockchain Technology',
			reward: 50,
			description:
				'Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics',
			rating: 4.9,
			viewers: 100000,
		},
		{
			img: '/assets/moonxImg2.jpeg',
			category: 'Finance and Digital Assets',
			title: 'Decentralized Applications (dAPPs)',
			reward: 50,
			description:
				'Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics',
			rating: 4.9,
			viewers: 100000,
		},
		{
			img: '/assets/moonxImg3.jpeg',
			category: 'Development and Programming',
			title: 'Web3.js for Developers',
			reward: 50,
			description:
				'Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics',
			rating: 4.9,
			viewers: 100000,
		},
		{
			img: '/assets/moonxImg4.png',
			category: 'Finance and Digital Assets',
			title: 'DeFi (Decentralized Finance) Fundamentals',
			reward: 50,
			description:
				'Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics',
			rating: 4.9,
			viewers: 100000,
		},
		{
			img: '/assets/moonxImg1.png',
			category: 'Blockchain',
			title: 'Introduction to Blockchain Technology',
			reward: 50,
			description:
				'Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics',
			rating: 4.9,
			viewers: 100000,
		},
		{
			img: '/assets/moonxImg2.jpeg',
			category: 'Finance and Digital Assets',
			title: 'Decentralized Applications (dAPPs)',
			reward: 50,
			description:
				'Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics',
			rating: 4.9,
			viewers: 100000,
		},
		{
			img: '/assets/moonxImg3.jpeg',
			category: 'Development and Programming',
			title: 'Web3.js for Developers',
			reward: 50,
			description:
				'Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics',
			rating: 4.9,
			viewers: 100000,
		},
		{
			img: '/assets/moonxImg4.png',
			category: 'Finance and Digital Assets',
			title: 'DeFi (Decentralized Finance) Fundamentals',
			reward: 50,
			description:
				'Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics',
			rating: 4.9,
			viewers: 100000,
		},
	]

	return (
		<div className=' bg-[#00122C] py-[10rem] '>
			<div className=' w-[80vw] mx-auto max-sm:w-[80vw]'>
				<div className=' text-white mb-[2rem]'>
					<h1 className=' text-[2rem] font-bold mb-[0.5rem]'>
						Master the Future of the Internet with Web3
					</h1>
					<p className=' text-sm w-[30vw]'>
						Comprehensive Courses on Blockchain, Smart Contracts, and
						Decentralized Applications
					</p>
				</div>

				<h1 className='text-[2rem] text-[#fff] font-bold  mb-[2rem]'>
					Courses
				</h1>
				<div className=' grid grid-cols-4 mx-auto gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 '>
					{courses.map((course, index) => (
						<Card course={course} key={index} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Courses
