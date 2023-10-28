import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CategoryPillProps = {
	categories: string[];
};

const TRANSLATE_AMOUNT = 200;

export const CategoryPills = ({ categories }: CategoryPillProps) => {
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);

	const [translate, setTranslate] = useState(0);
	const [isLeftVisible, setIsLeftVisible] = useState(false);
	const [isRightVisible, setIsRightVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current == null) return;

		const observer = new ResizeObserver((entries) => {
			const container = entries[0]?.target;
			if (container == null) return;
			// The translate is positive value,default by 0
			setIsLeftVisible(translate > 0);
			setIsRightVisible(
				// Determine when to show off left arrow icon
				translate + container.clientWidth < container.scrollWidth
			);
		});

		// Obserbing specificed element
		observer.observe(containerRef.current);
	}, [categories, translate]);
	return (
		<div className='overflow-x-hidden relative' ref={containerRef}>
			<div
				className='flex whitespace-nowrap gap-3 transition-transform w-[max-content]'
				style={{ transform: `translateX(-${translate}px)` }}
			>
				{categories.map((category) => (
					<Button
						key={category}
						variant={`${
							selectedCategory == category ? 'dark' : 'default'
						}`}
						onClick={() => setSelectedCategory(category)}
						className='py-1 px-3 rounded-lg whitespace-nowrap'
					>
						{category}
					</Button>
				))}
			</div>
			{isLeftVisible && (
				<div className='absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full'>
					<Button
						variant='ghost'
						size='icon'
						className='h-full aspect-square w-auto p-1.5'
						onClick={() => {
							setTranslate(() => {
								const newTranslate =
									translate - TRANSLATE_AMOUNT;
								if (newTranslate <= 0) return 0;
								return newTranslate;
							});
						}}
					>
						<ChevronLeft></ChevronLeft>
					</Button>
				</div>
			)}
			{isRightVisible && (
				<div className='absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end'>
					<Button
						variant='ghost'
						size='icon'
						className='h-full aspect-square w-auto p-1.5'
						onClick={() => {
							setTranslate(() => {
								if (containerRef.current == null) {
									return translate;
								}
								const newTranslate =
									translate + TRANSLATE_AMOUNT;
								const edge = containerRef.current.scrollWidth;
								const width = containerRef.current.clientWidth;

								if (newTranslate + width >= edge) {
									return edge - width;
								}
								return newTranslate;
							});
						}}
					>
						<ChevronRight></ChevronRight>
					</Button>
				</div>
			)}
		</div>
	);
};
