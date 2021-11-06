import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

let fr = readFileSync(join(__dirname, "dist", "index.js"), "utf8");

fr = fr.replace(
  /"use strict";/,
  `// ==UserScript==
// @name         Narou SPAfy
// @description  Narou SPAfy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       pycabbage
// @match        https://ncode.syosetu.com/n*/
// @match        https://ncode.syosetu.com/n*/*
// @icon         https://www.google.com/s2/favicons?domain=syosetu.com
// @grant        none
// ==/UserScript==
`
);

writeFileSync(join(__dirname, "narou-spafy.user.js"), fr);
