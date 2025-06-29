"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useSidebar } from "../../../../../store/use-sidebar";


// this is still a server component
export const Toggle = () => {

	const {
		 collapsed, 
		 onExpand, 
		 onCollapse
	} = useSidebar((state) => state);

	const label = collapsed? "Expand" : "Collapse";

	return (

		<>

			{collapsed && (
				<div className="hidden lg:flex items-center justify-center m-4 pt-0">
					<button 
						onClick={onExpand}
						className="h-auto p-2 rounded-4xl hover:bg-blue-400 ">
					<ArrowRightFromLine className="h-4 w-4" />
					</button>
				</div>
			)}	

			{!collapsed && (
				<div className="p-3 pl-6 mb-2 flex items-center w-full">
					<p className="font-semibold text-primary">
						For you
					</p>
					<button 
					 onClick={onCollapse}
					 className="h-auto p-2 ml-auto rounded-4xl hover:bg-blue-400 ">
						<ArrowLeftFromLine className="h-4 w-4" />
					</button>
				</div>
			)}
		</>
	)
}