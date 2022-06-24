"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return {
        code: script + content + style,
    };
}
exports.default = {
    markup: preprocessMarkup,
};
