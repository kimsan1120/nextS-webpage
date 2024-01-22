import ArticleItem from './article-item';

export default function MealsGrid({ meals }) {
  return (
    <ul className="w-11/12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-0">

      {meals.map((article) => (
        <li key={article.id}>
          <ArticleItem {...article} />
        </li>
      ))}
    </ul>
  );
}
