import fs from "fs"; // File system module
import path from "path";
import sql from "better-sqlite3";


import { convert } from "hangul-romanization";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import xss from "xss";
import stream from "stream";
import util from "util";

const dbPath = path.join(process.cwd(), "articles.db");
const db = sql(dbPath);
console.log("Connected to database at:", dbPath);
const pipeline = util.promisify(stream.pipeline);


export async function getArticles() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new Error('Loading articles failed');
    return db.prepare('SELECT * FROM articles').all();
  } catch (error) {
    console.error("Error in getArticle:", error.message);
    throw error; // Propagate the error
  }
  
}

export function getArticle(slug) {
  return db.prepare('SELECT * FROM articles WHERE slug = ?').get(slug);
}





export async function saveArticle(article) {
  article.title = xss(article.title);
  article.article = xss(article.article);

  // Check for required fields
  if (
    !article.title ||
    !article.creator ||
    !article.creator_email ||
    !article.article ||
    !article.content
  ) {
    throw new Error("Missing required article fields");
  }

  // Generate a unique slug
  const uniqueSlug = `${slugify(article.title, { lower: true, strict: true, })}-${uuidv4()}`;
  const fileType = article.content.type.split("/")[0];
  const extension = article.content.name.split(".").pop();
  const romanizedTitle = convert(article.title);

  // 로마자 제목을 사용하여 파일 이름 생성
  const fileName = `${slugify(romanizedTitle)}.${extension}`;
  // 한글 제목 입력 시 파일 이름 저장 안됨. 한글 -> 로마니안  npm install hangul-romanization

  // Define file paths
  const imageDirectory = path.join(process.cwd(), "public/images");
  const videoDirectory = path.join(process.cwd(), "public/videos");
  const filePath =
    fileType === "image"
      ? path.join(imageDirectory, fileName)
      : path.join(videoDirectory, fileName);

  // Ensure the directories exist
  await fs.promises.mkdir(imageDirectory, { recursive: true });
  await fs.promises.mkdir(videoDirectory, { recursive: true });

  // Convert File to Readable Stream and create a write stream
  const fileStream = article.content.stream();
  const outStream = fs.createWriteStream(filePath);

  try {
    // Use pipeline to handle backpressure and errors properly
    await pipeline(fileStream, outStream);

    // Update article content path for database entry
    article.content =
      fileType === "image" ? `/images/${fileName}` : `/videos/${fileName}`;

    // Insert into database
    const statement = db.prepare(
      `INSERT INTO articles (slug, title, creator, creator_email, article, content)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    statement.run(
      uniqueSlug,
      article.title,
      article.creator,
      article.creator_email,
      article.article,
      article.content
    );
  } catch (error) {
    console.error("Error in saveArticle:", error.message);
    throw error; // Propagate the error
  }
}
