'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { FaRegComments } from 'react-icons/fa6'

const Comments = () => {
	const [isReply, setIsReply] = useState(0)

	const comments = [
		{
			id: 1,
			name: 'Ronald Richards',
			duration: 1,
			comment: 'Can you teach us how information is stored on blockchain?',
			type: 'student',
			image: '/assets/commentImg-1.png',
		},
		{
			id: 2,
			name: 'Kristin Watson',
			duration: 1,
			comment: 'You can check out my latest course, i explained that there',
			type: 'tutor',
			image: '/assets/commentImg-2.png',
		},
		{
			id: 3,
			name: 'Cody Fisher',
			duration: 1,
			comment: 'Thank You so much sir, you’re a great tutor. 🔥🔥🔥',
			type: 'student',
			image: '/assets/commentImg-3.png',
		},
		{
			id: 4,
			name: 'Marvin McKinney',
			duration: 3,
			comment:
				'Great tutorial! I’m subscribing. I’m just wondering if is this feasible to be materialized in a real project or can be integrated in an actual app code?',
			type: 'student',
			image: '/assets/commentImg-1.png',
		},
	]

	return (
		<div className=' w-[50%] bg-[#00122C] p-[1rem] text-white max-lg:w-[100%]'>
			<h1 className=' text-2xl font-semibold mb-[1rem]'>
				Comments ({comments.length})
			</h1>
			<div className=''>
				{comments.map((comm) => (
					<div className=' mb-[1rem] ' key={comm.id}>
						<div className=' flex gap-3 items-start'>
							<Image
								src={comm.image}
								alt={comm.name}
								width={50}
								height={50}
								className=' rounded-full'
								objectFit='cover'
							/>

							<div className=''>
								<div className=' text-sm flex items-center gap-3 mb-[0.5rem]'>
									<p className=' font-medium'>{comm.name}</p>
									<div className=' bg-[#6E7485] h-[0.3rem] w-[0.3rem] rounded-full'></div>
									<p className=' text-[0.8rem]'>
										{comm.duration} {comm.duration > 1 ? 'weeks' : 'week'} ago
									</p>
								</div>

								<p className=' text-[#FFEECB] text-sm mb-[0.5rem]'>
									{comm.comment}
								</p>

								<button
									className=' flex gap-2 items-center'
									onClick={() => setIsReply(comm.id)}
								>
									<FaRegComments /> Reply
								</button>
							</div>
						</div>

						{isReply === comm.id && (
							<form action='' className=' mt-[1rem] flex gap-2 mb-[1rem]'>
								<div className=' flex items-center relative'>
									<input
										type='text'
										placeholder='Write your reply'
										className=' py-[0.5rem] pl-[2rem]'
									/>
									<FaRegComments
										color='#000'
										className=' absolute text-[#000] left-[0.5rem]'
									/>
								</div>
								<button className='bg-[#FF6636] px-[0.5rem]'>Post Reply</button>
							</form>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Comments
