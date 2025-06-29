import { currentUser } from "@clerk/nextjs/server";
import { getUserByUsername } from "../../../../../lib/user-service";
import { StreamPlayer } from "../../../../../components/stream-player";

interface CreatorPageProps {
	params: {
		username: string;
	};
};

const CreatorPage = async ({params, } : CreatorPageProps) =>{

	const externalUser = await currentUser();

	const user = await getUserByUsername(params.username);

	console.log(user);

	if (!user || user.externalUserId !== externalUser?.id){
		throw new Error("unauthorized")
	}


	

return (
	<div className="h-full ">
		<StreamPlayer user={user} 
		// stream={user.stream} 
		/>
		
		
	</div>
)

}


export default CreatorPage;