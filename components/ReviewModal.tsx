'use client'

import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import StarRatings from 'react-star-ratings'
import { BtnNeutral, BtnPrimary } from './Btn'

interface IsReview {
	setIsReview: React.Dispatch<React.SetStateAction<boolean>>
}

const ReviewModal: React.FC<IsReview> = ({ setIsReview }) => {
	const [rating, setRating] = useState(0)

	const changeRating = (newRating: number) => {
		setRating(newRating)

		console.log(newRating)
	}

	return (
		<div className=' bg-[#344054c0] fixed w-[100vw] h-[100vh] top-0 bottom-0 left-0 right-0 flex items-center justify-center z-[100]'>
			<div className=' bg-white rounded-lg w-[30rem] p-[1rem] grid gap-4 max-sm:w-[90vw]'>
				<div className=' flex justify-between items-center'>
					<h3 className=' text-[#1D2026] font-medium'>Write a review</h3>
					<div
						className=' text-[#8C94A3] text-2xl flex justify-end cursor-pointer'
						onClick={() => setIsReview(false)}
					>
						<IoClose />
					</div>
				</div>

				<div className=''>
					<p className=' font-medium text-center'>
						4.7 <span className=' text-[#8C94A3]'>(Good/Amazing)</span>
					</p>

					<div className=' my-[0.5rem] grid justify-items-center'>
						<StarRatings
							rating={rating}
							changeRating={changeRating}
							numberOfStars={5}
							name='rating'
							starHoverColor='#FD8E1F'
							starRatedColor='#FD8E1F'
							starDimension='30px'
							starSpacing='3px'
						/>
					</div>
				</div>

				<div className=' flex flex-col'>
					<label htmlFor='feedback text-sm mb-[1rem] text-[#1D2026]'>
						Feedback
					</label>
					<textarea
						name='feedback'
						id='feedback'
						rows={4}
						placeholder='Write down your feedback here...'
						className=' border border-[#E9EAF0] text-[#8C94A3] placeholder:text-[#8C94A3] p-[1rem] rounded-lg text-sm'
					></textarea>

					<div className=' my-[1rem] flex justify-between items-center'>
						<div className='' onClick={() => setIsReview(false)}>
							<BtnNeutral text='Cancel' />
						</div>
						<BtnPrimary text='Submit review' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReviewModal
