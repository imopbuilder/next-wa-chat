import Footer from '@/components/global/footer';
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
					<div className='w-maxi mx-auto py-12 min-h-dvh flex items-start justify-center'>
						<div className='w-full max-w-2xl'>
							<TelNumberForm />
							<Button className='w-full mt-5 font-semibold' variant='outline' size='lg' type='button' asChild>
								<Link href='/history'>History</Link>
							</Button>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
}
