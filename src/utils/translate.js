// src/utils/translate.js
import axios from "axios";

const API_KEY = "AIzaSyAy81JpE4GwzqY_IUqM2KSmIUcq0BfPlkY"; // 👈 API Key của bạn

export async function translateText(text, targetLang = "en") {
    if (!text) return "";

    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

    try {
        const response = await axios.post(url, {
            q: text,
            target: targetLang,
            format: "text",
        });

        const translatedText =
            response.data.data.translations[0].translatedText;
        return translatedText;
    } catch (error) {
        console.error("Lỗi dịch văn bản:", error.message);
        return text; // Nếu lỗi thì trả lại nguyên văn
    }
}
