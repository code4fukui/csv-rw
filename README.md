# csv-rw

- Deno用 CSVファイルの行単位読み書きライブラリ
- CSV File line-by-line read/write library for [Deno](https://deno.land/)

```js
import { CSVWriter } from "https://code4fukui.github.io/csv-rw/CSVWriter.js";

const w = new CSVWriter("test.csv");
await w.writeRecord(["name", "value"]);
await w.writeRecord(["abc", 123]);
await w.writeRecord(["def", 456]);
w.close();
```

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

## test

```bash
cd test
deno test -A
```

## blog

[Deno用 ファイル行単位読み書きライブラリ](https://fukuno.jig.jp/3281)
