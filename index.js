const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs").promises;
const path = require("path");
require('dotenv').config()

const bot = new TelegramBot(process.env.TOKEN, { polling: true });
const chatId = process.env.TELEGRAMCHATID;
const folderPath = FILEPATH;

async function uploadVideosFromFolder() {
  try {
    const files = await fs.readdir(folderPath);

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      console.log(file);
      const videoPath = path.join(folderPath, file);
      console.log(videoPath);

      try {
        console.log('Uploading...');

        const stats = await fs.stat(videoPath);
        const fileSizeInBytes = stats.size;
        const fileSizeInMegabytes = Math.floor(fileSizeInBytes / (1024 * 1024));
        console.log(fileSizeInMegabytes+'MB')
        await bot.sendDocument(chatId, videoPath, { caption: file });
        console.log('Document sent:', file);
      } catch (error) {
        console.error('Error while uploading file', file, error.message);
      }
    }
  } catch (error) {
    console.error('Error reading folder:', error.message);
  }
}

uploadVideosFromFolder();
