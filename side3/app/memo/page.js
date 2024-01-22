import { Suspense } from 'react';
import Link from 'next/link';
import MealsGrid from '@/components/articles/articles-grid';
import { getArticles } from '@/lib/articles';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Articles() {
  console.log('getting /Fetching meals');
  const meals = await getArticles();

  return <MealsGrid meals={meals} />;
}

export default function MemoPage() {
  return (
    <>
      <header className="my-12 mx-auto w-11/12 max-w-7xl text-white text-xl">
        <p className="w-20 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <Link href="/memo/form">
              Share
          </Link>
        </p>
      </header>
      <main className="my-12 mx-auto w-11/12 max-w-7xl">
        <Suspense fallback={<p className="text-center animate-pulse">Fetching meals...</p>}>
          <Articles />
        </Suspense>
      </main>



      
    </>
  );
}
