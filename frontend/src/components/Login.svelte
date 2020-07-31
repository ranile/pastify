<script>
    import {getContext} from "svelte";
    import {navigate} from "svelte-routing";
    import Navbar from "./Navbar.svelte";

    const app = getContext('firebase').getFirebase();
    const auth = app.auth()

    let signinOrSignup = 'signin'

    let signinCredentials = {
        email: '', password: ''
    }

    let signupCredentials = {
        email: '', password: '', displayName: ''
    }

    const login = async () => {
        console.log(signinCredentials)

        await auth.signInWithEmailAndPassword(signinCredentials.email, signinCredentials.password)
        navigate('/')
    }

    const signup = async () => {
        console.log(signupCredentials)
        const user = await auth.createUserWithEmailAndPassword(signupCredentials.email, signupCredentials.password)
        await user.updateProfile({
            displayName: signupCredentials.displayName
        })
        navigate('/')
    }
</script>

<style type="text/scss">
    main {
        display: flex;
        flex-direction: column;
        max-width: 20em;
        gap: 1.5em;
        padding: 0.5em 1em;

        label {
            display: flex;
            flex-direction: column;
            gap: 0.7em;

            input {
                background-color: var(--background-color-secondary);
                color: var(--text-color);
                border: none;
                padding: 0.5em;

                transition: border-radius 500ms;
            }

            input:focus-within {
                border: 3px solid var(--border-color);
                border-radius: 5pt;
            }
        }
    }

    .link-button {
        border: none;
        padding: 0;
        color: var(--link-color);
    }
</style>

<Navbar/>
<main>
    {#if signinOrSignup === 'signin'}
        <label>
            Email
            <input type="email" bind:value={signinCredentials.email}>
        </label>

        <label>
            Password
            <input type="password" bind:value={signinCredentials.password}>
        </label>

        <button on:click={login}>Login</button>

        <span>Need an account? <button class="link-button" on:click={() => signinOrSignup = 'signup'}>Create one</button></span>
    {:else if signinOrSignup === 'signup'}
        <label>
            Display name
            <input bind:value={signupCredentials.displayName}>
        </label>

        <label>
            Email
            <input type="email" bind:value={signupCredentials.email}>
        </label>

        <label>
            Password
            <input type="password" bind:value={signupCredentials.password}>
        </label>

        <button on:click={signup}>Signup</button>

        <span>Already have an account? <button class="link-button"
                                               on:click={() => signinOrSignup = 'signin'}>Login</button></span>
    {/if}
</main>
