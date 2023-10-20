import "./styles.css";

// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript
import { AES, enc } from "crypto-js";

function generateKey(date: Date): string {
  const year = date.getUTCFullYear();
  const pad = (num: number) => (num < 10 ? `0${num}` : num);
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  return `leap-wallet-key-${year}-${month}-${day}`;
}

function generateKeys(): [string] | [string, string] {
  const utcDate = new Date();
  let yesterday = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);

  const date = yesterday;
  const todaysKey = generateKey(date);
  if (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() <= 30
  ) {
    date.setUTCDate(date.getUTCDate() - 1);
    return [todaysKey, generateKey(date)];
  }
  return [todaysKey];
}

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.
const response =
  "U2FsdGVkX18J+QhD4goEeqXWbUNwrHVguFI6VeXgh4ad7tmJVf7yDWCbukx7LyV6A0HdhrfcPU+a/5MDryTIj5UZ4fIho9J0xBhjx89urfw=";
let dcrypted;
generateKeys().map((value) => {
  const dcr = AES.decrypt(response, value).toString(enc.Utf8);
  console.log(dcr);
  dcrypted = dcr;
});

export default function App() {
  return (
    <div className="App">
      <h1>{dcrypted}</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
