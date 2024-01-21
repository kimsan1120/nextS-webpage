"use server";

import { redirect } from "next/navigation";
import { saveArticle } from "./articles"; // Assuming saveArticle is a function to save data to the database
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  // Helper function to validate if the data are correctly submitted
  return !text || text.trim() === "";
}

export async function shareArticle(formData) {
  if (!(formData instanceof FormData)) {
    throw new Error('Expected formData to be a FormData object');
  }

  const article = {
    title: formData.get("title"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    article: formData.get("article"),
    content: formData.get("content"),
  };

  if (
    isInvalidText(article.title) ||
    isInvalidText(article.creator) ||
    isInvalidText(article.creator_email) ||
    isInvalidText(article.article) ||
    !article.creator_email.includes("@") ||
    !article.content ||
    article.content.size === 0
  ) {
    return {
      message: "Invalid Input.",
      success: false,
    };
  }

  try {
    await saveArticle(article);
    revalidatePath('/articles'); // Adjust the path as needed
    redirect("/"); // Redirects to the main page after saving the article
    return { success: true, message: "Article saved successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
