import Link from "next/link";
// npx @next/codemod new-link .
//npx @next/codemod next-image-to-legacy-image .

import Image from "next/legacy/image"; // Did you forget to run the codemod?

export default function ArticleItem({ title, slug, content, article, creator }) {
  return (
    <article className="w-80 h-90 bg-white rounded-lg border p-4">
      <div className="border-2 border-gray-500/100 relative w-full h-48 overflow-hidden rounded-md">
        <Image
          src={content} // Replace with your image source
          alt={title}
          objectFit="cover"
          objectPosition="center"
          layout="fill"
        />
      </div>
      <div className="px-1 py-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{creator}</p>
        <p className="overflow-hidden truncate">{article}</p>
      </div>
      <div className="px-1 py-4">
        <Link href={`/memo/${slug}`} className="text-blue-500 hover:underline">
          <button className="">View Details</button>
        </Link>
      </div>
    </article>
  );
}




