//const BUF_SIZE = 13; // for test
const BUF_SIZE = 1024 * 16; // default Deno 1.12.0

class LineReader {
  constructor(fn) {
    this.fn = fn;
    this.f = null;
    this.bufsize = BUF_SIZE;
    this.buf = new Uint8Array(this.bufsize);
    this.linebuf = new Uint8Array(this.bufsize);
    this.idx = 0;
    this.len = 0;
    this.eof = false;
    this.decoder = new TextDecoder();
    this.readcnt = 0;
    this.fillcnt = 0;
  }
  async _fill() {
    if (this.eof) {
      return false;
    }
    if (!this.f) {
      this.f = await Deno.open(this.fn);
    }
    this.idx = 0;
    this.len = await this.f.read(this.buf);
    this.eof = this.len == null;
    if (!this.eof) {
      this.readcnt += this.len;
      this.fillcnt++;
    }
    return !this.eof;
  }
  indexOfBreak() {
    const n = this.buf.indexOf(10, this.idx);
    if (n < 0 || n >= this.len) {
      return -1;
    }
    return n;
  }
  async readLine() {
    if (this.eof) {
      return null;
    }
    if (this.idx == this.len) {
      await this._fill();
      if (this.eof) {
        return null;
      }
    }
    const n = this.indexOfBreak();
    if (n >= 0) {
      const len = n - this.idx;
      const line = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        line[i] = this.buf[i + this.idx];
      }
      this.idx = n + 1;
      return this.decoder.decode(line);
    }
    const bkbuf = this.buf;
    const bkidx = this.idx;
    const bklen = this.len;
    const len1 = bklen - bkidx;
    this.buf = new Uint8Array(this.bufsize);
    await this._fill();
    const n2 = this.eof ? 0 : this.indexOfBreak();
    if (n2 >= 0) {
      const len = len1 + n2;
      const line = new Uint8Array(len); // bkbufを再利用すればもう少し効率良い
      for (let i = 0; i < len1; i++) {
        line[i] = bkbuf[i + bkidx];
      }
      for (let i = len1; i < len; i++) {
        line[i] = this.buf[i - len1];
      }
      this.idx = n2 + 1;
      return this.decoder.decode(line);
    }
    // 2バッファ読んでも改行が見つからない場合
    const bufs = [this.buf];
    let len = len1 + this.bufsize;
    for (;;) {
      this.buf = new Uint8Array(this.bufsize);
      await this._fill();
      const n = this.eof ? 0 : this.indexOfBreak();
      if (n >= 0) {
        len += n;
        const line = new Uint8Array(len);
        let idx = 0;
        for (let i = 0; i < len1; i++) {
          line[idx++] = bkbuf[i + bkidx];
        }
        for (let j = 0; j < bufs.length; j++) {
          const buf = bufs[j];
          for (let i = 0; i < this.bufsize; i++) {
            line[idx++] = buf[i];
          }
        }
        for (let i = 0; i < n; i++) {
          line[idx++] = this.buf[i];
        }
        this.idx = n + 1;
        return this.decoder.decode(line);
      }
      bufs.push(this.buf);
      len += this.bufsize;
    }
  }
  close() {
    this.f.close();
  }
}

export { LineReader };
