import path from 'path';
import sql from 'better-sqlite3';
import xss from 'xss';

const dbPath = path.join(process.cwd(), 'articles.db');
const db = sql(dbPath);
console.log('Connected to database at:', dbPath);

export async function getChatlogs() {
    try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return db.prepare('SELECT * FROM chatlogs').all();
    } catch (error) {
        console.error('Error in getChatlogs:', error.message);
        throw error; // Propagate the error
    }
}

// Assuming the function getChatlog requires a chatlog ID
export function getChatlog(id) {
    return db.prepare('SELECT * FROM chatlogs WHERE id = ?').get(id);
}

export function saveChatlog(chatlog) {
    chatlog.username = xss(chatlog.username);
    chatlog.message = xss(chatlog.message);

    // Check for required fields
    if (!chatlog.username || !chatlog.timestamp || !chatlog.message) {
        throw new Error('Missing required chatlog fields');
    }

    try {
        // Insert into database
        const statement = db.prepare(
            'INSERT INTO chatlogs (username, timestamp, message) VALUES (?, ?, ?)'
        );
        statement.run(chatlog.username, chatlog.timestamp, chatlog.message);
    } catch (error) {
        console.error('Error in saveChatlog:', error.message);
        throw error; // Propagate the error
    }
}
