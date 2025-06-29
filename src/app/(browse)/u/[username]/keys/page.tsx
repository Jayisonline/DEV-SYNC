import { getSelf }from "../../../../../../lib/auth-service";
import { getStreamByUserId } from "../../../../../../lib/stream-service";
import { URLcard } from "./_components/url-card";

import { KeyCard } from "./_components/key-card";
import { ConnectModel } from "./_components/connect-model";




const keysPage = async () => {
	const self = await getSelf();
	const stream = await getStreamByUserId(self.id)


	return (

		<div className="p-6">
			<div className="flex items-center justify-between mb-4">

			
				<ConnectModel />
			</div>
			<div className="flex items-center justify-between mb-4">
				
				<h1 className="text-2xl font-bold">
					Keys & URLs
				</h1>
				
				<button>
					Generate
				</button>
			</div>

			<div className="space-y-4">
				<URLcard value={stream?.serverUrl || ""}/>
				<KeyCard value={stream?.streamKey || ""} />
			</div>
			
			
		</div>
	)


}


export default keysPage; 