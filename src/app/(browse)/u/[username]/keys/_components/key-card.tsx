'use client'

import { CopyButton } from "./copy-button";
import { useState } from "react";

interface KeyCardProps {
	value: string | null;
}

export const KeyCard = ({value } : KeyCardProps) => {

	const [show, setShow] = useState(false);

	return (
		<div className="rounded-xl bg-[#18181b] p-6">
					<div className="flex items-center gap-x-10">
		
						<p className="font-semibold shrink-0">
							Stream Key
						</p>	
		
						<div className="space-y-2 w-full">
							<div className="w-full flex items-center gap-x-2">
								<input 
									value={value || ""}
									disabled
									type={show? "text" : "password"}
									placeholder="Stream key"
									className="w-200"
								/>
								<CopyButton value={value || ""}/>
								
							</div>

							<button 
								onClick={() => setShow(!show)}
							>
								{show? "Hide":"Show"}
							</button>
						</div>
					</div>
					
				</div>
	)

}
