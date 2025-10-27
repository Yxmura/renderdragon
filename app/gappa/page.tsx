export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

import { redirect } from 'next/navigation';

export default function GappaPage() {
  redirect('/music-copyright');
}
