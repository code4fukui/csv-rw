import * as t from "https://deno.land/std/testing/asserts.ts";
import { CSVWriter } from "../CSVWriter.js";
import { CSVReader } from "../CSVReader.js";
import { TextDecoderSJIS } from "https://js.sabae.cc/TextDecoderSJIS.js";

Deno.test("test", async () => {
  const w = new CSVWriter("test.csv");
  await w.writeRecord(["name", "value"]);
  await w.writeRecord(["abc", "123"]);
  await w.writeRecord(["def", "456"]);
  w.close();
  const r = new CSVReader("test.csv");
  t.assertEquals(await r.readRecord(), ["name", "value"]);
  t.assertEquals(await r.readRecord(), ["abc", "123"]);
  t.assertEquals(await r.readRecord(), ["def", "456"]);
  t.assertEquals(await r.readRecord(), null);
  r.close();
});
Deno.test("test2", async () => {
  t.assertEquals(
    await Deno.readTextFile("test.csv"),
    "\ufeffname,value\nabc,123\ndef,456\n",
  );
});
Deno.test("sjis", async () => {
  /*
  const w = new CSVWriter("test.csv");
  await w.writeRecord(["name", "value"]);
  await w.writeRecord(["abc", "123"]);
  await w.writeRecord(["def", "456"]);
  w.close();
  */
  const r = new CSVReader("test-sjis.csv", new TextDecoderSJIS());
  t.assertEquals(await r.readRecord(), ["name", "value"]);
  t.assertEquals(await r.readRecord(), ["あいう", "123"]);
  t.assertEquals(await r.readRecord(), ["かきく", "456"]);
  t.assertEquals(await r.readRecord(), null);
  r.close();
});
