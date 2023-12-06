<script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
    import '$lib/monaco';

    let editor: monaco.editor.IStandaloneCodeEditor;
    let editorContainer: HTMLElement;

    export let value: string;
    export let language = 'javascript';
    export let theme = 'vs-dark';
    export let height = '100dvh';
    export let readonly = false;

    $: {
        if (editor) {
            monaco.editor.setTheme(theme);
        }
    }

    $: {
        if (editor) {
            // at this point, we've already set the modal
            monaco.editor.setModelLanguage(editor.getModel()!, language);
        }
    }

    onMount(async () => {
        editor = monaco.editor.create(editorContainer, {
            theme: 'vs-dark',
            automaticLayout: true,
            readOnly: readonly
        });
        const model = monaco.editor.createModel(value, language);

        model.onDidChangeContent((e) => {
            value = model.getValue();
            console.log(e);
        });
        editor.setModel(model);
    });

    onDestroy(() => {
        monaco?.editor.getModels().forEach((model) => model.dispose());
        editor?.dispose();
    });
</script>

<div class='container' bind:this={editorContainer} style:height />

<style>
    .container {
        width: 100%;
    }
</style>
