import Header from '@/components/global/header';
import { Contacts, DeleteContactBtn } from '@/components/pages/history/client';
import { Trash2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Wa Chat - History',
};

export default function page() {
	return (
		<>
			<Header />
			<main>
				<section>
					<div className='max-w-2xl mx-auto py-5'>
						<div className='flex items-center justify-between mb-3 border-b pb-3'>
							<h2 className='text-2xl font-bold'>History</h2>
							<DeleteContactBtn>
								<Trash2 size={18} className='scale-100 hover:scale-110 duration-200' />
							</DeleteContactBtn>
						</div>
						<div>
							<Contacts />
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
