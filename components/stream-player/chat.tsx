// "use client"

// import { useChat, useConnectionState, useParticipants, useRemoteParticipant } from "@livekit/components-react";
// import { ChatVariant, useChatSidebar } from "../../store/use-chat-sidebar";
// import { ConnectionState } from "livekit-client";
// import { useState , useEffect, useMemo} from "react";
// import { ChatHeader } from "./chat-header";

// // Custom hook inline
// const useMediaQuery = (query: string) => {
//   const [matches, setMatches] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia(query);
//     setMatches(mediaQuery.matches);

//     const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
//     mediaQuery.addEventListener('change', handler);
    
//     return () => mediaQuery.removeEventListener('change', handler);
//   }, [query]);

//   return matches;
// };

// interface ChatProps {
// 	hostName: string, 
// 	hostIdentity: string, 
// 	viewerName: string, 
// 	// isFollowing: boolean, 
// 	// isChatEnabled: boolean, 
// 	// isChatDelayed: boolean, 
// 	// isChatFollowersOnly: boolean,
// }

// export const Chat = ({
// 	hostName, 
// 	hostIdentity, 
// 	viewerName, 
// 	// isFollowing, 
// 	// isChatEnabled, 
// 	// isChatDelayed, 
// 	// isChatFollowersOnly

// }: ChatProps) => {

// 	const matches = useMediaQuery("(max-width: 1024px)");
// 	const {variant, onExpand} = useChatSidebar((state) => state);
// 	const connectionState = useConnectionState();

// 	const participant = useRemoteParticipant(hostIdentity);

// 	const isOnline = participant && connectionState === ConnectionState.Connected;

// 	// Note: isChatEnabled is commented out in props, so this will cause an error
// 	// const isHidden = !isChatEnabled || !isOnline;

// 	const [value, setValue] = useState("");

// 	const {chatMessages: messages, send} = useChat();

// 	useEffect(() => {
// 		if(matches){
// 			onExpand();
// 		}
// 	}, [matches, onExpand]);

// 	const reversedMessages = useMemo(() => {
// 		return messages.sort((a, b) => b.timestamp - a.timestamp);
// 	}, [messages]);

// 	const onSubmit = () => {
// 		if (!send) return;

// 		send(value);
// 		setValue("");
// 	}

// 	const onChange = (value: string) => {
// 		setValue(value);
// 	}

// 	return (
// 		<div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
// 			<ChatHeader />

// 			{variant === ChatVariant.CHAT && (
// 				<>
// 					<p>Chat Mode</p>
// 				</>
// 			)}

// 			{variant === ChatVariant.COMMUNITY && (
// 				<>
// 					<p>Community</p>
// 				</>
// 			)}
// 		</div>
// 	)
// }





"use client"

import { useChat, useConnectionState, useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { ChatVariant, useChatSidebar } from "../../store/use-chat-sidebar";
import { ConnectionState } from "livekit-client";
import { useState , useEffect, useMemo, useRef} from "react";
import { ChatHeader } from "./chat-header";

// Custom hook inline
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

interface ChatProps {
	hostName: string, 
	hostIdentity: string, 
	viewerName: string, 
	// isFollowing: boolean, 
	// isChatEnabled: boolean, 
	// isChatDelayed: boolean, 
	// isChatFollowersOnly: boolean,
}

// Mock data for demonstration - replace with actual data
const mockChatMessages = [
  { id: '1', username: 'ViewerOne', message: 'Great stream! 🔥', timestamp: Date.now() - 10000, isModerator: false },
  { id: '2', username: 'ModUser', message: 'Welcome everyone!', timestamp: Date.now() - 8000, isModerator: true },
  { id: '3', username: 'GamerPro', message: 'That was an amazing play!', timestamp: Date.now() - 6000, isModerator: false },
  { id: '4', username: 'StreamFan', message: 'Can you show that trick again?', timestamp: Date.now() - 4000, isModerator: false },
  { id: '5', username: 'TechGuru', message: 'Your setup looks awesome', timestamp: Date.now() - 2000, isModerator: false },
];

const mockCommunityMessages = [
  { id: '1', username: 'TopFollower', action: 'followed', timestamp: Date.now() - 15000 },
  { id: '2', username: 'BigDonator', action: 'donated $5.00', timestamp: Date.now() - 10000 },
  { id: '3', username: 'NewViewer', action: 'subscribed', timestamp: Date.now() - 5000 },
];

export const Chat = ({
	hostName, 
	hostIdentity, 
	viewerName, 
}: ChatProps) => {

	const matches = useMediaQuery("(max-width: 1024px)");
	const {variant, onExpand} = useChatSidebar((state) => state);
	const connectionState = useConnectionState();
	const chatScrollRef = useRef<HTMLDivElement>(null);

	const participant = useRemoteParticipant(hostIdentity);

	const isOnline = participant && connectionState === ConnectionState.Connected;

	const [value, setValue] = useState("");
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

	const {chatMessages: messages, send} = useChat();

	useEffect(() => {
		if(matches){
			onExpand();
		}
	}, [matches, onExpand]);

	// Auto scroll to bottom when new messages arrive
	useEffect(() => {
		if (chatScrollRef.current) {
			chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
		}
	}, [messages]);

	const reversedMessages = useMemo(() => {
		return messages.sort((a, b) => b.timestamp - a.timestamp);
	}, [messages]);

	const onSubmit = (e?: React.FormEvent) => {
		e?.preventDefault();
		if (!send || !value.trim()) return;

		send(value);
		setValue("");
	}

	const onChange = (newValue: string) => {
		setValue(newValue);
	}

	const formatTime = (timestamp: number) => {
		return new Date(timestamp).toLocaleTimeString('en-US', { 
			hour12: false, 
			hour: '2-digit', 
			minute: '2-digit' 
		});
	};

	const getRandomColor = (username: string) => {
		const colors = [
			'#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
			'#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
		];
		let hash = 0;
		for (let i = 0; i < username.length; i++) {
			hash = username.charCodeAt(i) + ((hash << 5) - hash);
		}
		return colors[Math.abs(hash) % colors.length];
	};

	return (
		<div className="flex flex-col h-full bg-gray-900 text-white border-l border-gray-700">
			<ChatHeader />

			{variant === ChatVariant.CHAT && (
				<>
					{/* Chat Messages Area */}
					<div 
						ref={chatScrollRef}
						className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
					>
						{/* Connection Status */}
						{!isOnline && (
							<div className="text-center py-4 text-gray-400 text-sm">
								<div className="bg-gray-800 rounded-lg p-3">
									<div className="animate-pulse flex items-center justify-center space-x-2">
										<div className="h-2 w-2 bg-gray-600 rounded-full"></div>
										<span>Connecting to chat...</span>
									</div>
								</div>
							</div>
						)}

						{/* Welcome Message */}
						<div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-3 mb-2">
							<p className="text-sm text-purple-200">
								Welcome to {hostName}'s chat! Be respectful and have fun! 🎮
							</p>
						</div>

						

						{/* No messages state */}
						{messages.length === 0 && isOnline && (
							<div className="text-center py-8 text-gray-500">
								<div className="text-4xl mb-2">💬</div>
								<p className="text-sm">No messages yet. Be the first to say hello!</p>
							</div>
						)}
					</div>

					{/* Chat Input */}
					<div className="border-t border-gray-700 p-3">
						<form onSubmit={onSubmit} className="space-y-2">
							<div className="flex items-center space-x-2">
								<div className="flex-1 relative">
									<input
										type="text"
										value={value}
										onChange={(e) => onChange(e.target.value)}
										placeholder={isOnline ? `Say something in ${hostName}'s chat...` : "Chat is offline"}
										disabled={!isOnline}
										className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
										maxLength={500}
									/>
									<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
										<button
											type="button"
											onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
											className="text-gray-400 hover:text-gray-200 transition-colors"
											disabled={!isOnline}
										>
											😊
										</button>
									</div>
								</div>
								<button
									type="submit"
									disabled={!isOnline || !value.trim()}
									className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
								>
									Send
								</button>
							</div>
							<div className="flex items-center justify-between text-xs text-gray-400">
								<span>Connected as {viewerName}</span>
								<span>{value.length}/500</span>
							</div>
						</form>
					</div>
				</>
			)}

			{variant === ChatVariant.COMMUNITY && (
				<>
					{/* Community Events */}
					<div className="flex-1 overflow-y-auto p-2 space-y-2">
						<div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-3 mb-2">
							<p className="text-sm text-blue-200">
								Community activity for {hostName}'s stream
							</p>
						</div>

						{mockCommunityMessages.map((event) => (
							<div key={event.id} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
										{event.username.charAt(0).toUpperCase()}
									</div>
									<div>
										<p className="text-sm">
											<span className="font-medium text-purple-300">{event.username}</span>
											<span className="text-gray-300 ml-1">{event.action}</span>
										</p>
										<p className="text-xs text-gray-400">
											{formatTime(event.timestamp)}
										</p>
									</div>
								</div>
							</div>
						))}

						{/* Recent Followers */}
						<div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
							<h4 className="text-sm font-medium text-gray-200 mb-2">Recent Followers</h4>
							<div className="space-y-1">
								{['StreamLover', 'GamingFan99', 'TechEnthusiast'].map((follower, index) => (
									<div key={index} className="flex items-center space-x-2 text-sm">
										<div className="w-4 h-4 bg-green-500 rounded-full"></div>
										<span className="text-gray-300">{follower}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}