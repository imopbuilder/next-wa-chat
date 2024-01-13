import Footer from '@/components/global/footer';
import Header from '@/components/global/header';
import TelNumberForm from '@/components/pages/home/client';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

export default function page() {
	return (
		<Fragment>
			<Header />
			<main>
				<section>
					<div className='max-w-maxi mx-auto py-10 px-4 md:px-5 min-h-dvh flex items-start justify-center'>
						<div className='w-full max-w-2xl'>
							<div className='pb-6'>
								<h2 className='text-2xl font-bold'>Start chating</h2>
								<p className='text-sm text-muted-foreground pt-1.5'>
									Chat with anyone in <strong>WhatsApp</strong> without saving number.
								</p>
							</div>
							<TelNumberForm />
							<Button className='w-full mt-5 font-bold' variant='outline' size='lg' type='button' asChild>
								<Link href='/history'>
									<History size={18} className='mr-2.5' />
									History
								</Link>
							</Button>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
}
