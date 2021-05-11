<script lang="ts">
  // generate gitlogfile:
  // $> git log --date=short --pretty=format:%ad | sort | uniq -c > git.log

  type Styles = { [id: string]: string }
  export let gitlog: string
  export let styles: Styles = {}
  export let months: string = '6'

  const _styles: Styles = {
    commits0: 'rgb(22,27,34)',
    commits1: 'rgb(14,68,41)',
    commits2: 'rgb(0,109,50)',
    commits3: 'rgb(38, 166, 65)',
    commits4: 'rgb(57, 211, 83)',
    'text-fill': 'rgb(201,209,217)',
    'text-size': 'xx-small',
    ...styles,
  }

  let days: { date: Date; commits: number }[] = []
  let loading = true
  let maxCommits = 0
  let totalCommits = 0

  const _gitlog: { [id: string]: number } = gitlog
    .split('\n')
    .map(d => d.match(/\s+(\d+)\s+(\d{4}-\d{2}-\d{2})/))
    .reduce((a, c) => ({ ...a, ...(c && { [c[2]]: c[1] }) }), {})

  const setStyles = (node: HTMLElement | SVGElement, styles: object) => {
    Object.entries(styles).forEach(([key, value]) => {
      node.style.setProperty(key, value)
    })
  }

  // calculate start and stop date
  const calEnd = new Date()
  calEnd.setDate(calEnd.getDate() - 1)
  const calStart = new Date(
    calEnd.getFullYear(),
    calEnd.getMonth() - Number(months),
    1
  )
  calStart.setDate(-calStart.getDay() + 1)

  // format days
  for (let date = calStart; date < calEnd; date.setDate(date.getDate() + 1)) {
    const day =
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getDate()).slice(-2)
    const commits = _gitlog[day] || 0
    if (commits > maxCommits) maxCommits = commits
    totalCommits += Number(commits)
    days.push({
      date: new Date(date),
      commits,
    })
  }
  loading = false

  const commits = (c: number) => {
    if (c === 0) return 'commits0'
    if (c / maxCommits <= 0.2) return 'commits1'
    if (c / maxCommits <= 0.6) return 'commits2'
    if (c / maxCommits <= 0.8) return 'commits3'
    return 'commits4'
  }
</script>

{#if loading}
  Loading ..
{:else}
  <svg width={((days.length / 7) | 0) * 12 + 12} height={7 * 12 + 2 * 14}>
    <g>
      {#each days as day, index}
        {#if day.date.getDate() === 1}
          <text
            use:setStyles={{
              fill: _styles['text-fill'],
              'font-size': _styles['text-size'],
            }}
            class="text"
            x={((index / 7) | 0) * 12}
            y="10"
          >
            {day.date.toLocaleString('default', { month: 'short' })}
            {#if !day.date.getMonth()}
              -{day.date.getFullYear() % 100}
            {/if}
          </text>
        {/if}
        <rect
          fill={_styles[commits(day.commits)]}
          width="10"
          height="10"
          x={((index / 7) | 0) * 12}
          y={day.date.getDay() * 12 + 14}
          rx="2"
          ry="2"
        >
          <title>
            {day.date.toDateString()} - {day.commits === 0
              ? 'no '
              : day.commits}
            commit{day.commits !== 1 ? 's' : ''}
          </title>
        </rect>
      {/each}
      <text
        use:setStyles={{
          fill: _styles['text-fill'],
          'font-size': _styles['text-size'],
        }}
        class="text"
        x="0"
        y={14 + 7 * 12 + 10}
      >
        less
      </text>
      {#each [0, 1, 2, 3, 4] as index}
        {index}
        <rect
          fill={_styles['commits' + index]}
          width="10"
          height="10"
          x={24 + index * 12}
          y={14 + 7 * 12 + 2}
          rx="2"
          ry="2"
        />
      {/each}
      <text
        use:setStyles={{
          fill: _styles['text-fill'],
          'font-size': _styles['text-size'],
        }}
        class="text"
        x={24 + 5 * 12 + 6}
        y={14 + 7 * 12 + 10}
      >
        more
      </text>
      <text
        use:setStyles={{
          fill: _styles['text-fill'],
          'font-size': _styles['text-size'],
        }}
        class="text"
        x={24 + 9 * 12 + 6}
        y={14 + 7 * 12 + 10}
      >
        max commits: {maxCommits} total commits: {totalCommits}
      </text>
    </g>
  </svg>
{/if}
