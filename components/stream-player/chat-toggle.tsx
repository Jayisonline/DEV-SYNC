"use client"




import { ArrowLeftFromLine , ArrowRightFromLine } from "lucide-react"



import { Hint } from "../ui/hint"
import { useChatSidebar } from "../../store/use-chat-sidebar"



export const ChatToggle = () => {

	const {
		collapsed, 
		onExpand, 
		onCollapse,
	} = useChatSidebar((state)=>state);

	const Icon = collapsed? ArrowLeftFromLine: ArrowRightFromLine;

	const onToggle = () => {
		if (collapsed){
			onExpand();
		}
		else {
			onCollapse();
		}
	}


	return (

		<div>

			<button
				onClick={onToggle}
				className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
			>
				<Icon className="h-4 w-4"/>
			</button> 

		</div>
	);


};


