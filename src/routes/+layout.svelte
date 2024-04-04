<script>
    import firebase from '$lib/firebase/app.ts';

    console.info('running app', firebase.name);
</script>

<svelte:head>
    <title>Pastify</title>
</svelte:head>

<slot />

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        font-family: system-ui;
        font-size: 16px;
        line-height: 1.5;
    }
</style>
