import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle';

export default function Header() {
	return (
		<header className='relative before:content-[""] before:absolute before:w-full before:h-[1px] before:bg-gradient-to-r before:from-primary to-background before:left-0 before:bottom-0'>
			<div className='max-w-maxi px-4 md:px-5 mx-auto h-16 flex items-center justify-between'>
				<div>
					<Link href='/' className='font-bold'>
						Wa Chat
					</Link>
				</div>
				<div>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
