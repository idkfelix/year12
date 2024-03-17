<script>
  import CompassClient from "@idkfelix/compass.js";
  import "@idkfelix/compass.js/src/types/accounts"
  import { onMount } from "svelte";
  
  /** @type {AccountResponse} */
  let data
  onMount(async()=>{
    const client = await CompassClient('mullauna-vic.compass.education','ASP.NET_SessionId=531d2bed-d7b2-4a62-a0b0-80221090818b')
  })
</script>

<h1>{data?.name}</h1>