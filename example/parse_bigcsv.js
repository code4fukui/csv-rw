import { CSV } from "https://js.sabae.cc/CSV.js";
import { CSVReader } from "../CSVReader.js";

const fn = "data_go_jp_format_mp3.csv";

const r = new CSVReader(fn);
let cnt = 0;
const t0 = performance.now();
for (;;) {
  const data = await r.readRecord();
  if (!data) {
    break;
  }
  cnt++;
  //console.log(s);
}
console.log(performance.now() - t0); // 2.733sec 348244data, 190Mbyte
console.log(cnt);
console.log((await CSV.fetch(fn)).length);
