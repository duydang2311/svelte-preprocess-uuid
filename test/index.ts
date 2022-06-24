import * as svelte from 'svelte/compiler';
import uuid from '../src/index';
import fs from 'fs';
import path from 'path';

svelte
	.preprocess(
		fs.readFileSync(path.join(__dirname, 'App.svelte'), 'utf-8'),
		uuid
	)
	.then((v) => {
		console.log(v.code);
	});
