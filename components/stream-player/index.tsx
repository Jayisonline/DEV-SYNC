// "use client"

// import { Stream, User } from "@/generated/prisma";
// import { userViewerToken } from "../../hooks/use-viewer-token"
// import { useChatSidebar } from "../../store/use-chat-sidebar";

// import { LiveKitRoom } from "@livekit/components-react"
// import { Video } from "./video";
// import { Chat } from "./chat";
// import { ChatToggle } from "./chat-toggle";

// interface StreamPlayerProps {
// 	user: User,
// 	// stream: Stream,
	
// }


// export const StreamPlayer = ({user}: StreamPlayerProps ) => {

// 	const {token, name, identity} = userViewerToken(user.id);

// 	const {collapsed} = useChatSidebar((state)=> state);

// 	if (!token || !name ){
// 		return(
// 			<div>
// 				not allowed to watch stream
// 			</div>
// 		)
// 	}

// 	else {
// 		return(
// 			<>
// 			{collapsed && (
// 				<div className="hidden lg:block fixed top-[100px] right-2">
// 					<ChatToggle />

// 				</div>
// 			)}

// 			 <LiveKitRoom
// 			 	token={token}
// 				serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
// 				className={`grid grid-cols-1 lg:gap-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full ${ collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'}`}
// 			 > 

// 				<div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">

// 					<Video 
// 						hostname={user.username}
// 						hostIdentity={user.id}
						
// 					/>
// 					<div className={`col-span-1 ${collapsed && 'hidden'}`}>

					
// 						<Chat
// 							viewerName={name}
// 							hostName={user.username}
// 							hostIdentity={user.id}
// 							// isFollowing={isFollowing}
// 							// isChatEnabled={Stream.isChatEnabled}
// 							// isChatDelayed={Stream.isChatDelayed}

// 						/>
// 					</div>

// 				</div>




				

// 			 </LiveKitRoom>
// 			</>
// 		)
// 	}
// }



"use client"

import { Stream, User } from "@/generated/prisma";
import { userViewerToken } from "../../hooks/use-viewer-token"
import { useChatSidebar } from "../../store/use-chat-sidebar";

import { LiveKitRoom } from "@livekit/components-react"
import { Video } from "./video";
import { Chat } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Skeleton } from "../ui/skeleton";

interface StreamPlayerProps {
	user: User,
	// stream: Stream,
}

export const StreamPlayer = ({user}: StreamPlayerProps ) => {

	const {token, name, identity} = userViewerToken(user.id);
	const {collapsed} = useChatSidebar((state)=> state);

	// Loading skeleton while token is being fetched
	if (!token || !name ){
		return(
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
				{/* Header skeleton */}
				<div className="border-b bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
					<div className="max-w-7xl mx-auto px-4 py-4">
						<div className="flex items-center space-x-3">
							<Skeleton className="h-12 w-12 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-6 w-48" />
								<Skeleton className="h-4 w-32" />
							</div>
						</div>
					</div>
				</div>

				{/* Main content skeleton */}
				<div className="max-w-7xl mx-auto p-4">
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
						{/* Video skeleton */}
						<div className="lg:col-span-3 space-y-4">
							<Skeleton className="aspect-video w-full rounded-xl" />
							<div className="space-y-3">
								<Skeleton className="h-8 w-3/4" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-2/3" />
							</div>
						</div>

						{/* Chat skeleton */}
						<div className="lg:col-span-1">
							<div className="bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
								<div className="p-4 border-b">
									<Skeleton className="h-6 w-24" />
								</div>
								<div className="p-4 space-y-4">
									{Array.from({ length: 6 }).map((_, i) => (
										<div key={i} className="flex space-x-3">
											<Skeleton className="h-8 w-8 rounded-full" />
											<div className="space-y-2 flex-1">
												<Skeleton className="h-3 w-20" />
												<Skeleton className="h-4 w-full" />
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Loading message */}
				<div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
					<div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-2xl border">
						<div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							Loading Stream
						</h3>
						<p className="text-gray-600 dark:text-gray-400">
							Please wait while we prepare your viewing experience...
						</p>
					</div>
				</div>
			</div>
		)
	}

	return(
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
			{/* Chat toggle button for collapsed state */}
			{collapsed && (
				<div className="fixed top-20 right-4 z-50 lg:block">
					<div className="bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-1">
						<ChatToggle />
					</div>
				</div>
			)}

			<LiveKitRoom
				token={token}
				serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
				className="min-h-screen"
			> 
				<div className="max-w-7xl mx-auto">
					{/* Mobile layout */}
					<div className="lg:hidden">
						{/* Video section - full width on mobile */}
						<div className="relative">
							<Video 
								hostname={user.username}
								hostIdentity={user.id}
							/>
						</div>

						{/* Chat section - bottom sheet style on mobile */}
						{!collapsed && (
							<div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 max-h-96 overflow-hidden">
								<Chat
									viewerName={name}
									hostName={user.username}
									hostIdentity={user.id}
								/>
							</div>
						)}
					</div>

					{/* Desktop layout */}
					<div className="hidden lg:block p-6">
						<div className={`grid gap-6 transition-all duration-300 ${
							collapsed 
								? 'grid-cols-1' 
								: 'grid-cols-1 xl:grid-cols-4'
						}`}>
							{/* Video section */}
							<div className={`space-y-6 ${
								collapsed 
									? 'col-span-1' 
									: 'xl:col-span-3'
							}`}>
								<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
									<Video 
										hostname={user.username}
										hostIdentity={user.id}
									/>
								</div>

								{/* Stream info section */}
								<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
									<div className="flex items-center space-x-4">
										<div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
											{user.username.charAt(0).toUpperCase()}
										</div>
										<div>
											<h2 className="text-xl font-bold text-gray-900 dark:text-white">
												{user.username}'s Stream
											</h2>
											<div className="flex items-center space-x-2 mt-1">
												<div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
												<span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
													LIVE
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Chat section */}
							{!collapsed && (
								<div className="xl:col-span-1">
									<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-8rem)] flex flex-col">
										<Chat
											viewerName={name}
											hostName={user.username}
											hostIdentity={user.id}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</LiveKitRoom>
		</div>
	)
}