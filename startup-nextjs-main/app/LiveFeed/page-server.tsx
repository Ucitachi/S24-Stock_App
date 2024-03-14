'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate(stock) {
  redirect(`/Buy?stock=${stock}`)
}