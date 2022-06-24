"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const svelte = __importStar(require("svelte/compiler"));
const uuid_1 = require("@lukeed/uuid");
const uuidScriptRegex = /uuid_.*?\b/gm;
const uuidMarkupRegex = /({)\s*(uuid_.*?\b)\s*(})/gm;
const uuidDeclarationRegex = /(const|let|var)\s+(uuid_.*?\b)\s*=\s*('|")\$('|");?[\s\r\n]*/gm;
const styleRegex = /(\<style[\s\S]*>)([\s\S]*)(\<\/style\>)/gi;
const scriptRegex = /(\<script[\s\S]*>)([\s\S]*)(\<\/script\>)/gi;
const uuidMap = new Map();
function tryGenerateUUID(key) {
    if (!uuidMap.has(key)) {
        const generated = (0, uuid_1.v4)();
        uuidMap.set(key, generated);
        return generated;
    }
    return uuidMap.get(key);
}
function formatScript(script) {
    return script
        .replace(uuidDeclarationRegex, '')
        .replace(uuidScriptRegex, (substring) => {
        return `'${tryGenerateUUID(substring)}'`;
    });
}
function preprocessMarkup({ content }) {
    let style = '';
    let script = '';
    const cloned = new RegExp(uuidMarkupRegex);
    content = content
        .replace(styleRegex, (substring) => {
        style = substring;
        return '';
    })
        .replace(scriptRegex, (substring) => {
        script = formatScript(substring);
        return '';
    })
        .replace(uuidMarkupRegex, (substring) => {
        cloned.lastIndex = 0;
        const match = cloned.exec(substring);
        return `"${tryGenerateUUID(match[2])}"`;
    });
    return svelte.compile(script + content + style).js;
}
exports.default = {
    markup: preprocessMarkup,
};
