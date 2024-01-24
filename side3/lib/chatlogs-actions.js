"use server";

import { saveChatlog } from "./save-chatlogs"; // Assuming saveChatlog is a function to save data to the database

function isInvalidText(text) {
  // Helper function to validate if the data are correctly submitted
  return !text || text.trim() === "";
}

export async function shareChatlog(formData) {
  if (!(formData instanceof FormData)) {
    throw new Error('Expected formData to be a FormData object');
  }

  const chatlog = {
    username: formData.get("username"),
    timestamp: new Date().toISOString(), // Assuming the current timestamp is needed
    message: formData.get("message"), // Corrected field name
  };

  if (
    isInvalidText(chatlog.username) ||
    isInvalidText(chatlog.timestamp) ||
    isInvalidText(chatlog.message)
  ) {
    return {
      message: "Invalid Input.",
      success: false,
    };
  }

  try {
    await saveChatlog(chatlog);
    return { success: true, message: "Chatlog saved successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
