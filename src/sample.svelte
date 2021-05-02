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
