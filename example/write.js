import { CSVWriter } from "https://code4fukui.github.io/csv-rw/CSVWriter.js";

const w = new CSVWriter("test.csv");
await w.writeRecord(["name", "value"]);
await w.writeRecord(["abc", 123]);
await w.writeRecord(["def", 456]);
w.close();
