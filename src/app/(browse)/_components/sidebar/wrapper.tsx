"use client";

// import { cn } from "util"
import { useSidebar } from "../../../../../store/use-sidebar";

interface WrapperProps {
	children: React.ReactNode;
};



export const Wrapper = ({
	children, 
}: WrapperProps) => {
	const { collapsed } = useSidebar((state) => state);

	return (
		<aside 
		  className={`sticky left-0 flex flex-col h-screen border-r bg-[#1f1f23] pt-20 ${ collapsed? 'w-10' : 'w-70'}`}
		>
		{children}
		</aside>
	)
}