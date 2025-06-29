"use client"

import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";



const Actions = async () =>{
const user = await currentUser();

	console.log(user?.username);
	const username = user?.username;
	return (
		<div className="flex items-center w-10 h-10 bg-red-700">
					{/* Profile Button - Only show if user is signed in */}
					
						<Link href={`/u/${username}`}>
							<button>
								My Profile
							</button>
						</Link>
					

					{/* Other navbar items can go here */}
				</div>

	);
}

export default Actions;