const sql = require("better-sqlite3");
const db = sql("articles.db");
// npm install better-sqlite3
// node initdb.js


// sqlite3 dbname.db
// 명령어 모음 : https://bskyvision.com/entry/sqlite3-%EA%B8%B0%EB%B3%B8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%B0%8F-create-read-update-delete-%ED%95%98%EB%8A%94-%EB%B2%95-%EC%A0%95%EB%A6%AC




db.prepare(
  `CREATE TABLE IF NOT EXISTS articles (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL,
       article TEXT NOT NULL,
       content TEXT NOT NULL
    )`
).run();

const dummyArticles = [
  { slug: 'test-article 1', title: 'Test Article 1', creator: 'John Doe 1', creator_email: 'john1@example.com', article: 'This is a test article 1.', content: '/images/test1-title.png' },
  { slug: 'test-article 2', title: 'Test Article 2', creator: 'John Doe 2', creator_email: 'john2@example.com', article: 'This is a test article 2.', content: '/images/text2.png' },
];

function initData() {
  const stmt = db.prepare(`
      INSERT INTO articles (slug, title, creator, creator_email, article, content)
      VALUES (@slug, @title, @creator, @creator_email, @article, @content)
   `);

  for (const article of dummyArticles) {
    stmt.run(article);
  }
}

function main() {
  initData();
  console.log(db.prepare("SELECT * FROM articles").all());
}

try {
  main();
} catch (error) {
  console.error("Error initializing the database:", error);
}
