'use client'

import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { MdOutlineDelete } from 'react-icons/md'
import { BtnSubmit } from './Btn'

interface Course {
	id: number | undefined
	title: string
	image: string
}

interface Module {
	id: number | undefined
	title: string
	courses: Course[]
}

interface ModuleProps {
	isModuleAdd: boolean
	setIsModuleAdd: React.Dispatch<React.SetStateAction<boolean>>
}

const ModuleModal: React.FC<ModuleProps> = ({
	isModuleAdd,
	setIsModuleAdd,
}) => {
	const [modules, setModules] = useState<Module[]>([
		{
			id: 1,
			title: '',
			courses: [
				{
					id: 1,
					title: '',
					image: '',
				},
			],
		},
	])

	const addVideo = (id: number | undefined) => {
		const updateVideos = modules.map((module) =>
			module.id === id
				? {
						...module,
						courses: [
							...module.courses,
							{
								id: Math.floor(Math.random() * 1000000),
								title: '',
								image: '',
							},
						],
				  }
				: module
		)

		setModules(updateVideos)

		console.log(modules)
	}

	const removeVideo = (item: number | undefined, video: number | undefined) => {
		console.log(item)

		const updateVideos = modules.map((module) =>
			module.id === item
				? {
						...module,
						courses: module.courses.filter((course) => course.id !== video),
				  }
				: module
		)

		setModules(updateVideos)
	}

	const addModule = () => {
		setModules([
			...modules,
			{
				id: Math.floor(Math.random() * 1000000),
				title: '',
				courses: [
					{
						id: Math.floor(Math.random() * 1000000),
						title: '',
						image: '',
					},
				],
			},
		])

		console.log(modules)
	}

	return (
		<div className=' bg-[#000000cc] fixed z-[1000] top-0 bottom-0 left-0 right-0 h-[100vh] w-[100vw] flex items-center justify-center'>
			<div className='bg-white w-[40vw] mx-auto max-h-[80vh] overflow-x-scroll max-xl:w-[60vw] max-lg:w-[70vw] max-md:w-[90vw]'>
				<div className=' p-[1rem] flex justify-between items-center text-sm font-medium'>
					<h2>Add Modules</h2>
					<IoClose
						color='#1D2026'
						className=' text-xl cursor-pointer'
						onClick={() => setIsModuleAdd(false)}
					/>
				</div>

				{modules.map((module, index) => (
					<div className=' p-[1rem]' key={module.id}>
						<div className=' grid gap-2'>
							<label htmlFor='name' className=' text-sm font-medium'>
								Module {index + 1}
							</label>
							<input
								type='text'
								className=' p-[0.5rem] border rounded-md text-sm'
								placeholder='Introduction'
							/>
						</div>

						<div className=''>
							{module.courses.map((course) => (
								<div
									className='pl-[1rem] flex gap-2 mt-[1rem] max-md:flex-col'
									key={course.id}
								>
									<input
										type='text'
										className=' p-[0.5rem] border rounded-md text-sm w-[40%] max-md:w-full'
										placeholder='Video title'
									/>
									<input
										type='file'
										className=' p-[0.5rem] border rounded-md text-sm w-[40%'
										placeholder='Video title'
									/>
									{course.id === module.courses.at(-1)?.id ? (
										<div
											className='text-sm flex gap-1 items-center font-medium text-[#FF6636] border border-[#FF6636] rounded-md px-[0.5rem] cursor-pointer max-md:w-[5rem] max-md:py-[0.5rem] max-md:justify-center'
											onClick={() => addVideo(module?.id)}
										>
											<p className=''>+</p> Add
										</div>
									) : (
										<div
											className='text-sm flex gap-1 items-center font-medium text-[#FF6636] border border-[#DC2626] rounded-md px-[0.5rem] cursor-pointer max-md:w-[3rem] max-md:py-[0.5rem] max-md:justify-center'
											onClick={() => removeVideo(module?.id, course?.id)}
										>
											<MdOutlineDelete
												color='#DC2626'
												className=' text-2xl cursor-pointer'
											/>
										</div>
									)}
								</div>
							))}
						</div>

						<div
							className='text-sm flex justify-center py-[0.5rem] my-[1rem] items-center font-medium text-[#FF6636] border border-[#FF6636] rounded-md px-[0.5rem] cursor-pointer w-[8rem]'
							onClick={() => addModule()}
						>
							<p className=''>Add Module</p>
						</div>
					</div>
				))}

				<div className='mt-[2rem] px-[1rem]'>
					<BtnSubmit text='Add Modules' />
				</div>
			</div>
		</div>
	)
}

export default ModuleModal
