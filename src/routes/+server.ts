import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createPaste } from '$lib/firebase/app';

export const POST: RequestHandler = async ({ request }) => {
    // TODO: if the body has the contents (e.g. if content-type if not multipart), use that instead of looking for a file

    const formData = await request.formData();
    let file;
    let count = 0;

    for (const entry of formData.entries()) {
        if (entry[1] instanceof File) {
            file = entry[1];
            count++;
        }
    }

    if (file === undefined || count !== 1) {
        error(400, 'one and only one file should be passed.');
    }

    const fileContent = await file.text();
    const paste = await createPaste(fileContent);

    return json({ id: paste });
};
