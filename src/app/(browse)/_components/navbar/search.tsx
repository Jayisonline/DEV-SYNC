'use client'


import qs from "querystring"
import { useState } from "react"
import { SearchIcon, X, Search} from "lucide-react"
import { useRouter } from "next/navigation"


export const SearchInput = () => {

	const router = useRouter();
	const [value, setValue] = useState("");


	// const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();

	// 	if (!value) return;

	// 	const url = qs.stringify({
	// 		url: "/", 
	// 		query: { term: value }, 
	// 	}, { skipEmptyString: true });

	// 	router.push(url);
	// }

	console.log("I am logged here")
	return( 
		<div>
			<form 
				onSubmit={() => {}}
			className="relative w-full lg:w-[400px] flex items-center">

			<input
			value = {value}
			onChange={(e) => setValue(e.target.value)}

			placeholder="Search" className="rounded-r-none focus-visible:ring-transparent focus-visible:ring-offset-0" />
			{/* <Button /> */}

			<Search />
			</form>
		</div>
	)
}