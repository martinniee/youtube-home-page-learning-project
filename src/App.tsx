import { CategoryPills } from './components/CategoryPills';
import VideoGridItem from './components/VideoGridItem';
import { SidebarProvider } from './contexts/SidebarContext';
import { categories, videos } from './data/home';
import PageHeader from './layouts/PageHeader';
import Sidebar from './layouts/Sidebar';

function App() {
	return (
		<SidebarProvider>
			<div className='max-h-screen flex flex-col '>
				<PageHeader />

				<div className='grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
					<Sidebar />

					<div className='overflow-x-hidden px-8 pb-4'>
						<div className='sticky top-0 bg-white z-10 pb-4'>
							<CategoryPills categories={categories} />
						</div>
						<div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
							{videos.map((video) => (
								// Trick: destrucing all the properties
								<VideoGridItem key={video.id} {...video} />
							))}
						</div>
					</div>
				</div>
			</div>
		</SidebarProvider>
	);
}

export default App;
