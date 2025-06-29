import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import Home from "./(home)/page";

const BrowseLayout = ({
	children, 
}: {
	children: React.ReactNode;
}) => {

	return (

		<>
			<div>
				<Navbar />

				<div className="flex">
					<Sidebar />
				
					{children}
				</div>
				
			</div>
		</>
	);
}

export default BrowseLayout