"use client"
import { ConnectionState, Participant, Track } from "livekit-client"
import { useConnectionState, useParticipants, useTracks, useRemoteParticipant } from "@livekit/components-react"
import { LiveVideo } from "./live-video";


interface VideoProps{

	hostname: string, 
	hostIdentity: string,
}


export const Video = ({hostname, hostIdentity} : VideoProps) => {
	const connectionState = useConnectionState();
	const participants = useRemoteParticipant(hostIdentity);
	const tracks = useTracks([
		Track.Source.Camera, Track.Source.Microphone
	]).filter((track)=> track.participant.identity === hostIdentity);

	let content;


	if (!participants && connectionState === ConnectionState.Connected){
		content=<p>{hostname} is offline</p>
	}
	else if (!participants || tracks.length === 0){
		content=<p>Loading...</p>
	}
	else{
		content=<LiveVideo participants={participants}/>
	}

	return (
		<div className="aspect-video border-b group-relative">
			{content}
		</div>
	)
}