# csv-rw

CSV File line-by-line read/write library for [Deno](https://deno.land/).

## Features
- Provides `CSVReader` and `CSVWriter` classes for reading and writing CSV files
- Supports parsing CSV files with quoted fields and line breaks
- Allows reading CSV data into JavaScript objects with column names

## Usage

### Reading a CSV file
```js
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
```

### Writing a CSV file
```js
import { CSVWriter } from "https://code4fukui.github.io/csv-rw/CSVWriter.js";

const w = new CSVWriter("test.csv");
await w.writeRecord(["name", "value"]);
await w.writeRecord(["abc", 123]);
await w.writeRecord(["def", 456]);
w.close();
```

## Testing
```bash
cd test
deno test -A
```

## License
MIT License