'use client';

import { Whatsapp } from '@/components/custom/svg/whatsapp';
import { Button } from '@/components/ui/button';
import { WHATS_APP_URL } from '@/constants/wa-chat';
import { getLocalStorage, setLocalStorage } from '@/lib/utils/local-storage';
import { Phone } from 'lucide-react';
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
	return (
		<div className='py-2.5 px-3.5 mb-4 last:mb-0 bg-muted text-sm font-aldrich rounded-lg border flex items-center justify-between'>
			<p>+{contact}</p>
			<div className='flex items-center justify-center gap-5'>
				<a href={`${WHATS_APP_URL}/${contact}?text=Hey...`} className='hover:scale-105 duration-200' target='_blank' rel='noreferrer'>
					<Whatsapp />
				</a>
				<a href={`tel:${contact}`} className='hover:scale-105 duration-200' target='_blank' rel='noreferrer'>
					<Phone size={18} className='stroke-foreground' />
				</a>
			</div>
		</div>
	);
}
