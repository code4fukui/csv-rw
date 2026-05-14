# csv-rw

[Deno](https://deno.land/) 向けの、行単位でCSVの読み書きを行うライブラリです。

## 機能

- 大規模なファイルを効率的に行単位で処理するための `CSVReader` および `CSVWriter` クラスを提供します。
- カンマや改行を含む、引用符で囲まれたフィールドを正しく処理します。
- ヘッダー行を使用して、CSVの行をJavaScriptのオブジェクトにマッピングできます。
- 非UTF-8エンコーディング（Shift-JISなど）のファイル向けに、カスタムテキストデコーダーをサポートします。
- 新規ファイルの書き込み時にUTF-8 BOMを自動的に追加します。

## 使用方法

### CSVファイルの読み込み

#### 行を配列として読み込む

```js
import { CSVReader } from "https://code4fukui.github.io/csv-rw/CSVReader.js";

const r = new CSVReader("test.csv");
for (let row; (row = await r.readRecord()) !== null;) {
  console.log(row); // 例: ["name", "value"]
}
r.close();
```

#### 行をオブジェクトとして読み込む

`readRecord()` にヘッダーの配列を渡すことで、配列の代わりにオブジェクトとして取得できます。

```js
import { CSVReader } from "https://code4fukui.github.io/csv-rw/CSVReader.js";

const r = new CSVReader("test.csv");
const header = await r.readRecord(); // 最初の行をヘッダーとして読み込む

if (header) {
  for (let record; (record = await r.readRecord(header)) !== null;) {
    console.log(record); // 例: { name: "abc", value: "123" }
  }
}
r.close();
```

### CSVファイルの書き込み

カンマ、引用符、改行を含むフィールドの引用符処理（クォーティング）は自動的に行われます。

```js
import { CSVWriter } from "https://code4fukui.github.io/csv-rw/CSVWriter.js";

const w = new CSVWriter("test.csv");
await w.writeRecord(["name", "value"]);
await w.writeRecord(["abc", 123]);
await w.writeRecord(["A field with, a comma", "A field with\na newline"]);
w.close();
```

### 異なるエンコーディングの処理

`CSVReader` のコンストラクタでデコーダーを指定できます。これは、Shift-JISなどのレガシーエンコーディングのファイルを読み込む際に便利です。

```js
import { CSVReader } from "https://code4fukui.github.io/csv-rw/CSVReader.js";
import { TextDecoderSJIS } from "https://js.sabae.cc/TextDecoderSJIS.js";

// Shift-JISでエンコードされたCSVファイルを読み込む
const r = new CSVReader("test-sjis.csv", new TextDecoderSJIS());
const row = await r.readRecord();
console.log(row);
r.close();
```

## テスト

```bash
cd test
deno test -A
```

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
