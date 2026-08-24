import { mkdir, writeFile } from "node:fs/promises";

const pretendToBeBrowser = true;
const urlCacheBuster = true;

const path = process.argv[2];
const url = process.argv[3];
const seconds = parseInt(process.argv[4]) || 3;
let lastContent = "";

async function main() {
  await mkdir(path, { recursive: true });
  await fetchPeriodically();
}

async function fetchPeriodically() {
  const file = `${path}/${dateString()}`;
  try {
    const finalUrl = urlCacheBuster ? cacheBuster(url) : url;

    console.log(`Fetching: ${finalUrl}`);

    const fetchOptions = pretendToBeBrowser ? browserFetchOptions : {};

    const res = await fetch(finalUrl, fetchOptions);

    const content = await res.text();
    if (content != lastContent) {
      lastContent = content;
      await writeFile(file, content);
      console.log(`\n\n${file}\n\n`);
      console.log(content);
      console.log("----------------------------------------------------------");
    }
  } catch (e) {
    console.error(e.message);
    await writeFile(file + ".error", e.message);
  }
  await sleep(seconds * 1000);
  await fetchPeriodically();
}

const cacheBuster = (url: string) => {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}_cb=${Date.now()}`;
};

const browserFetchOptions = {
  credentials: "omit",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64; rv:146.0) Gecko/20100101 Firefox/146.0",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en,en-US;q=0.7,fr;q=0.3",
    "Sec-GPC": "1",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    Priority: "u=0, i",
  },
  method: "GET",
  mode: "cors",
};

const dateString = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

main();
