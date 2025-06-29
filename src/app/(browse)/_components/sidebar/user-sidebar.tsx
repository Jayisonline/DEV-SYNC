'use client'

import { Wrapper } from "./wrapper"
import { Toggle } from "./toggle"


const userSidebar = () => {

	return (
		<Wrapper>
							<Toggle />
								<div>Keys</div>
								<div>links</div>
								<div>dashboard</div>
		</Wrapper>
	)
}


export default userSidebar