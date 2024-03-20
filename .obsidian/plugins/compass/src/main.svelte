<script>
  import CompassClient from '@idkfelix/compass.js'
  import '@idkfelix/compass.js/src/types/accounts'
  import '@idkfelix/compass.js/src/types/calendar'

  export let sessionId
  export let domain
  let date = new Date()

  /** @type {Promise<CalendarResponse>} */
  let data = incrementDate(0)
  /** @type {{userInfo:AccountResponse,userId:number,domain:string,Calendar:any}}*/
  let client

  async function incrementDate(offset) {
    date = new Date(date)
    date.setDate(date.getDate() + offset)
    let local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    data = fetchData(local.toISOString().slice(0,10))
    return data
  }

  async function fetchData(date) {
    client = await CompassClient(domain,'ASP.NET_SessionId='+sessionId)
    let periods = await client.Calendar.getCalendarEventsByUser(client.userId, date, date)
    return periods.sort((a,b) => a.period - b.period)
  }

  $: {data = incrementDate(0)}
</script>

<div class="compass-container">
  <h2>{date.toDateString()}</h2>
  <button on:click={()=>{incrementDate(-1)}}>Previous</button>
  <button on:click={()=>{incrementDate(+1)}}>Next</button>

  {#await data}
    <h3>Loading...</h3>
  {:then periods}

    {#if !periods[0]}
      <h3>No Periods</h3>
    {/if}

    {#each periods as period}
      <div class="">
        {#if period.period}
        <div class="period">
          <p>{period.period} - {period.title} - {period.locations[0].locationName} - {period.managers[0].managerImportIdentifier}</p>

          <a href={`https://${client.domain}/Organise/Activities/Activity.aspx?targetUserId=${client.userId}#session/${period.instanceId}`} style="all: unset; margin-left: auto;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </a>
        </div>
        {/if}
      </div>
    {/each}

  {:catch}
    <h3>Error Fetching Data</h3>
  {/await}
</div>

<style>
  .compass-container{
    min-width: 250px;
    max-width: 400px;

    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-top: 5px;
    padding: 10px;

    text-align: center;
  }

  button{
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 20px;
    width: 80px;
  }

  .period{
    background: var(--code-background);
    border-radius: 5px;
    height: 40px;
    padding: 10px;
    padding-right: 15px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }

  svg{
    margin-top: 5px;
  }
</style>
