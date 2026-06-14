import { NextResponse } from "next/server";

const INDEXNOW_KEY = "38e03a4b83c9405b81446e56a5d6c4b4"; // use your real key
const BASE_URL = "https://sitesafe.thesift.space";

export async function POST(request: Request) {
  const { urls } = await request.json();

  const payload = {
    host: "sitesafe.thesift.space",
    key: INDEXNOW_KEY,
    urlList: urls,
  };

  // Submit to Bing
  await fetch("https://www.bing.com/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});

  // Submit to Yandex
  await fetch("https://yandex.com/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});

  return NextResponse.json({ success: true });
}