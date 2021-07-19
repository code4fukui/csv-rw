import { LineReader } from "https://code4fukui.github.io/line-rw/LineReader.js";

class CSVReader {
  constructor(fn) {
    this.r = null;
    this.fn = fn;
  }
  async readRecord(head) {
    const a = await this._readRecord();
    if (!a) {
      return null;
    }
    if (!head) {
      return a;
    }
    const res = {};
    for (let i = 0; i < head.length; i++) {
      res[head[i]] = a[i];
    }
    return res;
  }
  async _readRecord() {
    if (this.r == null) {
      this.r = new LineReader(this.fn);
    }
    const s = await this.r.readLine();
    if (s == null) {
      return null;
    }
    const line = this.parseRecordCSV(s);
    if (line) {
      return line;
    }
    let s2 = s;
    for (;;) {
      const s = await this.r.readLine();
      if (s == null) {
        throw new Error("illegal CSV");
      }
      s2 += "\n" + s;
      const line = this.parseRecordCSV(s2);
      if (line) {
        return line;
      }
    }
  }
  parseRecordCSV(s) {
    let st = 0;
    let line = [];
    let sb = null;
    const len = s.length;
    for (let i = 0; i < len; i++) {
      const c = s[i];
      if (c === "\r" || c === "\ufeff") {
        continue;
      }
      if (st === 0) {
        if (c === "\n") {
          throw new Error("illegal n");
        } else if (c == ",") {
          line.push("");
        } else if (c == '"') {
          sb = "";
          st = 2;
        } else {
          sb = c;
          st = 1;
        }
      } else if (st === 1) {
        if (c === "\n") {
          throw new Error("illegal n");
        } else if (c === ",") {
          line.push(sb);
          sb = null;
          st = 0;
        } else {
          sb += c;
        }
      } else if (st === 2) {
        if (c === '"') {
          st = 3;
        } else {
          sb += c;
        }
      } else if (st === 3) {
        if (c === '"') {
          sb += c;
          st = 2;
        } else if (c === ",") {
          line.push(sb);
          sb = null;
          st = 0;
        } else if (c === "\n") {
          throw new Error("illegal n");
        }
      }
    }
    if (st == 2) {
      return null; // partial
    }
    if (sb != null) {
      line.push(sb);
    }
    return line;
  }
  close() {
    if (this.r) {
      this.r.close();
    }
  }
}

export { CSVReader };
