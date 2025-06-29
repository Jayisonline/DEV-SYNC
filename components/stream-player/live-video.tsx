// "use client"

// import { Participant, Track } from "livekit-client"
// import { useRef, useState } from "react"
// import { useTracks } from "@livekit/components-react"
// import { FullScreenControl } from "./fullscreen-control"
// import { useEventListener } from "usehooks-ts";

// interface LiveVideoProps {
// 	participants: Participant, 

// }

// export const LiveVideo = ({participants} : LiveVideoProps) => {

// 	const videoRef = useRef<HTMLVideoElement>(null);
// 	const wrapperRef = useRef<HTMLDivElement>(null);

// 	const [isFullScreen, setIsFullScreen] = useState(false);

// 	const toggle = () => {
// 		if(isFullScreen){
// 			document.exitFullscreen();
// 			setIsFullScreen(false);
// 		}
// 		else if (wrapperRef?.current){
// 			wrapperRef.current.requestFullscreen();
// 			setIsFullScreen(true);
// 		}
// 	}

// 	const handleFullScreenChange = () => {
// 		const isCurrentlyFullScrren = document.fullscreenElement !== null;
// 		setIsFullScreen(isCurrentlyFullScrren);
// 	}

// 	useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef); 

// 	useTracks([Track.Source.Camera, Track.Source.Microphone])
// 	.filter((track)=> track.participant.identity === participants.identity)
// 	.forEach((track) => {
// 		if (videoRef.current){
// 			track.publication.track?.attach(videoRef.current);

// 		}
// 	})


// 	return(
// 		<div ref={wrapperRef} className="relative h-full flex">

// 			<video ref={videoRef} width="100%" />

// 			<div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">

// 				<div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
// 					<FullScreenControl isFullScreen={isFullScreen} onToggle={toggle}/>

// 				</div>

// 			</div>
// 		</div>
// 	)
// }



"use client"

import { Participant, Track } from "livekit-client"
import { useRef, useState, useEffect } from "react"
import { useTracks } from "@livekit/components-react"
import { FullScreenControl } from "./fullscreen-control"
import { useEventListener } from "usehooks-ts";

interface LiveVideoProps {
	participants: Participant, 
}

export const LiveVideo = ({participants} : LiveVideoProps) => {

	const videoRef = useRef<HTMLVideoElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [isFullScreen, setIsFullScreen] = useState(false);

	const toggle = () => {
		if(isFullScreen){
			document.exitFullscreen();
		}
		else if (wrapperRef.current){
			wrapperRef.current.requestFullscreen();
		}
	}

	const handleFullScreenChange = () => {
		const isCurrentlyFullScreen = document.fullscreenElement !== null;
		setIsFullScreen(isCurrentlyFullScreen);
	}

	// Use useEffect instead of useEventListener if there are issues
	useEffect(() => {
		const handleChange = () => {
			const isCurrentlyFullScreen = document.fullscreenElement !== null;
			setIsFullScreen(isCurrentlyFullScreen);
		};

		document.addEventListener('fullscreenchange', handleChange);
		return () => document.removeEventListener('fullscreenchange', handleChange);
	}, []);

	// Alternative: If useEventListener works, use this instead of useEffect above
	// useEventListener("fullscreenchange", handleFullScreenChange, document);

	const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]);

	useEffect(() => {
		const participantTracks = tracks.filter(
			(track) => track.participant.identity === participants.identity
		);

		participantTracks.forEach((track) => {
			if (videoRef.current && track.publication.track) {
				track.publication.track.attach(videoRef.current);
			}
		});

		// Cleanup function to detach tracks
		return () => {
			participantTracks.forEach((track) => {
				if (track.publication.track) {
					track.publication.track.detach();
				}
			});
		};
	}, [tracks, participants.identity]);

	return(
		<div ref={wrapperRef} className="relative h-full flex">
			<video ref={videoRef} width="100%" />

			<div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
				<div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
					<FullScreenControl isFullScreen={isFullScreen} onToggle={toggle}/>
				</div>
			</div>
		</div>
	)
}