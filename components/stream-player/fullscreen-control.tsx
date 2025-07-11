'use client'

import { Maximize, Minimize } from "lucide-react"

import { Hint } from "../ui/hint"




interface FullScreenControlProps {
	isFullScreen: boolean;
	onToggle: () => void;

}




export const FullScreenControl = ({isFullScreen, onToggle}: FullScreenControlProps) => {
	const Icon = isFullScreen? Minimize : Maximize;
	const lable = isFullScreen? "Exit fullScreen": "Enter Full Screen";


	return (
		<div className="flex items-center justify-center gap-4">
			<div>
				<button onClick={onToggle} 
						className="text-white p-1.5 hover:bg-white/10 rounded-lg"
				>
					<Icon className="h-5 w-5"/>
				</button>

			</div>
		</div>
	)
}