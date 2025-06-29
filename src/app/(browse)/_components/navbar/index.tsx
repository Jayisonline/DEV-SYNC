"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import {  SearchInput } from "./search";
import { Search } from "lucide-react";

export const Navbar = () => {
	const { user, isLoaded } = useUser();

	if (!isLoaded) return <div>Loading...</div>;

	return (
		<div className="sticky top-0 w-full h-20 bg-[#18181b] shadow-sm px-2 lg:px-4">
			<div className="flex items-center justify-between h-full">
				<div className="flex items-center">
					<Link href="/" className="text-xl font-bold">
						DEV-SYNC
					</Link>
				</div>
				
				<Search />
				<div className="flex items-center gap-x-4">
					{user && (
						<Link 
							href={`/u/${user.username}`}
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
						>
							My Profile
						</Link>
					)}
				</div>

				<UserButton />
			</div>
		</div>
	);
};