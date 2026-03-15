# csv-rw

Deno用 CSVファイルの行単位読み書きライブラリです。

## 機能

- CSVファイルの行単位での読み書き
- 文字コード変換機能付き

## 使い方

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

## テスト

```bash
cd test
deno test -A
```

## ブログ

[Deno用 ファイル行単位読み書きライブラリ](https://fukuno.jig.jp/3281)