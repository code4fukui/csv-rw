import { LineReader } from "../LineReader.js";

const fn = "data_go_jp_format_mp3.csv";

//import { CSV } from "https://js.sabae.cc/CSV.js";
//console.log((await CSV.fetch(fn)).length);

//const file = await Deno.open(fn, { read: true, write: false, create: false });
//console.log(await Deno.fstat(file.rid));

const r = new LineReader(fn);
let cnt = 0;
for (;;) {
  const s = await r.readLine();
  if (s === null) {
    break;
  }
  cnt++;
  //console.log(s);
}
//19,005,440 //?
//192,061,164 // actual size
console.log(cnt, r.eof, r.fillcnt, r.readcnt);
