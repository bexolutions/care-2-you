'use server';

import { deleteMerchantById } from '@/lib/merchants';
import { revalidatePath } from 'next/cache';

export async function deleteMerchant(formData: FormData) {
  // let id = Number(formData.get('id'));
  // await deleteProductById(id);
  // revalidatePath('/');
}
