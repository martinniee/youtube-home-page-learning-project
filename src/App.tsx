import { CategoryPills } from './components/CategoryPills';
import VideoGridItem from './components/VideoGridItem';
import { categories, videos } from './data/home';
import PageHeader from './layouts/PageHeader';

function App() {
	return (
		<div className='max-h-screen flex flex-col '>
			<PageHeader />
			<div className='grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
				<div>Sidebar</div>
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
	);
}

export default App;
