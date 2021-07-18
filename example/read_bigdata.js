const fn = "data_go_jp_format_mp3.csv"
const f = await Deno.open(fn);
const bufsize = 1024 * 16;
// 読むだけ、154msec, bufsize最大16384 Deno 1.12.0
// 　buf 8k -> 263msec
//   buf 1k -> 1668msec
const buf = new Uint8Array(bufsize);
let cnt = 0;
const t0 = performance.now();
for (;;) {
  const n = await f.read(buf);

  //console.log(n, bufsize);
  if (n <= 0) {
    break;
  }
  cnt += n;
}
console.log(cnt);
console.log(performance.now() - t0);

