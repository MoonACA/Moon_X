'use client'

import React, { useState } from 'react'
import { BtnPrimaryWhite } from './Btn'
import ReviewModal from './ReviewModal'

interface CourseTop {
	text: string
}

const CourseTop: React.FC<CourseTop> = ({ text }) => {
	const [isModal, setIsModal] = useState(false)

	return (
		<div>
			{isModal && <ReviewModal setIsReview={setIsModal} />}
			<div className=' flex justify-between items-center my-[1rem] max-sm:flex-col max-md:items-start gap-3'>
				<h1 className=' text-white font-semibold text-[2rem] max-sm:text-[1rem]'>
					Introduction to Blockchain Technology
				</h1>

				<div className='' onClick={() => setIsModal(true)}>
					<BtnPrimaryWhite text='Write a review' />
				</div>
			</div>
		</div>
	)
}

export default CourseTop
