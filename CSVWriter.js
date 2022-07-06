import { LineWriter } from "https://code4fukui.github.io/line-rw/LineWriter.js";

class CSVWriter {
  constructor(fn, encoder) {
    this.w = new LineWriter(fn, encoder);
  }
  async writeRecord(line, head) {
    if (head) {
      const a = [];
      for (let i = 0; i < head.length; i++) {
        a[i] = line[head[i]];
      }
      line = a;
    }
    await this._writeRecord(line);
  }
  async _writeRecord(line) {
    let bom = this.w.f == null ? "\ufeff" : "";
    const s2 = [];
    for (let j = 0; j < line.length; j++) {
      const v = line[j];
      if (v == undefined || v.length == 0) {
        s2.push("");
      } else if (typeof v == "number") {
        s2.push(v);
      } else if (typeof v != "string") {
        s2.push('"' + v + '"');
      } else if (v.indexOf('"') >= 0) {
        s2.push('"' + v.replace(/\"/g, '""') + '"');
      } else if (v.indexOf(",") >= 0 || v.indexOf("\n") >= 0) {
        s2.push('"' + v + '"');
      } else {
        s2.push(v);
      }
    }
    await this.w.writeLine(bom + s2.join(","));
  }
  close() {
    this.w.close();
  }
}

export { CSVWriter };
