<!--suppress ES6UnusedImports -->
<script>
    import {FirebaseApp} from 'sveltefire';
    import {Router, Route} from "svelte-routing";

    import ShowPaste from "./components/ShowPaste.svelte";
    import Home from "./components/Home.svelte";
    import Login from "./components/Login.svelte";

    import firebase from "firebase/app";
    import 'firebase/firestore';
    import 'firebase/auth';
    import 'firebase/performance';
    import 'firebase/analytics';

    const firebaseConfig = {
        apiKey: "AIzaSyA3QKpedhSb0lSZkk7lHN5M82e-7cTlNaA",
        authDomain: "pastify-app.firebaseapp.com",
        databaseURL: "https://pastify-app.firebaseio.com",
        projectId: "pastify-app",
        storageBucket: "pastify-app.appspot.com",
        messagingSenderId: "867546936605",
        appId: "1:867546936605:web:3e3d2ed07c31f022095df4",
        measurementId: "G-VLM54TKM2K"
    }

    firebase.initializeApp(firebaseConfig)

    let db = firebase.firestore()
    if (location.hostname === "localhost") {
        db.settings({
            host: "localhost:8080",
            ssl: false
        });
    }

    export let url = "";
</script>


<FirebaseApp {firebase}>
    <Router url="{url}">
        <div>
            <Route path="/" component="{Home}"/>
            <Route path="login" component="{Login}"/>
            <Route path="show/:id" component="{ShowPaste}"/>
        </div>
    </Router>
</FirebaseApp>

<style type="text/scss">
    :global(:root) {
        --text-color: #d7d7d7;
        --background-color: #0b0b0b;
        --code-background-color: #121212;
        --nav-icon-color: rgba(255, 255, 255, 0.7);
        --nav-icon-hover-color: rgba(255, 255, 255, 1);
        --background-color-secondary: #212121;
        --border-color: #226699;
        --link-color: #731bbf
    }

    :global(body) {
        color: var(--text-color);
        background-color: var(--background-color);
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    :global(*) {
        margin: 0;
        padding: 0;
    }

    :global(button) {
        background: transparent;
        color: var(--text-color);
        font-size: 1rem;
        border: 3px solid var(--border-color);
        border-radius: 5pt;
        padding: 0.3em 1em 0.3em 1em;
        cursor: pointer;
    }

    :global(.left) {
        margin-left: auto;
    }

    :global(.unselectable) {
        user-select: none;
    }

    :global(.clickable) {
        cursor: pointer;
        color: var(--nav-icon-color);
    }

    :global(.clickable:hover) {
        color: var(--nav-icon-hover-color);
    }

</style>
