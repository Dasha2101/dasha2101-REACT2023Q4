import { permanentRedirect } from 'next/navigation';

export default function Home() {
  permanentRedirect('/search');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to My Next.js App!</h1>
    </main>
  );
}
