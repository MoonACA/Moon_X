import React from 'react'
import { IoSend } from 'react-icons/io5'

interface Text {
	text: string
}

export const BtnPrimaryFull: React.FC<Text> = ({ text }) => {
	return (
		<div>
			<button className=' text-center w-full bg-gradient-to-r from-[#EB7568] to-[#FAB142] p-[0.5rem] rounded-lg text-white font-medium'>
				{text}
			</button>
		</div>
	)
}

export const BtnPrimaryWhite: React.FC<Text> = ({ text }) => {
	return (
		<div>
			<button className=' text-center text-[#00122C] bg-white p-[0.5rem] rounded-lg font-medium text-sm'>
				{text}
			</button>
		</div>
	)
}

export const BtnNeutral: React.FC<Text> = ({ text }) => {
	return (
		<div>
			<button className=' text-center text-[#00122C] bg-[#F5F7FA] py-[0.5rem] px-[1rem] rounded-lg font-medium text-sm'>
				{text}
			</button>
		</div>
	)
}

export const BtnPrimary: React.FC<Text> = ({ text }) => {
	return (
		<div>
			<button className=' text-center bg-gradient-to-r from-[#EB7568] to-[#FAB142] py-[0.5rem] px-[1rem] rounded-lg font-medium text-sm flex gap-2 items-center text-white'>
				{text}
				<IoSend />
			</button>
		</div>
	)
}

export const BtnSubmit: React.FC<Text> = ({ text }) => {
	return (
		<div>
			<button
				className=' text-center bg-[#FF6636] py-[0.5rem] px-[1rem] font-medium text-sm flex gap-2 items-center text-white'
				type='submit'
			>
				{text}
			</button>
		</div>
	)
}

export const BtnCancel: React.FC<Text> = ({ text }) => {
	return (
		<div>
			<button className=' text-center bg-[#FFFFFF] py-[0.5rem] px-[1rem] font-medium text-sm flex gap-2 items-center text-[#6E7485]'>
				{text}
			</button>
		</div>
	)
}
