class CSVWriter {
  constructor(fn) {
    this.f = null;
    this.fn = fn;
    this.textencoder = new TextEncoder();
    this.eof = false;
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
    if (this.eof) {
      throw new Error("closed");
    }
    if (!this.f) {
      this.f = await Deno.open(this.fn,  { write: true, create: true });
      await this.f.write(this.textencoder.encode("\ufeff"));
    }
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
    await this.f.write(this.textencoder.encode(s2.join(",") + "\n"));
  }
  close() {
    if (!this.f) {
      return;
    }
    this.f.close();
    this.eof = true;
  }
}

export { CSVWriter };
