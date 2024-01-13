'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { DAIL_CODES } from '@/constants/dail-codes';
import { WHATS_APP_URL } from '@/constants/wa-chat';
import { cn } from '@/lib/utils/cn';
import { getLocalStorage, setLocalStorage } from '@/lib/utils/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { ArrowUpRightFromCircle } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
	country: z.string({ required_error: 'Country Required' }),
	tel: z.coerce.number({ required_error: 'Telphone number required!', invalid_type_error: 'Telphone number required!' }),
	message: z.string().optional(),
});

export default function TelNumberForm() {
	const waRef = useRef<HTMLAnchorElement>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			country: DAIL_CODES.find((dailCode) => dailCode.code.toLowerCase() === '91')?.code,
			message: 'Hey...',
		},
	});

	function handleSubmit(data: z.infer<typeof formSchema>) {
		// Update local-storage with the tel-number
		const phone = `${data.country}${data.tel}`;
		const contacts: string[] = JSON.parse(getLocalStorage('contacts', JSON.stringify([])) as string);
		!contacts.includes(phone) && setLocalStorage('contacts', JSON.stringify([...contacts, phone]));

		waRef.current!.href = `${WHATS_APP_URL}/${phone}?text=${data.message}`;
		waRef.current!.click();
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
					<FormField
						control={form.control}
						name='country'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												role='combobox'
												variant='outline'
												className={cn('w-full h-10 justify-between border', !field.value && 'text-muted-foreground')}
											>
												{field.value ? (
													<span className='font-medium relative top-[1px]'>
														<span className='mr-3 font-aldrich'>+{DAIL_CODES.find((dailCode) => dailCode.code === field.value)?.code}</span>
														{DAIL_CODES.find((dailCode) => dailCode.code === field.value)?.country}
													</span>
												) : (
													'Select country'
												)}
												<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0 rounded-md' sideOffset={8}>
										<Command className='rounded-xl'>
											<CommandInput placeholder='Search country...' className='h-9 my-2 mx-1' />
											<CommandEmpty>No country found.</CommandEmpty>
											<CommandGroup className='overflow-y-scroll w-full h-64 p-2'>
												{DAIL_CODES.map((dailCode) => (
													<CommandItem
														key={dailCode.country}
														className='p-2.5 rounded-lg'
														value={`${dailCode.code}_${dailCode.country}`}
														onSelect={() => form.setValue('country', dailCode.code)}
													>
														<p className='flex items-center justify-start gap-3'>
															<span className='font-aldrich'>+{dailCode.code}</span>
															<span>{dailCode.country}</span>
														</p>
														<CheckIcon className={cn('ml-auto h-4 w-4', dailCode.code === field.value ? 'opacity-100' : 'opacity-0')} />
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='tel'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className='font-aldrich pt-2.5 sm:py-2 placeholder:font-nunito shadow-none'
										placeholder='Tel number'
										type='number'
										inputMode='numeric'
										autoComplete='off'
										{...field}
										value={field.value ?? ''}
										onChange={(e) => {
											if (e.target.value === '') return field.onChange(undefined);
											field.onChange(Number(e.target.value));
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='message'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea placeholder='Type your message here' className='resize-none' {...field} />
								</FormControl>
								<FormDescription>Optional</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='w-full font-bold gap-2.5' type='submit' size='lg'>
						<ArrowUpRightFromCircle size={18} />
						<span>Open chat</span>
					</Button>
				</form>
			</Form>
			<a ref={waRef} className='hidden' href={WHATS_APP_URL} data-tag='wa-chat-link' target='_blank' rel='noreferrer'>
				{' '}
			</a>
		</>
	);
}
