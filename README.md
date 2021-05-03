# Svelte-gitcal component 
A Github lookalike calender svelte component

Demo: [de-neef.net/gitlog](https://de-neef.net/gitlog)

Based upon: 
- [svelte-ts-component-template](https://github.com/patrickroberts/svelte-ts-component-template) but updated
- which in turn is based upon the [svelte component template](https://github.com/sveltejs/component-template)

## Install

```bash
npm install --save-dev svelte-gitcal
```

## Example usage with the colors as used on my demo page:

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
  <GitCal 
    gitlog={data} 
    months="12" 
    styles={{
      commits0: '#6B7280',
      commits1: '#9FA4AE',
      commits2: '#BFC2C9',
      commits3: '#EAEBED',
      commits4: '#FFFFFF',
      'text-fill': '#F9FAFB'
    }}
  />
{/await}
```

The calendar lists the number of commits in 4 categories, based upon the max commits per day for the entire period, so commit colors are relative to the max nr of commits (hence the not to clear legend ;-) )

## Styles:
- commits0: no commits
- commits1: some commits
- commits2: more commits
- commits3: a lot
- text-fill: fill style for legend and month texts
- text-size: font-size for legend and month texts



