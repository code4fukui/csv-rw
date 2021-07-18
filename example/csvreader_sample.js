import { CSVReader } from "../CSVReader.js";

const r = new CSVReader("data_go_jp_format_mp3.csv");
const head = await r.readRecord();
let cnt = 0;
for (;;) {
  const a = await r.readRecord(head);
  console.log(a);
  if (!a) {
    break;
  }
  cnt++;
}
console.log(cnt);

