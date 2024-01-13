import { create } from 'zustand';

interface Contacts {
	contacts: string[];
}

interface Action {
	deleteContacts: () => void;
	setContacts: (contacts: Contacts['contacts']) => void;
}

export const useContact = create<Contacts & Action>((set) => ({
	contacts: [],
	deleteContacts: () => set(() => ({ contacts: [] })),
	setContacts: (contacts) => set(() => ({ contacts })),
}));
