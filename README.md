# Svelte-gitcal component 
A Github lookalike calender svelte component

Demo: [de-neef.net/gitlog](https://de-neef.net/gitlog)

Based upon: 
- [svelte-ts-component-template](https://github.com/patrickroberts/svelte-ts-component-template) but updated
- which in turn is based upon the [svelte component template](https://github.com/sveltejs/component-template)

```bash
npm install --save-dev svelte-gitcal
```

Example usage:

```js
<script lang="ts">
  import GitCal from 'svelte-gitcal'

  // generate gitlog with:
  // $> git log --date=short --pretty=format:%ad | sort | uniq -c > git.log
  const gitlog = fetch('https://<somewhere>/<gitlog output>').then(r =>
    r.text()
  )
</script>

{#await gitlog then data}
  <GitCal gitlog={data} months="12" styles={{ commits0: 'rgb(65,72,89)' }} />
{/await}
```

The calendar lists the number of commits in 4 categories, based upon the max commits per day for the entire period, so commit colors are relative to the max nr of commits (hence the not to clear legend ;-) )

Available styles:
- commits0: no commits
- commits1: some commits
- commits2: more commits
- commits3: a lot
- text: style for legend and month texts


