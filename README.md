# csv-rw

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A line-by-line CSV reading and writing library for [Deno](https://deno.land/).

## Features

- Provides `CSVReader` and `CSVWriter` classes for efficient, line-by-line processing of large files.
- Correctly handles quoted fields, including those containing commas and line breaks.
- Can map CSV rows to JavaScript objects using a header row.
- Supports custom text decoders for files with non-UTF8 encodings (e.g., Shift-JIS).
- Automatically adds a UTF-8 BOM when writing new files.

## Usage

### Reading a CSV File

#### Reading rows as arrays

```js
import { CSVReader } from "https://code4fukui.github.io/csv-rw/CSVReader.js";

const r = new CSVReader("test.csv");
for (let row; (row = await r.readRecord()) !== null;) {
  console.log(row); // e.g., ["name", "value"]
}
r.close();
```

#### Reading rows as objects

Pass the header array to `readRecord()` to get objects instead of arrays.

```js
import { CSVReader } from "https://code4fukui.github.io/csv-rw/CSVReader.js";

const r = new CSVReader("test.csv");
const header = await r.readRecord(); // Read the first line as the header

if (header) {
  for (let record; (record = await r.readRecord(header)) !== null;) {
    console.log(record); // e.g., { name: "abc", value: "123" }
  }
}
r.close();
```

### Writing a CSV File

The writer automatically handles quoting for fields containing commas, quotes, or newlines.

```js
import { CSVWriter } from "https://code4fukui.github.io/csv-rw/CSVWriter.js";

const w = new CSVWriter("test.csv");
await w.writeRecord(["name", "value"]);
await w.writeRecord(["abc", 123]);
await w.writeRecord(["A field with, a comma", "A field with\na newline"]);
w.close();
```

### Working with Different Encodings

You can specify a decoder in the `CSVReader` constructor. This is useful for reading files in legacy encodings like Shift-JIS.

```js
import { CSVReader } from "https://code4fukui.github.io/csv-rw/CSVReader.js";
import { TextDecoderSJIS } from "https://js.sabae.cc/TextDecoderSJIS.js";

// Read a CSV file encoded in Shift-JIS
const r = new CSVReader("test-sjis.csv", new TextDecoderSJIS());
const row = await r.readRecord();
console.log(row);
r.close();
```

## Testing

```bash
cd test
deno test -A
```

## License

MIT License — see [LICENSE](LICENSE).