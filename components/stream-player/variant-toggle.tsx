"use client"




import { ArrowLeftFromLine , ArrowRightFromLine, MessageSquare, Users } from "lucide-react"



import { Hint } from "../ui/hint"
import { ChatVariant, useChatSidebar } from "../../store/use-chat-sidebar"



export const VariantToggle = () => {

	const {
		variant, 
		onChangeVariant
	} = useChatSidebar((state)=>state);

	const isChat = variant === ChatVariant.CHAT;

	const Icon = variant === ChatVariant.CHAT ? Users: MessageSquare;

	const onToggle = () => {
		const newVariant  = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
		onChangeVariant(newVariant);
	}

	const label = isChat ? "Community": "Go back to chat";


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


