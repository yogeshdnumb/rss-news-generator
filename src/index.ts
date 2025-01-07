import Parser from "rss-parser";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const parser = new Parser();

const urls = [
  ["https://news.ycombinator.com/rss", "hackerNews"],
  ["https://feeds.arstechnica.com/arstechnica/index/", "artsTechnica"],
  ["https://www.theverge.com/rss/index.xml", "theVerge"],
  ["https://www.theregister.com/headlines.atom", "theRegister"],
  ["https://finance.yahoo.com/news/rssindex", "yahooFinance"],
  [
    "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10001147",
    "cnbcBusiness",
  ],
  ["http://rss.sciam.com/basic-science", "scientificAmerican"],
  ["https://www.quantamagazine.org/feed/", "quantaMagazine"],
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
