import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';

type SidebarProviderProps = {
	children: ReactNode;
};

type SidebarContextType = {
	isLargeOpen: boolean;
	isSmallOpen: boolean;
	toggle: () => void;
	close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
	const value = useContext(SidebarContext);
	if (value == null) throw Error('Cannot use outside of SidebarProvider');

	return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
	// 默认 lg
	// lg屏幕，切换 aside1 ,aside 2
	const [isLargeOpen, setIsLargeOpen] = useState(true);
	// sm屏幕，弹出/隐藏 aside2
	const [isSmallOpen, setIsSmallOpen] = useState(false);

	useEffect(() => {
		// 检测屏幕大小（宽度）变化，当尺寸变为 非 lg ，布局变为 smallSidebar
		const handler = () => {
			if (isScreenSmall()) setIsSmallOpen(false);

			window.addEventListener('resize', handler);
		};

		return () => {
			window.removeEventListener('resize', handler);
		};
	}, []);

	function isScreenSmall() {
		return window.innerWidth < 1024;
	}

	function toggle() {
		if (isScreenSmall()) {
			//如果是 sm ，弹出/隐藏 aside2
			setIsSmallOpen((s) => !s);
		} else {
			//如果是 lg，切换 aside1, aside2
			setIsLargeOpen((l) => !l);
		}
	}
	function close() {
		if (isScreenSmall()) {
			setIsSmallOpen(false);
		} else {
			setIsLargeOpen(false);
		}
	}
	return (
		<SidebarContext.Provider
			value={{
				isLargeOpen,
				isSmallOpen,
				toggle,
				close
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
}
