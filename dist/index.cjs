var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// index.js
var torrent2magnet_js_exports = {};
__export(torrent2magnet_js_exports, {
  default: () => torrent2magnet_js_default
});
module.exports = __toCommonJS(torrent2magnet_js_exports);
var import_bencode = __toESM(require("bencode"), 1);
var import_js_sha1 = __toESM(require("js-sha1"), 1);
function response(success = false, infohash = "", magnet_uri = "", dn = "", xl = 0, main_tracker = "", tracker_list = [], is_private = false, files = []) {
  return { success, infohash, magnet_uri, dn, xl, main_tracker, tracker_list, is_private, files };
}
function torrent2magnet(buffer_content) {
  if (!buffer_content || buffer_content instanceof Uint8Array === false) {
    console.error("input is not a Uint8Array");
    return response();
  }
  const torrent = import_bencode.default.decode(buffer_content);
  if (!torrent.info) {
    console.error("invalid torrent file");
    return response();
  }
  const infohash = (0, import_js_sha1.default)(import_bencode.default.encode(torrent.info)).toUpperCase();
  const decoder = new TextDecoder("utf-8");
  const dn = torrent.info.name ? decoder.decode(torrent.info.name) : "";
  const xl = torrent.info.length || 0;
  const main_tracker = torrent.announce ? decoder.decode(torrent.announce) : "";
  let tracker_list = [];
  const announce_list = torrent["announce-list"];
  if (announce_list) {
    for (let i = 0; i < announce_list.length; i++) {
      const tracker = announce_list[i];
      tracker_list.push(decoder.decode(tracker[0]));
    }
  }
  const tr = tracker_list.join("&tr=") || "";
  const files = [];
  if (torrent.info.files && torrent.info.files.length > 0) {
    for (let i = 0; i < torrent.info.files.length; i++) {
      let path = "";
      for (let j = 0; j < torrent.info.files[i].path.length; j++) {
        path += `${j > 0 ? "/" : ""}` + decoder.decode(torrent.info.files[i].path[j]);
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
