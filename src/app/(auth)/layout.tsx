import React from 'react'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
	
	  <>
	   <div className='w-full h-fit'>
		<div className='flex items-center justify-around'>
		  {children}
		</div>

		</div>
		
	  </>

  );
}
