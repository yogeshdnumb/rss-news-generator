import Parser from "rss-parser";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const parser = new Parser();

const urls = [
  ["https://news.ycombinator.com/rss", "hackerNews"],
  ["https://feeds.arstechnica.com/arstechnica/index/", "ArtsTechnica"],
];

async function rssToJson(url: string) {
  const data = await parser.parseURL(url);
  return data;
}

async function writeToFile(filename: string, content: string) {
  await writeFile(
    path.join(__dirname + "/../feeds" + `/${filename}.json`),
    content
  );
}

urls.forEach(async (data) => {
  const url = data[0];
  const filename = data[1];
  const content = await rssToJson(url);

  await writeToFile(filename, JSON.stringify(content));
});
