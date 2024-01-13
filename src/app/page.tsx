import Header from '@/components/global/header';
import TelNumberForm from '@/components/pages/home/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Fragment } from 'react';

export default function page() {
	return (
		<Fragment>
			<Header />
			<main>
				<section>
					<div className='w-maxi mx-auto py-5 min-h-dvh flex items-center justify-center flex-col'>
						<div className='w-full'>
							<TelNumberForm />
						</div>
						<div className='h-full mt-auto w-full'>
							<Button className='w-full py-9 rounded-full' variant='outline' type='button' asChild>
								<Link href='/history'>History</Link>
							</Button>
						</div>
					</div>
				</section>
			</main>
		</Fragment>
	);
}
