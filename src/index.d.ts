
declare module 'svelte-gitcal' {
  import { SvelteComponentTyped } from "svelte";

  export type Styles = { [id: string]: string; };

  export interface GitCalProps {
    gitlog: string;
    styles: Styles;
    months: string;
  }

  export default class GitCal extends SvelteComponentTyped<GitCalProps, {}, {}> {}
}
