import { notFound } from "next/navigation";
import { StreamPlayer } from "../../../../components/stream-player";
import { getUserByUsername } from "../../../../lib/user-service";



interface UserPageProps {

	params: {
		username: string, 
	},
}

const UserPage = async ({params}: UserPageProps) => {
	const user = await getUserByUsername(params.username);

	if (!user || !user.stream){
		notFound();
	}

	
	return (

		<div>

			<StreamPlayer 
				user={user}
			/>
		</div>

	)
}


export default UserPage;