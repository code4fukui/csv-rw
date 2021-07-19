import { CSVReader } from "https://code4fukui.github.io/csv-rw/CSVReader.js";

const r = new CSVReader("test.csv");
for (;;) {
  const data = await r.readRecord();
  if (data == null) {
    break;
  }
  console.log(data);
}
r.close();
