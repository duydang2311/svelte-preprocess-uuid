import type { Processed } from 'svelte/types/compiler/preprocess';
declare function preprocessMarkup({ content }: {
    content: string;
}): Processed;
declare const _default: {
    markup: typeof preprocessMarkup;
};
export default _default;
