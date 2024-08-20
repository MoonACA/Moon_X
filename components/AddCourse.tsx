'use client'

import React, { useState } from 'react'
import { FaRegImage } from 'react-icons/fa6'
import { MdOutlineFileUpload } from 'react-icons/md'
import { BtnCancel, BtnSubmit } from './Btn'
import QuizModal from './QuizModal'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ModuleModal from './ModuleModal'

const AddCourse = () => {
	const [addQuiz, setAddQuiz] = useState(false)
	const [value, setValue] = useState('')
	const [isModuleAdd, setIsModuleAdd] = useState(false)

	return (
		<div className=' bg-[#192A41] p-[1rem] rounded-xl border border-white'>
			{addQuiz && <QuizModal addQuiz={addQuiz} setAddQuiz={setAddQuiz} />}

			{isModuleAdd && (
				<ModuleModal
					isModuleAdd={isModuleAdd}
					setIsModuleAdd={setIsModuleAdd}
				/>
			)}

			<div className=''>
				<form action='' className=''>
					<div className=' grid grid-cols-3 gap-3 max-md:grid-cols-2'>
						<div className=' flex flex-col gap-1'>
							<label htmlFor='title' className=' text-sm text-white'>
								Course Title
							</label>
							<input
								type='text'
								id='title'
								name='title'
								placeholder='Write course title'
								className=' p-[0.5rem] rounded-lg border-none'
							/>
						</div>
						<div className=' flex flex-col gap-1'>
							<label htmlFor='category' className=' text-sm text-white'>
								Course Category
							</label>
							<select
								name='category'
								id='category'
								className=' p-[0.5rem] rounded-lg border-none'
							>
								<option value=''>Blockchain</option>
								<option value=''>Blockchain</option>
								<option value=''>Blockchain</option>
							</select>
						</div>
						<div className=' flex flex-col gap-1'>
							<label htmlFor='topic' className=' text-sm text-white'>
								Course Topic
							</label>
							<select
								name='topic'
								id='topic'
								className=' p-[0.5rem] rounded-lg border-none'
							>
								<option value=''>Blockchain</option>
								<option value=''>Blockchain</option>
								<option value=''>Blockchain</option>
							</select>
						</div>
						<div className=' flex flex-col gap-1'>
							<label htmlFor='subtitle' className=' text-sm text-white'>
								Subtitle (Optional)
							</label>
							<select
								name='subtitle'
								id='subtitle'
								className=' p-[0.5rem] rounded-lg border-none'
							>
								<option value=''>Blockchain</option>
								<option value=''>Blockchain</option>
								<option value=''>Blockchain</option>
							</select>
						</div>
						<div className=' flex flex-col gap-1'>
							<label htmlFor='duration' className=' text-sm text-white'>
								Course Duration
							</label>
							<select
								name='duration'
								id='duration'
								className=' p-[0.5rem] rounded-lg border-none'
							>
								<option value=''>Blockchain</option>
								<option value=''>Blockchain</option>
								<option value=''>Blockchain</option>
							</select>
						</div>
					</div>

					<div
						className=' cursor-pointer bg-[#FFEECB] p-[0.5rem] w-[8rem] mt-[1rem] rounded-lg text-sm flex items-center justify-center font-medium'
						onClick={() => setIsModuleAdd(true)}
					>
						Add Modules
					</div>

					<div className=' mt-[1rem] mb-[4rem] flex flex-col gap-2'>
						<label htmlFor='' className=' text-white text-sm'>
							Course Description
						</label>
						<ReactQuill
							theme='snow'
							value={value}
							onChange={setValue}
							style={{ color: '#fff', height: '10rem' }}
						/>
					</div>

					{/* <div className=''>
						<EditorContent editor={editor} style={{ whiteSpace: 'pre-line' }} />
						<Toolbar editor={editor} content={content} />
					</div> */}

					<div className=' my-[1rem]'>
						<label htmlFor='thumbnail' className=' flex flex-col gap-2'>
							<p className=' text-sm text-white'>Course Thumbnail</p>
							<div className=' flex items-end gap-5'>
								<FaRegImage
									className='bg-[#F5F7FA] p-[2rem] text-[10rem]'
									color='#B7BAC7'
								/>
								<div className=' w-[20rem]'>
									<p className=' text-[0.8rem] mb-[1rem] text-[#F5F7FA]'>
										Upload your course Thumbnail here. Important guidelines:
										1200x800 pixels or 12:8 Ratio. Supported format: .jpg,
										.jpeg, or .png
									</p>
									<div className=' flex gap-2 items-center text-[#FF6636] bg-[#FFEEE8] w-[10rem] justify-center py-[0.5rem] text-sm cursor-pointer'>
										Upload Image <MdOutlineFileUpload />
									</div>
								</div>
							</div>
						</label>
						<input
							type='file'
							name='thumbnail'
							id='thumbnail'
							className=' hidden'
						/>
					</div>

					<div className='flex gap-5 items-center max-md:flex-col max-md:gap-2'>
						<div className=' my-[1rem] w-[25rem] max-md:w-full'>
							<label htmlFor='notes' className=' flex flex-col gap-2'>
								<p className=' text-sm text-white'>Add Lecture Note</p>
								<div className=' bg-[#F5F7FA] p-[2rem] text-center'>
									<h3 className=' font-medium'>Upload Notes</h3>
									<p className=' text-[#8C94A3] text-sm'>
										Drag an drop a file or{' '}
										<span className=' text-[#4E5566] cursor-pointer hover:underline'>
											browse file
										</span>
									</p>
								</div>
							</label>
							<input type='file' name='notes' id='notes' className=' hidden' />
						</div>

						<div className=' flex flex-col gap-2 w-[10rem] max-md:w-full'>
							<p className='text-sm text-white'>Set Quiz Questions</p>
							<div
								className=' bg-[#F5F7FA] p-[2rem] text-center cursor-pointer'
								onClick={() => setAddQuiz(true)}
							>
								<h3 className=' font-medium'>Quiz</h3>
								<p className=' text-[#8C94A3] text-sm'>Set Quiz</p>
							</div>
						</div>
					</div>

					<div className=' flex items-center justify-between mt-[1rem]'>
						<BtnCancel text='Cancel' />
						<BtnSubmit text='Submit for Review' />
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddCourse
