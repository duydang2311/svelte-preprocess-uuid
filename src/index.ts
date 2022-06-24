import * as svelte from 'svelte/compiler';
import { v4 as uuid } from '@lukeed/uuid';

const uuidScriptRegex = /uuid_.*?\b/gm;
const uuidMarkupRegex = /({)\s*(uuid_.*?\b)\s*(})/gm;
const uuidDeclarationRegex =
	/(const|let|var)\s+(uuid_.*?\b)\s*=\s*('|")\$('|");?[\s\r\n]*/gm;
const styleRegex = /(\<style[\s\S]*>)([\s\S]*)(\<\/style\>)/gi;
const scriptRegex = /(\<script[\s\S]*>)([\s\S]*)(\<\/script\>)/gi;
const uuidMap = new Map<string, string>();

function tryGenerateUUID(key: string) {
	if (!uuidMap.has(key)) {
		const generated = uuid();
		uuidMap.set(key, generated);
		return generated;
	}
	return uuidMap.get(key)!;
}

function formatScript(script: string) {
	return script
		.replace(uuidDeclarationRegex, '')
		.replace(uuidScriptRegex, (substring) => {
			return `'${tryGenerateUUID(substring)}'`;
		});
}

function preprocessMarkup({ content }: { content: string }) {
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
			const match = cloned.exec(substring)!;
			return `"${tryGenerateUUID(match[2])}"`;
		});
	return svelte.compile(script + content + style).js;
}

export default {
	markup: preprocessMarkup,
};
