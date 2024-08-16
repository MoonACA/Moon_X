import React from 'react'
import { IoWarningOutline } from 'react-icons/io5'
import { BtnPrimaryFull } from './Btn'

interface IsLow {
	setIsLowCred: React.Dispatch<React.SetStateAction<boolean>>
}

const LowCreditModal: React.FC<IsLow> = ({ setIsLowCred }) => {
	return (
		<div className=' bg-[#344054c0] fixed w-[100vw] h-[100vh] top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
			<div className=' bg-white rounded-lg w-[25rem] p-[1rem] grid gap-4 max-sm:w-[90vw]'>
				<div className=' bg-[#FEF0C7] text-2xl w-[3rem] h-[3rem] rounded-full text-[#DC6803] flex items-center justify-center'>
					<IoWarningOutline />
				</div>

				<div className=''>
					<h3 className=' font-medium text-[#101828] text-[1.2rem] mb-[0.5rem]'>
						Low Cred Value!
					</h3>
					<p className=' text-sm text-[#667085]'>
						You need a minimum Cred vaue of 10 MAND to start course.
					</p>
				</div>

				<div className='' onClick={() => setIsLowCred(false)}>
					<BtnPrimaryFull text={'Home'} />
				</div>
			</div>
		</div>
	)
}

export default LowCreditModal
