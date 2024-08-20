import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

interface Route {
	text: string
	route: string
}

const GoBack: React.FC<Route> = ({ text, route }) => {
	const router = useRouter()

	return (
		<div>
			<div
				className=' flex gap-2 items-center text-white font-medium cursor-pointer'
				onClick={() => router.push(route)}
			>
				<IoMdArrowRoundBack />
				{text}
			</div>
		</div>
	)
}

export default GoBack
