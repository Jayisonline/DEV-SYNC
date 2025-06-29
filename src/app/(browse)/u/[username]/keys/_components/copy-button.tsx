'use client'

import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";


interface CopyButtonProps {
	value?: string;
}

export const CopyButton = ({value, }: CopyButtonProps) =>{

	const [isCopied, setIsCopied] = useState(false);

	const onCopy =() => {
		if (!value) return;
		setIsCopied(true);
		navigator.clipboard.writeText(value);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	}

	const Icon = isCopied? CheckCheck : Copy;

	return (
		<button
			onClick={onCopy}
			disabled={!value || isCopied}
			className="h-10 w-20 bg-black rounded-xl"
			
		>

			<div>Copy</div>
			
		</button>
	)

}