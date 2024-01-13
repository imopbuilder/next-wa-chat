'use client';

import { useCopy } from '@/client/hooks/use-copy.hook';
import { Button } from '@/components/ui/button';
import { WHATS_APP_URL } from '@/constants/wa-chat';
import { getLocalStorage, setLocalStorage } from '@/lib/utils/local-storage';
import { ArrowUpRightFromCircle, Copy, Phone } from 'lucide-react';
import { Fragment, ReactNode, useEffect, useState } from 'react';

export function DeleteContactBtn({ children }: { children: ReactNode }) {
	return (
		<Button type='button' variant='destructive' size='icon' onClick={() => setLocalStorage('contacts', JSON.stringify([]))}>
			{children}
		</Button>
	);
}

export function Contacts() {
	const [contacts, setContacts] = useState<string[]>([]);

	useEffect(() => {
		const localContacts = getLocalStorage('contacts', JSON.stringify([]));

		if (!localContacts) return;

		const parsedContacts: string[] = JSON.parse(localContacts);
		setContacts(parsedContacts);
	}, []);

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
		<div className='py-2.5 px-3.5 mb-4 last:mb-0 bg-muted text-sm font-aldrich rounded-lg border flex items-center justify-between'>
			<p className='relative top-0.5 sm:top-0'>+{contact}</p>
			<div className='flex items-center justify-center gap-2'>
				<a
					href={`${WHATS_APP_URL}/${contact}?text=Hey...`}
					className='flex items-center justify-center w-6 h-6 hover:bg-zinc-600 rounded-sm duration-300'
					target='_blank'
					rel='noreferrer'
				>
					<ArrowUpRightFromCircle size={12} />
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
