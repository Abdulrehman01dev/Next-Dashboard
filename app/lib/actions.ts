'use server';
import { z } from 'zod';
import { Invoice } from './models/Invoice';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  _id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ _id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
      const amountInCents = amount * 100;
      const date = new Date().toISOString().split('T')[0];
      const newInvoice = new Invoice({
        customer_id: customerId, amount: amountInCents, status, date
      });
      console.log("🚀 ~ createInvoice ~ newInvoice:", newInvoice)
      newInvoice.save();
      revalidatePath('/dashboard/invoices');
      redirect('/dashboard/invoices');
}
