<script>
import { all_courses } from "src/data/clases.js"
import { getNonOverlapingCourses, getColor } from "src/apps/week_schedule/createShedule.js"

let days = [
  {id: 1, selected: true, label:"Monday"},
  {id: 2, selected: true, label:"Tuesday"},
  {id: 3, selected: true, label:"Wednesday"},
  {id: 4, selected: true, label:"Thursday"},
  {id: 5, selected: true, label:"Friday"},
  {id: 6, selected: true, label:"Saturday"},
]
const start_hour = 6
const end_hour = 20
let last_hour = 6
const hour_heigth = 2
let expand_class = {}


function getDayClases(courses, day){
  last_hour = start_hour
  let all_clases = courses.map(course => course.clases.map(_class => {
    let nClass = {
      ...course,
      ..._class,
      color: getColor(course.code, course.group),
    }
    delete nClass.clases
    return nClass
  }))
  all_clases = [].concat(...all_clases)
  all_clases = all_clases.filter(_class => _class.day === day)
  all_clases = all_clases.sort((a,b) => {
    return a.start_hour - b.start_hour
  })

  return all_clases
}
function setExpandClass(_class){
  expand_class = _class
}

let nonOverlapingCourses = []

function filterCourses(all_courses, days){
  let courses = [...all_courses]
  let selected_days = days.filter(day => day.selected)
  let filter_by_day = courses.filter(course => course.clases.every(
    _class => selected_days.some(day => day.id === _class.day)
  ))
  nonOverlapingCourses = getNonOverlapingCourses(filter_by_day)
}

</script>

<div class="flex flex-row justify-start m-2">
  <div class="p-4 border rounded-lg flex flex-row justify-start space-x-4">
    {#each days as day}
      <div class="flex flex-col align-center">
        <p>{day.label}</p>
        <input type=checkbox bind:checked={day.selected}/>
      </div>
    {/each}
  </div>
  <div
    on:click={()=>{filterCourses(all_courses, days)}}
    class="border rounded-lg p-2 align-middle hover:shadow-lg"
  >
    Filter
  </div>
</div>

{#each nonOverlapingCourses as courses}
  <div class="flex flex-row justify-evenly">
    <div class="flex flex-row grow m-10">
      <div class="flex divide-x flex-row w-3/5 border rounded-lg">
        {#each days as day}
          <div class="flex flex-col justify-start w-1/6 border">
            <p class="h-8 bg-blue-400 p-1 text-center font-bold text-white ">{day.label}</p>
            <div 
              style="height: {hour_heigth*(end_hour-start_hour)}rem"
              class="relative"
            >
              {#each getDayClases(courses, day.id) as _class}
                <div 
                  on:click={()=>{setExpandClass(_class)}}
                  class="absolute h-12 w-full text-white text-xs rounded p-0.5 ease-linear duration-150 hover:border-gray-500 hover:shadow-lg border-2 "
                  style="
                  top: {hour_heigth*(_class.start_hour - start_hour)}rem;
                  height: {hour_heigth*(_class.end_hour - _class.start_hour)}rem;
                  background-color: {_class.color};
                  "
                >
                  <p class="text-center p-auto">{_class.name}</p>
                  <p class="text-center p-auto">inicio: {_class.start_hour} - fin: {_class.end_hour}</p>
                  <p class="text-center p-auto">{_class.virtual? "Virtual" : ""}</p>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
      <div class="ml-10 mt-10 w-2/5 space-y-4">
        <div class="w-full border rounded-lg shadow p-8">
          <p>Nombre: {expand_class.name || ""}</p>
          <p>Código: {expand_class.code || ""}</p>
          <p>Grupo: {expand_class.group || ""}</p>
          <p>Creditos: {expand_class.credits || ""}</p>
          <p>Hora inicio: {expand_class.start_hour || ""}</p>
          <p>Hora fin: {expand_class.end_hour || ""}</p>
          <p>Salón: {expand_class.class_room || ""}</p>
          <p>Es virtual: {"virtual" in expand_class? expand_class.virtual : ""}</p>
        </div>
        <div class="grid grid-cols-5 divide-x divide-y border">
          <p class="text-center">Nombre</p>
          <p class="text-center">Código</p>
          <p class="text-center">Grupo</p>
          <p class="text-center">Creditos</p>
          <p class="text-center">Virtual</p>
          {#each courses as course}
            <p class="text-center">{course.name || ""}</p>
            <p class="text-center">{course.code || ""}</p>
            <p class="text-center">{course.group || ""}</p>
            <p class="text-center">{course.credits || ""}</p>
            <p class="text-center">{course.virtual? "si" : "no"}</p>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/each}
