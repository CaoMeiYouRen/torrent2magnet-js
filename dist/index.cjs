var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/js-sha1@0.6.0/node_modules/js-sha1/src/sha1.js
var require_sha1 = __commonJS({
  "node_modules/.pnpm/js-sha1@0.6.0/node_modules/js-sha1/src/sha1.js"(exports, module) {
    (function() {
      "use strict";
      var root = typeof window === "object" ? window : {};
      var NODE_JS = !root.JS_SHA1_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = global;
      }
      var COMMON_JS = !root.JS_SHA1_NO_COMMON_JS && typeof module === "object" && module.exports;
      var AMD = typeof define === "function" && define.amd;
      var HEX_CHARS = "0123456789abcdef".split("");
      var EXTRA = [-2147483648, 8388608, 32768, 128];
      var SHIFT = [24, 16, 8, 0];
      var OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"];
      var blocks = [];
      var createOutputMethod = function(outputType) {
        return function(message) {
          return new Sha1(true).update(message)[outputType]();
        };
      };
      var createMethod = function() {
        var method2 = createOutputMethod("hex");
        if (NODE_JS) {
          method2 = nodeWrap(method2);
        }
        method2.create = function() {
          return new Sha1();
        };
        method2.update = function(message) {
          return method2.create().update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type = OUTPUT_TYPES[i];
          method2[type] = createOutputMethod(type);
        }
        return method2;
      };
      var nodeWrap = function(method) {
        var crypto = eval("require('crypto')");
        var Buffer = eval("require('buffer').Buffer");
        var nodeMethod = function(message) {
          if (typeof message === "string") {
            return crypto.createHash("sha1").update(message, "utf8").digest("hex");
          } else if (message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (message.length === void 0) {
            return method(message);
          }
          return crypto.createHash("sha1").update(new Buffer(message)).digest("hex");
        };
        return nodeMethod;
      };
      function Sha1(sharedMemory) {
        if (sharedMemory) {
          blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
          this.blocks = blocks;
        } else {
          this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        this.h0 = 1732584193;
        this.h1 = 4023233417;
        this.h2 = 2562383102;
        this.h3 = 271733878;
        this.h4 = 3285377520;
        this.block = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
      }
      Sha1.prototype.update = function(message) {
        if (this.finalized) {
          return;
        }
        var notString = typeof message !== "string";
        if (notString && message.constructor === root.ArrayBuffer) {
          message = new Uint8Array(message);
        }
        var code, index = 0, i, length = message.length || 0, blocks2 = this.blocks;
        while (index < length) {
          if (this.hashed) {
            this.hashed = false;
            blocks2[0] = this.block;
            blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          }
          if (notString) {
            for (i = this.start; index < length && i < 64; ++index) {
              blocks2[i >> 2] |= message[index] << SHIFT[i++ & 3];
            }
          } else {
            for (i = this.start; index < length && i < 64; ++index) {
              code = message.charCodeAt(index);
              if (code < 128) {
                blocks2[i >> 2] |= code << SHIFT[i++ & 3];
              } else if (code < 2048) {
                blocks2[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              } else if (code < 55296 || code >= 57344) {
                blocks2[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                blocks2[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              }
            }
          }
          this.lastByteIndex = i;
          this.bytes += i - this.start;
          if (i >= 64) {
            this.block = blocks2[16];
            this.start = i - 64;
            this.hash();
            this.hashed = true;
          } else {
            this.start = i;
          }
        }
        if (this.bytes > 4294967295) {
          this.hBytes += this.bytes / 4294967296 << 0;
          this.bytes = this.bytes % 4294967296;
        }
        return this;
      };
      Sha1.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks2 = this.blocks, i = this.lastByteIndex;
        blocks2[16] = this.block;
        blocks2[i >> 2] |= EXTRA[i & 3];
        this.block = blocks2[16];
        if (i >= 56) {
          if (!this.hashed) {
            this.hash();
          }
          blocks2[0] = this.block;
          blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
        }
        blocks2[14] = this.hBytes << 3 | this.bytes >>> 29;
        blocks2[15] = this.bytes << 3;
        this.hash();
      };
      Sha1.prototype.hash = function() {
        var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4;
        var f, j, t, blocks2 = this.blocks;
        for (j = 16; j < 80; ++j) {
          t = blocks2[j - 3] ^ blocks2[j - 8] ^ blocks2[j - 14] ^ blocks2[j - 16];
          blocks2[j] = t << 1 | t >>> 31;
        }
        for (j = 0; j < 20; j += 5) {
          f = b & c | ~b & d;
          t = a << 5 | a >>> 27;
          e = t + f + e + 1518500249 + blocks2[j] << 0;
          b = b << 30 | b >>> 2;
          f = a & b | ~a & c;
          t = e << 5 | e >>> 27;
          d = t + f + d + 1518500249 + blocks2[j + 1] << 0;
          a = a << 30 | a >>> 2;
          f = e & a | ~e & b;
          t = d << 5 | d >>> 27;
          c = t + f + c + 1518500249 + blocks2[j + 2] << 0;
          e = e << 30 | e >>> 2;
          f = d & e | ~d & a;
          t = c << 5 | c >>> 27;
          b = t + f + b + 1518500249 + blocks2[j + 3] << 0;
          d = d << 30 | d >>> 2;
          f = c & d | ~c & e;
          t = b << 5 | b >>> 27;
          a = t + f + a + 1518500249 + blocks2[j + 4] << 0;
          c = c << 30 | c >>> 2;
        }
        for (; j < 40; j += 5) {
          f = b ^ c ^ d;
          t = a << 5 | a >>> 27;
          e = t + f + e + 1859775393 + blocks2[j] << 0;
          b = b << 30 | b >>> 2;
          f = a ^ b ^ c;
          t = e << 5 | e >>> 27;
          d = t + f + d + 1859775393 + blocks2[j + 1] << 0;
          a = a << 30 | a >>> 2;
          f = e ^ a ^ b;
          t = d << 5 | d >>> 27;
          c = t + f + c + 1859775393 + blocks2[j + 2] << 0;
          e = e << 30 | e >>> 2;
          f = d ^ e ^ a;
          t = c << 5 | c >>> 27;
          b = t + f + b + 1859775393 + blocks2[j + 3] << 0;
          d = d << 30 | d >>> 2;
          f = c ^ d ^ e;
          t = b << 5 | b >>> 27;
          a = t + f + a + 1859775393 + blocks2[j + 4] << 0;
          c = c << 30 | c >>> 2;
        }
        for (; j < 60; j += 5) {
          f = b & c | b & d | c & d;
          t = a << 5 | a >>> 27;
          e = t + f + e - 1894007588 + blocks2[j] << 0;
          b = b << 30 | b >>> 2;
          f = a & b | a & c | b & c;
          t = e << 5 | e >>> 27;
          d = t + f + d - 1894007588 + blocks2[j + 1] << 0;
          a = a << 30 | a >>> 2;
          f = e & a | e & b | a & b;
          t = d << 5 | d >>> 27;
          c = t + f + c - 1894007588 + blocks2[j + 2] << 0;
          e = e << 30 | e >>> 2;
          f = d & e | d & a | e & a;
          t = c << 5 | c >>> 27;
          b = t + f + b - 1894007588 + blocks2[j + 3] << 0;
          d = d << 30 | d >>> 2;
          f = c & d | c & e | d & e;
          t = b << 5 | b >>> 27;
          a = t + f + a - 1894007588 + blocks2[j + 4] << 0;
          c = c << 30 | c >>> 2;
        }
        for (; j < 80; j += 5) {
          f = b ^ c ^ d;
          t = a << 5 | a >>> 27;
          e = t + f + e - 899497514 + blocks2[j] << 0;
          b = b << 30 | b >>> 2;
          f = a ^ b ^ c;
          t = e << 5 | e >>> 27;
          d = t + f + d - 899497514 + blocks2[j + 1] << 0;
          a = a << 30 | a >>> 2;
          f = e ^ a ^ b;
          t = d << 5 | d >>> 27;
          c = t + f + c - 899497514 + blocks2[j + 2] << 0;
          e = e << 30 | e >>> 2;
          f = d ^ e ^ a;
          t = c << 5 | c >>> 27;
          b = t + f + b - 899497514 + blocks2[j + 3] << 0;
          d = d << 30 | d >>> 2;
          f = c ^ d ^ e;
          t = b << 5 | b >>> 27;
          a = t + f + a - 899497514 + blocks2[j + 4] << 0;
          c = c << 30 | c >>> 2;
        }
        this.h0 = this.h0 + a << 0;
        this.h1 = this.h1 + b << 0;
        this.h2 = this.h2 + c << 0;
        this.h3 = this.h3 + d << 0;
        this.h4 = this.h4 + e << 0;
      };
      Sha1.prototype.hex = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
        return HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >> 28 & 15] + HEX_CHARS[h4 >> 24 & 15] + HEX_CHARS[h4 >> 20 & 15] + HEX_CHARS[h4 >> 16 & 15] + HEX_CHARS[h4 >> 12 & 15] + HEX_CHARS[h4 >> 8 & 15] + HEX_CHARS[h4 >> 4 & 15] + HEX_CHARS[h4 & 15];
      };
      Sha1.prototype.toString = Sha1.prototype.hex;
      Sha1.prototype.digest = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
        return [
          h0 >> 24 & 255,
          h0 >> 16 & 255,
          h0 >> 8 & 255,
          h0 & 255,
          h1 >> 24 & 255,
          h1 >> 16 & 255,
          h1 >> 8 & 255,
          h1 & 255,
          h2 >> 24 & 255,
          h2 >> 16 & 255,
          h2 >> 8 & 255,
          h2 & 255,
          h3 >> 24 & 255,
          h3 >> 16 & 255,
          h3 >> 8 & 255,
          h3 & 255,
          h4 >> 24 & 255,
          h4 >> 16 & 255,
          h4 >> 8 & 255,
          h4 & 255
        ];
      };
      Sha1.prototype.array = Sha1.prototype.digest;
      Sha1.prototype.arrayBuffer = function() {
        this.finalize();
        var buffer = new ArrayBuffer(20);
        var dataView = new DataView(buffer);
        dataView.setUint32(0, this.h0);
        dataView.setUint32(4, this.h1);
        dataView.setUint32(8, this.h2);
        dataView.setUint32(12, this.h3);
        dataView.setUint32(16, this.h4);
        return buffer;
      };
      var exports = createMethod();
      if (COMMON_JS) {
        module.exports = exports;
      } else {
        root.sha1 = exports;
        if (AMD) {
          define(function() {
            return exports;
          });
        }
      }
    })();
  }
});

// index.js
var torrent2magnet_js_exports = {};
__export(torrent2magnet_js_exports, {
  default: () => torrent2magnet_js_default
});
module.exports = __toCommonJS(torrent2magnet_js_exports);

// node_modules/.pnpm/uint8-util@2.2.4/node_modules/uint8-util/_node.js
var import_node_crypto = require("crypto");

// node_modules/.pnpm/uint8-util@2.2.4/node_modules/uint8-util/util.js
var alphabet = "0123456789abcdef";
var encodeLookup = [];
var decodeLookup = [];
for (let i = 0; i < 256; i++) {
  encodeLookup[i] = alphabet[i >> 4 & 15] + alphabet[i & 15];
  if (i < 16) {
    if (i < 10) {
      decodeLookup[48 + i] = i;
    } else {
      decodeLookup[97 - 10 + i] = i;
    }
  }
}
var arr2hex = (data) => {
  const length = data.length;
  let string = "";
  let i = 0;
  while (i < length) {
    string += encodeLookup[data[i++]];
  }
  return string;
};
var concat = (chunks, size = 0) => {
  const length = chunks.length || 0;
  if (!size) {
    let i2 = length;
    while (i2--)
      size += chunks[i2].length;
  }
  const b = new Uint8Array(size);
  let offset = size;
  let i = length;
  while (i--) {
    offset -= chunks[i].length;
    b.set(chunks[i], offset);
  }
  return b;
};

// node_modules/.pnpm/uint8-util@2.2.4/node_modules/uint8-util/_node.js
var decoder = new TextDecoder();
var arr2text = (data, enc) => {
  if (data.byteLength > 1024) {
    if (!enc)
      return decoder.decode(data);
    const dec = new TextDecoder(enc);
    return dec.decode(data);
  }
  return Buffer.from(data).toString(enc || "utf8");
};
var text2arr = (str) => new Uint8Array(Buffer.from(str, "utf8"));

// node_modules/.pnpm/bencode@4.0.0/node_modules/bencode/lib/util.js
function digitCount(value) {
  const sign = value < 0 ? 1 : 0;
  value = Math.abs(Number(value || 1));
  return Math.floor(Math.log10(value)) + 1 + sign;
}
function getType(value) {
  if (ArrayBuffer.isView(value))
    return "arraybufferview";
  if (Array.isArray(value))
    return "array";
  if (value instanceof Number)
    return "number";
  if (value instanceof Boolean)
    return "boolean";
  if (value instanceof Set)
    return "set";
  if (value instanceof Map)
    return "map";
  if (value instanceof String)
    return "string";
  if (value instanceof ArrayBuffer)
    return "arraybuffer";
  return typeof value;
}

// node_modules/.pnpm/bencode@4.0.0/node_modules/bencode/lib/encode.js
function encode(data, buffer, offset) {
  const buffers = [];
  let result = null;
  encode._encode(buffers, data);
  result = concat(buffers);
  encode.bytes = result.length;
  if (ArrayBuffer.isView(buffer)) {
    buffer.set(result, offset);
    return buffer;
  }
  return result;
}
encode.bytes = -1;
encode._floatConversionDetected = false;
encode._encode = function(buffers, data) {
  if (data == null) {
    return;
  }
  switch (getType(data)) {
    case "object":
      encode.dict(buffers, data);
      break;
    case "map":
      encode.dictMap(buffers, data);
      break;
    case "array":
      encode.list(buffers, data);
      break;
    case "set":
      encode.listSet(buffers, data);
      break;
    case "string":
      encode.string(buffers, data);
      break;
    case "number":
      encode.number(buffers, data);
      break;
    case "boolean":
      encode.number(buffers, data);
      break;
    case "arraybufferview":
      encode.buffer(buffers, new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
      break;
    case "arraybuffer":
      encode.buffer(buffers, new Uint8Array(data));
      break;
  }
};
var buffE = new Uint8Array([101]);
var buffD = new Uint8Array([100]);
var buffL = new Uint8Array([108]);
encode.buffer = function(buffers, data) {
  buffers.push(text2arr(data.length + ":"), data);
};
encode.string = function(buffers, data) {
  buffers.push(text2arr(text2arr(data).byteLength + ":" + data));
};
encode.number = function(buffers, data) {
  if (Number.isInteger(data))
    return buffers.push(text2arr("i" + BigInt(data) + "e"));
  const maxLo = 2147483648;
  const hi = data / maxLo << 0;
  const lo = data % maxLo << 0;
  const val = hi * maxLo + lo;
  buffers.push(text2arr("i" + val + "e"));
  if (val !== data && !encode._floatConversionDetected) {
    encode._floatConversionDetected = true;
    console.warn(
      'WARNING: Possible data corruption detected with value "' + data + '":',
      'Bencoding only defines support for integers, value was converted to "' + val + '"'
    );
    console.trace();
  }
};
encode.dict = function(buffers, data) {
  buffers.push(buffD);
  let j = 0;
  let k;
  const keys = Object.keys(data).sort();
  const kl = keys.length;
  for (; j < kl; j++) {
    k = keys[j];
    if (data[k] == null)
      continue;
    encode.string(buffers, k);
    encode._encode(buffers, data[k]);
  }
  buffers.push(buffE);
};
encode.dictMap = function(buffers, data) {
  buffers.push(buffD);
  const keys = Array.from(data.keys()).sort();
  for (const key of keys) {
    if (data.get(key) == null)
      continue;
    ArrayBuffer.isView(key) ? encode._encode(buffers, key) : encode.string(buffers, String(key));
    encode._encode(buffers, data.get(key));
  }
  buffers.push(buffE);
};
encode.list = function(buffers, data) {
  let i = 0;
  const c = data.length;
  buffers.push(buffL);
  for (; i < c; i++) {
    if (data[i] == null)
      continue;
    encode._encode(buffers, data[i]);
  }
  buffers.push(buffE);
};
encode.listSet = function(buffers, data) {
  buffers.push(buffL);
  for (const item of data) {
    if (item == null)
      continue;
    encode._encode(buffers, item);
  }
  buffers.push(buffE);
};
var encode_default = encode;

// node_modules/.pnpm/bencode@4.0.0/node_modules/bencode/lib/decode.js
var INTEGER_START = 105;
var STRING_DELIM = 58;
var DICTIONARY_START = 100;
var LIST_START = 108;
var END_OF_TYPE = 101;
function getIntFromBuffer(buffer, start, end) {
  let sum = 0;
  let sign = 1;
  for (let i = start; i < end; i++) {
    const num = buffer[i];
    if (num < 58 && num >= 48) {
      sum = sum * 10 + (num - 48);
      continue;
    }
    if (i === start && num === 43) {
      continue;
    }
    if (i === start && num === 45) {
      sign = -1;
      continue;
    }
    if (num === 46) {
      break;
    }
    throw new Error("not a number: buffer[" + i + "] = " + num);
  }
  return sum * sign;
}
function decode(data, start, end, encoding) {
  if (data == null || data.length === 0) {
    return null;
  }
  if (typeof start !== "number" && encoding == null) {
    encoding = start;
    start = void 0;
  }
  if (typeof end !== "number" && encoding == null) {
    encoding = end;
    end = void 0;
  }
  decode.position = 0;
  decode.encoding = encoding || null;
  decode.data = !ArrayBuffer.isView(data) ? text2arr(data) : new Uint8Array(data.slice(start, end));
  decode.bytes = decode.data.length;
  return decode.next();
}
decode.bytes = 0;
decode.position = 0;
decode.data = null;
decode.encoding = null;
decode.next = function() {
  switch (decode.data[decode.position]) {
    case DICTIONARY_START:
      return decode.dictionary();
    case LIST_START:
      return decode.list();
    case INTEGER_START:
      return decode.integer();
    default:
      return decode.buffer();
  }
};
decode.find = function(chr) {
  let i = decode.position;
  const c = decode.data.length;
  const d = decode.data;
  while (i < c) {
    if (d[i] === chr)
      return i;
    i++;
  }
  throw new Error(
    'Invalid data: Missing delimiter "' + String.fromCharCode(chr) + '" [0x' + chr.toString(16) + "]"
  );
};
decode.dictionary = function() {
  decode.position++;
  const dict = {};
  while (decode.data[decode.position] !== END_OF_TYPE) {
    const buffer = decode.buffer();
    let key = arr2text(buffer);
    if (key.includes("\uFFFD"))
      key = arr2hex(buffer);
    dict[key] = decode.next();
  }
  decode.position++;
  return dict;
};
decode.list = function() {
  decode.position++;
  const lst = [];
  while (decode.data[decode.position] !== END_OF_TYPE) {
    lst.push(decode.next());
  }
  decode.position++;
  return lst;
};
decode.integer = function() {
  const end = decode.find(END_OF_TYPE);
  const number = getIntFromBuffer(decode.data, decode.position + 1, end);
  decode.position += end + 1 - decode.position;
  return number;
};
decode.buffer = function() {
  let sep = decode.find(STRING_DELIM);
  const length = getIntFromBuffer(decode.data, decode.position, sep);
  const end = ++sep + length;
  decode.position = end;
  return decode.encoding ? arr2text(decode.data.slice(sep, end)) : decode.data.slice(sep, end);
};
var decode_default = decode;

// node_modules/.pnpm/bencode@4.0.0/node_modules/bencode/lib/encoding-length.js
function listLength(list) {
  let length = 1 + 1;
  for (const value of list) {
    length += encodingLength(value);
  }
  return length;
}
function mapLength(map) {
  let length = 1 + 1;
  for (const [key, value] of map) {
    const keyLength = text2arr(key).byteLength;
    length += digitCount(keyLength) + 1 + keyLength;
    length += encodingLength(value);
  }
  return length;
}
function objectLength(value) {
  let length = 1 + 1;
  const keys = Object.keys(value);
  for (let i = 0; i < keys.length; i++) {
    const keyLength = text2arr(keys[i]).byteLength;
    length += digitCount(keyLength) + 1 + keyLength;
    length += encodingLength(value[keys[i]]);
  }
  return length;
}
function stringLength(value) {
  const length = text2arr(value).byteLength;
  return digitCount(length) + 1 + length;
}
function arrayBufferLength(value) {
  const length = value.byteLength - value.byteOffset;
  return digitCount(length) + 1 + length;
}
function encodingLength(value) {
  const length = 0;
  if (value == null)
    return length;
  const type = getType(value);
  switch (type) {
    case "arraybufferview":
      return arrayBufferLength(value);
    case "string":
      return stringLength(value);
    case "array":
    case "set":
      return listLength(value);
    case "number":
      return 1 + digitCount(Math.floor(value)) + 1;
    case "bigint":
      return 1 + value.toString().length + 1;
    case "object":
      return objectLength(value);
    case "map":
      return mapLength(value);
    default:
      throw new TypeError(`Unsupported value of type "${type}"`);
  }
}
var encoding_length_default = encodingLength;

// node_modules/.pnpm/bencode@4.0.0/node_modules/bencode/index.js
var encodingLength2 = encoding_length_default;
var bencode_default = { encode: encode_default, decode: decode_default, byteLength: encoding_length_default, encodingLength: encodingLength2 };

// index.js
var import_js_sha1 = __toESM(require_sha1(), 1);
function response(success = false, infohash = "", magnet_uri = "", dn = "", xl = 0, main_tracker = "", tracker_list = [], is_private = false, files = []) {
  return { success, infohash, magnet_uri, dn, xl, main_tracker, tracker_list, is_private, files };
}
function torrent2magnet(buffer_content) {
  if (!buffer_content || buffer_content instanceof Uint8Array === false) {
    console.error("input is not a Uint8Array");
    return response();
  }
  const torrent = bencode_default.decode(buffer_content);
  if (!torrent.info) {
    console.error("invalid torrent file");
    return response();
  }
  const infohash = (0, import_js_sha1.default)(bencode_default.encode(torrent.info)).toUpperCase();
  const decoder2 = new TextDecoder("utf-8");
  const dn = torrent.info.name ? decoder2.decode(torrent.info.name) : "";
  const xl = torrent.info.length || 0;
  const main_tracker = torrent.announce ? decoder2.decode(torrent.announce) : "";
  let tracker_list = [];
  const announce_list = torrent["announce-list"];
  if (announce_list) {
    for (let i = 0; i < announce_list.length; i++) {
      const tracker = announce_list[i];
      tracker_list.push(decoder2.decode(tracker[0]));
    }
  }
  const tr = tracker_list.join("&tr=") || "";
  const files = [];
  if (torrent.info.files && torrent.info.files.length > 0) {
    for (let i = 0; i < torrent.info.files.length; i++) {
      let path = "";
      for (let j = 0; j < torrent.info.files[i].path.length; j++) {
        path += `${j > 0 ? "/" : ""}` + decoder2.decode(torrent.info.files[i].path[j]);
      }
      const length = torrent.info.files[i].length || 0;
      files.push({ path, length });
    }
  }
  const magnet_uri = `magnet:?xt=urn:btih:${infohash}${dn ? `&dn=${dn}` : ""}${`&xl=${xl}`}${tr ? `&tr=${tr}` : ""}`;
  const is_private = torrent.info.private === 1 ? true : false;
  return response(true, infohash, magnet_uri, dn, xl, main_tracker, tracker_list, is_private, files);
}
var torrent2magnet_js_default = torrent2magnet;
/*! Bundled license information:

js-sha1/src/sha1.js:
  (*
   * [js-sha1]{@link https://github.com/emn178/js-sha1}
   *
   * @version 0.6.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2017
   * @license MIT
   *)

uint8-util/util.js:
  (* Common package for dealing with hex/string/uint8 conversions (and sha1 hashing)
  *
  * @author   Jimmy Wärting <jimmy@warting.se> (https://jimmy.warting.se/opensource)
  * @license  MIT
  *)
*/
