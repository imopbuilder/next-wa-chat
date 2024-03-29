import ThemesProvider from '@/client/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Aldrich, Nunito } from 'next/font/google';
import '../styles/main.scss';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });
const aldrich = Aldrich({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-aldrich',
});

export const metadata: Metadata = {
	title: 'Wa Chat - Home',
	description: 'A Next.js app in typescript used to open WhatsApp chat using phone-number',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${nunito.className} ${nunito.variable} ${aldrich.variable}`}>
				<ThemesProvider attribute='class' defaultTheme='system' enableSystem>
					{children}
					<Toaster />
				</ThemesProvider>
			</body>
		</html>
	);
}
