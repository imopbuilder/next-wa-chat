'use client';

import { useCopy } from '@/client/hooks/use-copy.hook';
import { useContact } from '@/client/store/use-contact';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { WHATS_APP_URL } from '@/constants/wa-chat';
import { getLocalStorage, setLocalStorage } from '@/lib/utils/local-storage';
import { Copy, Phone } from 'lucide-react';
import Image from 'next/image';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

export function DeleteContactBtn({ children }: { children: ReactNode }) {
	const { contacts, deleteContacts } = useContact((state) => state);

	function handleDelete() {
		setLocalStorage('contacts', JSON.stringify([]));
		deleteContacts();
		toast.success('Contacts deleted successfully');
	}

	return (
		<Button type='button' variant='destructive' size='icon' onClick={handleDelete} disabled={contacts.length === 0}>
			{children}
		</Button>
	);
}

export function Contacts() {
	const { contacts, setContacts } = useContact((state) => state);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const localContacts = getLocalStorage('contacts', JSON.stringify([]));

		if (!localContacts) return;

		const parsedContacts: string[] = JSON.parse(localContacts);
		setContacts(parsedContacts);
		setLoading(false);
	}, [setContacts]);

	if (loading)
		return (
			<Fragment>
				{new Array({ length: 5 }).map((_, index) => (
					<div
						key={`${index}`}
						className='py-2.5 px-3.5 mb-4 last:mb-0 text-sm font-aldrich rounded-lg border flex items-center justify-between gap-3'
					>
						<Skeleton className='w-4/5 h-4 my-1' />
						<Skeleton className='w-1/5 h-4 my-1' />
					</div>
				))}
			</Fragment>
		);

	return (
		<Fragment>
			{contacts.map((contact, index) => (
				<ContactCard key={`${index}`} contact={contact} />
			))}
		</Fragment>
	);
}

function ContactCard({ contact }: { contact: string }) {
	const { handleCopy } = useCopy();

	return (
		<div className='py-2.5 px-3.5 mb-4 last:mb-0 text-sm font-aldrich rounded-lg border flex items-center justify-between'>
			<p className='relative top-0.5 sm:top-0'>+{contact}</p>
			<div className='flex items-center justify-center gap-0.5'>
				<a
					href={`${WHATS_APP_URL}/${contact}?text=Hey...`}
					className='flex items-center justify-center w-6 h-6 hover:bg-zinc-600 rounded-sm duration-300'
					target='_blank'
					rel='noreferrer'
				>
					<Image src={'/ui/whats-app-img.png'} width={20} height={20} alt='whats-app-logo' loading='lazy' unoptimized />
				</a>
				<a
					href={`tel:${contact}`}
					className='flex items-center justify-center w-6 h-6 hover:bg-zinc-600 rounded-sm duration-300'
					target='_blank'
					rel='noreferrer'
				>
					<Phone size={12} />
				</a>
				<button
					type='button'
					className='flex items-center justify-center w-6 h-6 hover:bg-zinc-600 rounded-sm duration-300'
					onClick={() => handleCopy(contact)}
				>
					<Copy size={12} />
				</button>
			</div>
		</div>
	);
}
