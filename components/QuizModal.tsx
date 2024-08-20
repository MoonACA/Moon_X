'use client'

import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { MdOutlineDelete } from 'react-icons/md'
import { BtnCancel, BtnSubmit } from './Btn'
import NextQuiz from './NextQuiz'

interface Quiz {
	addQuiz: boolean
	setAddQuiz: React.Dispatch<React.SetStateAction<boolean>>
}

const QuizModal: React.FC<Quiz> = ({ addQuiz, setAddQuiz }) => {
	const [next, setNext] = useState(false)

	const handleSubmit = (e: any) => {
		e.preventDefault()

		// setAddQuiz(false)
		setNext(true)
	}

	return (
		<>
			{next && <NextQuiz />}
			{!next && (
				<div className=' bg-[#000000cc] fixed z-[1000] top-0 bottom-0 left-0 right-0 h-[100vh] w-[100vw] flex items-center justify-center'>
					<div className='bg-white w-[40vw] mx-auto max-md:w-[90vw]'>
						<div className='  border-b border-[#E9EAF0]'>
							<div className=' p-[1rem] flex justify-between items-center text-sm font-medium'>
								<h3>Set Quiz</h3>
								<IoClose
									color='#1D2026'
									className=' text-xl cursor-pointer'
									onClick={() => setAddQuiz(false)}
								/>
							</div>
						</div>

						<div className=' p-[1rem]'>
							<form action='' className='' onSubmit={handleSubmit}>
								<div className=' grid gap-2'>
									<label htmlFor='question' className=' text-sm font-medium'>
										Question 1
									</label>
									<input
										type='text'
										className=' p-[0.5rem] border rounded-md text-sm'
										placeholder='What is Blockchain?'
									/>
								</div>

								<div className=' mt-[1rem] grid gap-2'>
									<label htmlFor='' className=' text-sm font-medium'>
										Options
									</label>

									<div className=' flex gap-2 w-[100%] items-center mb-[0.5rem]'>
										<p className=' text-[#8C94A3]'>A.</p>
										<input
											type='text'
											className=' p-[0.5rem] border rounded-md w-full text-sm'
											placeholder='Blockchain are blocks chained together'
										/>
										<MdOutlineDelete
											color='#DC2626'
											className=' text-2xl cursor-pointer'
										/>
									</div>
									<div className=' flex gap-2 w-[100%] items-center mb-[0.5rem]'>
										<p className=' text-[#8C94A3]'>B.</p>
										<input
											type='text'
											className=' p-[0.5rem] border rounded-md w-full text-sm'
											placeholder='It is a cool concept'
										/>
										<MdOutlineDelete
											color='#DC2626'
											className=' text-2xl cursor-pointer'
										/>
									</div>
									<div className=' flex gap-2 w-[100%] items-center mb-[0.5rem]'>
										<p className=' text-[#8C94A3]'>C.</p>
										<input
											type='text'
											className=' p-[0.5rem] border rounded-md w-full text-sm'
											placeholder='It is a system in which a record of transactions are trasparent'
										/>
										<MdOutlineDelete
											color='#DC2626'
											className=' text-2xl cursor-pointer'
										/>
									</div>
									<div className=' flex gap-2 w-[100%] items-center mb-[0.5rem]'>
										<p className=' text-[#8C94A3]'>D.</p>
										<input
											type='text'
											className=' p-[0.5rem] border rounded-md w-full text-sm'
											placeholder='I have no idea'
										/>
										<MdOutlineDelete
											color='#DC2626'
											className=' text-2xl cursor-pointer'
										/>
									</div>
								</div>

								<div className=' mt-[1rem] flex justify-between items-center'>
									<BtnCancel text='Cancel' />
									<BtnSubmit text='Next' />
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default QuizModal
