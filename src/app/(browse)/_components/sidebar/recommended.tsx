"use client";

import { User } from "@/generated/prisma"
import { useSidebar } from "../../../../../store/use-sidebar";
import { UserItem } from "./user-item";

interface RecommendedProps {
	data: User[];
}


export const Recommended = ({ data, }: RecommendedProps) => {


	const {collapsed} = useSidebar((state) => state);

	const showLable = !collapsed && data.length > 0;
	
	return ( 
		<div>
			{
				showLable && (
					<div className="pl-6 mb-4">
						<p className="text-sm text-muted-foreground">
							Hello recommeneded user
						</p>
					</div>
				)
			}

			<ul className="space-y-2 px-2">
				{
					data.map((user) => (
						<UserItem 
						key={user.id} 
						username={user.username}
						imageUrl={user.imageURL}
						/>

						
					))
				}
			</ul>
		</div>
	)

}