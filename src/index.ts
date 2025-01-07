import Parser from "rss-parser";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const parser = new Parser();

const urls = [
  ["https://news.ycombinator.com/rss", "Hacker-News"],
  ["https://feeds.arstechnica.com/arstechnica/index/", "Arts-Technica"],
  ["https://www.theverge.com/rss/index.xml", "the-Verge"],
  ["https://www.theregister.com/headlines.atom", "The-Register"],
  ["https://finance.yahoo.com/news/rssindex", "Yahoo-Finance"],
  [
    "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10001147",
    "CNBC-Business",
  ],
  ["http://rss.sciam.com/basic-science", "Scientific-American"],
  ["https://www.quantamagazine.org/feed/", "Quanta-Magazine"],
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
