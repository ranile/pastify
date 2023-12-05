import {error} from '@sveltejs/kit';
import type {PageLoad} from './$types';
import { getPaste } from "$lib/firebase/app";
import detectLang from "lang-detector";
export const load: PageLoad = async ({params}) => {
    const paste = await getPaste(params.id)
    if (paste === null) {
        throw error(404, 'Not found');
    }
    const lang = detectLang(paste.content)
    return {
        paste,
        language: lang
    };
};