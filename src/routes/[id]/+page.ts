import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getPaste } from '$lib/firebase/app';
// @ts-expect-error lang-detector has no types and I can't be bothered to add them
import detectLang from 'lang-detector';

export const load: PageLoad = async ({ params }) => {
    let languageHint;
    let id;
    if (params.id.includes('.')) {
        const [pasteId, lang] = params.id.split('.');
        id = pasteId;
        languageHint = lang;
    } else {
        id = params.id;
    }

    const paste = await getPaste(id);
    if (paste === null) {
        throw error(404, 'Not found');
    }

    const lang = languageHint ? mapLangHintToLanguage(languageHint) : detectLang(paste.content);
    return {
        paste,
        language: lang,
    };
};

function mapLangHintToLanguage(hint: string) {
    // use extensions: js, ts, cpp, c, json, py, kt, rs, html, css, rb, go, php
    switch (hint) {
        case 'js':
            return 'javascript';
        case 'ts':
            return 'typescript';
        case 'cpp':
            return 'c++';
        case 'c':
            return 'c';
        case 'json':
            return 'json';
        case 'py':
            return 'python';
        case 'kt':
            return 'kotlin';
        case 'rs':
            return 'rust';
        case 'html':
            return 'html';
        case 'css':
            return 'css';
        case 'rb':
            return 'ruby';
        case 'go':
            return 'go';
        case 'php':
            return 'php';
        default:
            return 'plaintext';
    }
}
