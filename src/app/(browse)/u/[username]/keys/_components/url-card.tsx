import { CopyButton } from "./copy-button";


interface UrlCardProps {
	value: string | "";

}


export const URLcard = ({value}: UrlCardProps) => {

	return(
		<div className="rounded-xl bg-[#18181b] p-6 w-full">
			<div className="flex items-center gap-x-10">

				<p className="font-semibold shrink-0">
					Server URL
				</p>	

				<div className="space-y-2 w-full">
					<div className="w-200 flex items-center gap-x-2">
						<input 
							value={value || ""}
							disabled
							placeholder="Server URL"
							className="w-200"
						/>

						<CopyButton />
					</div>
				</div>
			</div>
			
		</div>
	)
}