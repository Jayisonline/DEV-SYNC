"use client"
import { usePathname } from "next/navigation";
import { useSidebar } from "../../../../../store/use-sidebar";
import UserAvatar from "../../../../../components/ui/user-avatar";
import { useRouter } from 'next/navigation';

import Link from 'next/link';

interface UserItemProps {
	username: string;
	imageUrl: string;
	isLive?: boolean;
}




export const UserItem = ({username, imageUrl, isLive}: UserItemProps) => {
	const pathname = usePathname();
	const router = useRouter();

	const { collapsed } = useSidebar((state) => state);


	const herf = `/${username}`;

	const isActive = pathname === herf;

	return ( 
		<button
			className={`w-full h-12 ${collapsed? "justify-center" : "justify-start"}`}
		>
			<Link href={`/${username}`}>
				<div className={`flex items-center w-full gap-x-4 ${collapsed && "justify-center"}`}>
					
				<div
				className="pt-1.5 h-10 w-64 rounded-sm text-left pl-2 hover:bg-[#18181b]">

					<p>
						{username}
					</p>
				</div>
			

				</div>
			</Link>

			
		</button>
	)
}