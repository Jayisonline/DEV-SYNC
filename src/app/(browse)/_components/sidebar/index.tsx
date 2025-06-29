

import { currentUser } from "@clerk/nextjs/server"
import { getRecommended } from "../../../../../lib/recommended-user"
import { Recommended } from "./recommended"
import { Toggle } from "./toggle"
import { Wrapper } from "./wrapper"
// import { usePathname } from "next/navigation"
import UserSidebar from "./user-sidebar"

export const Sidebar = async () => {

	const recommended = await getRecommended();

	const user = await currentUser();
	
	// const pathname = usePathname();


	
	return ( 
		<Wrapper>
			<Toggle />

			

			<div className="space-y-4 pt-4 lg:pt-0">
				<Recommended data={recommended} />
			</div>
		</Wrapper>	
	)


}