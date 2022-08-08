<script>
  import { base } from '$app/paths';
  const navBarButtonClases = "w-fit rounded-full hover:bg-gray-700 text-white hover:shadow-lg \
    py-1 px-2 font-bold ease-linear duration-150"
</script>
<div class="flex flex-row justify-start bg-gray-800 p-2 space-x-2">
  <a class={navBarButtonClases} href="{base}/">Home</a>
  <a class={navBarButtonClases} href="{base}/week_schedule">Week Shedule</a>
  <a class={navBarButtonClases} href="{base}/loan">Loan</a>
</div>
