


interface UserAvatarProps {
	username: string;
	imageUrl: string;
	isLive? : boolean;
	showBadge: boolean;

};


export const UserAvatar = ({
	username, 
	imageUrl, 
	isLive, 
	showBadge
}: UserAvatarProps) =>{

	return (
		<div>
			{username}
		</div>
	)


}


export default UserAvatar;