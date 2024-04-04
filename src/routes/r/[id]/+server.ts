import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPaste } from '$lib/firebase/app';

export const GET: RequestHandler = async ({ params }) => {
    const id = params.id;
    if (id === undefined) {
        error(400, 'id is required.');
    }
    const paste = await getPaste(id);
    if (paste === null) {
        error(404, 'Not found');
    }

    return new Response(paste.content, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
};
