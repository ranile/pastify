<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import TopBar from '$lib/TopBar.svelte';
    import type Monaco from '$lib/Monaco.svelte';
    import type { ComponentType } from 'svelte';

    let Monaco: ComponentType<Monaco> | undefined;
    let topBarHeight = '3.3rem';

    const actionButtonClick = () => {};

    export let data: PageData;
    $: content = data.paste.content;

    onMount(async () => {
        const module = await import('$lib/Monaco.svelte');
        // eslint-disable-next-line no-import-assign
        Monaco = module.default;

        console.log(data.language);
    });
</script>

<TopBar {topBarHeight} buttonText="Copy" on:actionButtonClick={actionButtonClick} />

{#if Monaco}
    <svelte:component
        this={Monaco}
        value={content}
        height={`calc(100dvh - ${topBarHeight})`}
        language={data.language.toLowerCase()}
        theme="vs"
        readonly={true}
    />
{:else}
    <pre>{content}</pre>
{/if}
