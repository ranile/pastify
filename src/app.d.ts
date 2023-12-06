// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }
}

declare module 'lang-detector' {
    function detectLang(content: string): string;
    export default detectLang;
}
export {};
