'use server';

import { deleteCustomerById } from '@/lib/customers';
import { revalidatePath } from 'next/cache';

export async function deleteCustomer(formData: FormData) {
  // let id = Number(formData.get('id'));
  // await deleteProductById(id);
  // revalidatePath('/');
}
