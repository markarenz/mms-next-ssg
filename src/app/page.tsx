import Link from 'next/link';

export default function Home() {
  return (
    <main data-testid="page-home">
      Home
      <Link href="/test">Test</Link>
    </main>
  );
}
