import { Suspense } from "react";
import Link from "next/link";
import ArticlesGrid from "@/components/articles/articles-grid";
import { getArticles } from "@/lib/articles";

export const metadata = {
  title: "All Articles",
  description: "Browse the articles in our community.",
};

async function Articles() {
  console.log("getting /Fetching articles");
  const meals = await getArticles();

  return <ArticlesGrid meals={meals} />;
}

export default function MemoPage() {
  return (
    <div className="bg-blue-300 ">
      <main className="my-auto mx-auto w-11/12 max-w-7xl">
        <p className="w-40 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <Link href="/memo/form">Add Article</Link>
        </p>
        <Suspense
          fallback={
            <p className="text-center animate-pulse">Fetching articles...</p>
          }
        >
          <Articles />
        </Suspense>
      </main>
    </div>
  );
}
