import {
	ChevronDown,
	ChevronUp,
	Clapperboard,
	Home,
	Library,
	Repeat,
	History,
	PlaySquare,
	Clock,
	ListVideo,
	Film,
	Flame,
	Gamepad2,
	Lightbulb,
	Music2,
	Newspaper,
	Podcast,
	Radio,
	Shirt,
	ShoppingBag,
	Trophy
} from 'lucide-react';
import { Children, ElementType, ReactNode, useState } from 'react';
import Button, { buttonStyles } from '../components/Button';
import { twMerge } from 'tailwind-merge';
import { playlists, subscriptions } from '../data/sidebar';

const Sidebar = () => {
	return (
		<>
			<aside className='sticky top-8 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden'>
				<SmallSidebarItem Icon={Home} title='Home' url='/' />
				<SmallSidebarItem Icon={Repeat} title='Shorts' url='/shorts' />
				<SmallSidebarItem
					Icon={Clapperboard}
					title='Subscriptions'
					url='/subscriptions'
				/>
				<SmallSidebarItem
					Icon={Library}
					title='Library'
					url='/library'
				/>
			</aside>

			<aside className='w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 flex'>
				<LargeSidebarSection title='Hi' visibleItemCount={1}>
					<LargeSidebarItem
						isActive
						IconOrImgUrl={Home}
						title='Home'
						url='/'
					></LargeSidebarItem>

					<LargeSidebarItem
						isActive
						IconOrImgUrl={Clapperboard}
						title='Subscriptions'
						url='/subscriptions'
					></LargeSidebarItem>
				</LargeSidebarSection>

				<hr />

				<LargeSidebarSection visibleItemCount={5}>
					<LargeSidebarItem
						IconOrImgUrl={Library}
						title='Library'
						url='/library'
					/>
					<LargeSidebarItem
						IconOrImgUrl={History}
						title='History'
						url='/history'
					/>
					<LargeSidebarItem
						IconOrImgUrl={PlaySquare}
						title='Your Videos'
						url='/your-videos'
					/>
					<LargeSidebarItem
						IconOrImgUrl={Clock}
						title='Watch Later'
						url='/playlist?list=WL'
					/>
					{playlists.map((playlist) => (
						<LargeSidebarItem
							key={playlist.id}
							IconOrImgUrl={ListVideo}
							title={playlist.name}
							url={`/playlist?list=${playlist.id}`}
						/>
					))}
				</LargeSidebarSection>

				<hr />

				<LargeSidebarSection title='Subscriptions'>
					{subscriptions.map((subscription) => (
						<LargeSidebarItem
							key={subscription.id}
							IconOrImgUrl={subscription.imgUrl}
							title={subscription.channelName}
							url={`/@${subscription.id}`}
						></LargeSidebarItem>
					))}
				</LargeSidebarSection>

				<hr />
				<LargeSidebarSection title='Explore'>
					<LargeSidebarItem
						IconOrImgUrl={Flame}
						title='Trending'
						url='/trending'
					/>
					<LargeSidebarItem
						IconOrImgUrl={ShoppingBag}
						title='Shopping'
						url='/shopping'
					/>
					<LargeSidebarItem
						IconOrImgUrl={Music2}
						title='Music'
						url='/music'
					/>
					<LargeSidebarItem
						IconOrImgUrl={Film}
						title='Movies & TV'
						url='/movies-tv'
					/>
					<LargeSidebarItem
						IconOrImgUrl={Radio}
						title='Live'
						url='/live'
					/>
					<LargeSidebarItem
						IconOrImgUrl={Gamepad2}
						title='Gaming'
						url='/gaming'
					/>
					<LargeSidebarItem
						IconOrImgUrl={Newspaper}
						title='News'
						url='/news'
					/>
					<LargeSidebarItem
						IconOrImgUrl={Trophy}
						title='Sports'
						url='/sports'
					/>
					<LargeSidebarItem
						IconOrImgUrl={Lightbulb}
						title='Learning'
						url='/learning'
					/>
					<LargeSidebarItem
						IconOrImgUrl={Shirt}
						title='Fashion & Beauty'
						url='/fashion-beauty'
					/>
					<LargeSidebarItem
						IconOrImgUrl={Podcast}
						title='Podcasts'
						url='/podcasts'
					/>
				</LargeSidebarSection>
			</aside>
		</>
	);
};

export default Sidebar;

type SmallSidebarItemProps = {
	Icon: ElementType;
	title: string;
	url: string;
};

const SmallSidebarItem = ({ Icon, title, url }: SmallSidebarItemProps) => {
	return (
		<a
			href={url}
			className={twMerge(
				buttonStyles({ variant: 'ghost' }),
				'py-4 px-1 flex flex-col rounded-lg  items-center gap-1'
			)}
		>
			<Icon className='w-6 h-6' />
			<div className='text-sm'>{title}</div>
		</a>
	);
};

type LargeSidebarItemProps = {
	IconOrImgUrl: ElementType | string;
	title: string;
	url: string;
	isActive?: boolean;
};

type LargeSidebarSectionProps = {
	children: ReactNode;
	title?: string;
	visibleItemCount?: number;
};

function LargeSidebarSection({
	children,
	title,
	visibleItemCount = Number.POSITIVE_INFINITY
}: LargeSidebarSectionProps) {
	// todo Children 方法是什么？
	const childrenArray = Children.toArray(children).flat();

	const [isExpanded, setIsExpanded] = useState(false);

	const showExpandButton = childrenArray.length > visibleItemCount;

	const visibleChildren = isExpanded
		? childrenArray
		: childrenArray.slice(0, visibleItemCount);

	const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

	return (
		<div>
			{title && <div className='ml-4 mt-2 text-lg mb-1'>{title}</div>}
			{visibleChildren}

			{showExpandButton && (
				<Button
					onClick={() => setIsExpanded((e) => !e)}
					variant='ghost'
					className='w-full flex items-center rounded-lg gap-4 p-3'
				>
					<ButtonIcon className='w-6 h-6'>
						<div>{isExpanded ? 'show less' : 'show more'}</div>
					</ButtonIcon>
				</Button>
			)}
		</div>
	);
}

function LargeSidebarItem({
	IconOrImgUrl,
	title,
	url,
	isActive = false
}: LargeSidebarItemProps) {
	return (
		<a
			href={url}
			className={twMerge(
				buttonStyles({ variant: 'ghost' }),
				`w-full flex items-center rounded-lg gap-4 p-3 ${
					isActive
						? 'font-bold bg-neutral-100 hover:bg-secondary'
						: undefined
				}`
			)}
		>
			{typeof IconOrImgUrl === 'string' ? (
				<img
					src={IconOrImgUrl}
					className='w-6 h-6 rounded-full '
					alt=''
				/>
			) : (
				<IconOrImgUrl className='w-6 h-6' />
			)}
			<div className=' whitespace-nowrap overflow-hidden text-ellipsis'>
				{title}
			</div>
		</a>
	);
}