<script>
    import Monaco from '$lib/Monaco.svelte'
    import TopBar from '$lib/TopBar.svelte'
    import {createPaste} from "$lib/firebase/app.ts";
    import {goto} from "$app/navigation";

    let code = `// Hello World`
    const topBarHeight = '3.3rem'

    let saving = false
    const actionButtonClick = async () => {
        saving = true
        const id = await createPaste(code)
        await goto(`/${id}`)
        saving = false
    };
</script>

<TopBar {topBarHeight} buttonText="Save" on:actionButtonClick={actionButtonClick} />
<Monaco bind:value={code} height={`calc(100dvh - ${topBarHeight})`} language="rust" theme='vs-dark' readonly={saving} />