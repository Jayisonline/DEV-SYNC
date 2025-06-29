import Image from "next/image";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { User } from "@clerk/nextjs/server";


export default function Home() {
  return (
    <div 
    // className="w-full h-200 bg-green-500 mt-20 ml-70"
    >
      

       <p>hello this is home</p>
    </div>
  );
} 
