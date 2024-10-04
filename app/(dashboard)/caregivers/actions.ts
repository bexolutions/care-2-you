'use server';

import { deleteCaregiverById } from '@/lib/caregivers';
import { revalidatePath } from 'next/cache';

export async function deleteCaregiver(formData: FormData) {
  // let id = Number(formData.get('id'));
  // await deleteProductById(id);
  // revalidatePath('/');
}
