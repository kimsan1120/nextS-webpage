const sql = require("better-sqlite3");
const db = sql("articles.db");
// npm install better-sqlite3
// node initdb.js

// sqlite3 dbname.db
// 명령어 모음 : https://bskyvision.com/entry/sqlite3-%EA%B8%B0%EB%B3%B8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%B0%8F-create-read-update-delete-%ED%95%98%EB%8A%94-%EB%B2%95-%EC%A0%95%EB%A6%AC

db.prepare(
  // articles
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
db.prepare(
  // table chatlogs
  `CREATE TABLE IF NOT EXISTS chatlogs (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       username TEXT NOT NULL,
       timestamp TEXT NOT NULL,
       message TEXT NOT NULL
    )`
).run();

const dummyArticles = [
  { slug: "test-article 1", title: "Test Article 1", creator: "John Doe 1", creator_email: "john1@example.com", article: "This is a test article 1.", content: "/images/notebook-clone.png" },
  { slug: "test-article 2", title: "Test Article 2", creator: "John Doe 2", creator_email: "john2@example.com", article: "This is a test article 2.", content: "/images/text2.png" },
];

const dummyChatLogs = [
  { username: "User1", timestamp: "2021-01-01 10:00:00", message: "Hello, how are you?" },
  { username: "Admin", timestamp: "2021-01-01 10:01:00", message: "I am fine, thank you!" },
  // Add more dummy chat logs as needed
];

function initData() {
  const stmt = db.prepare(`
      INSERT INTO articles (slug, title, creator, creator_email, article, content)
      VALUES (@slug, @title, @creator, @creator_email, @article, @content)
   `);

  for (const article of dummyArticles) {
    stmt.run(article);
  }

  const chatLogStmt = db.prepare(`
      INSERT INTO chatlogs (username, timestamp, message)
      VALUES (@username, @timestamp, @message)
   `);

  for (const log of dummyChatLogs) {
    chatLogStmt.run(log);
  }




}

function main() {
  initData();
  console.log('Articles:', db.prepare("SELECT * FROM articles").all());
  console.log('Chat Logs:', db.prepare("SELECT * FROM chatlogs").all());

}

try {
  main();
} catch (error) {
  console.error("Error initializing the database:", error);
}
