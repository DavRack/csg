import { all_courses } from "src/data/clases.js"
export function getColor(code, group){
  const colors = [
    "rgb(228 113 93)",
    "rgb(231 146 40)",
    "rgb(231 191 16)",
    "rgb(230 204 1)",
    "rgb(143 230 33)",
    "rgb(108 140 228)",
    "rgb(146 139 230)",
    "rgb(171 132 232)",
    "rgb(211 121 229)",
    "rgb(223 114 162)",
    "rgb(230 113 113)",
    "rgb(54 202 108)",
    "rgb(32 191 133)",
    "rgb(25 192 171)",
    "rgb(14 191 218)",
    "rgb(36 169 228)",
    "rgb(76 145 230)",
  ]
  let index = all_courses.findIndex(
    course => course.code === code && course.group === group
  )
  let color_index = index%colors.length
  return colors[color_index]
}

function day_clases(day, course_clases){
  let day_clases = []
  for (const course of course_clases){
    let course_clases = course["clases"].filter(
      clas => clas.day === day
    )
    for (const clas of course_clases){
      let complete_clas = {
        ...clas,
        ...course
      }
      delete complete_clas.clases
      day_clases.push(complete_clas)
    }
  }
  day_clases = day_clases.sort((a, b) => {
    return a.start_hour - b.start_hour
  })
  return day_clases
}

function hoursOverlap(class1, class2){
  if(class2.start_hour>class1.start_hour && class2.start_hour<class1.end_hour){
    return true
  }

  if(class2.end_hour>class1.start_hour && class2.end_hour<class1.end_hour){
    return true
  }

  if (class2.end_hour===class1.end_hour && class2.start_hour===class1.start_hour){
    return true
  }

  return false
}

function clasesOverlap(class1, class2){
  if (class1.day !== class2.day){
    return false
  }

  if(hoursOverlap(class1, class2) || hoursOverlap(class2, class1)){
    return true
  }

  return false
}

function coursesOverlap(courses1, courses2){
  let clases1 = courses1.clases
  let clases2 = courses2.clases

  for (const class1 of clases1){
    for (const class2 of clases2){
      if(clasesOverlap(class1, class2)){
        return true
      }
    }
  }
  return false
}

function coursesOverlapAll(allCourses, course){
  for(const c of allCourses){
    if (coursesOverlap(c, course)){
      return true
    }
  }
  return false
}

function sameCourse(course1, course2){
  return course1.code == course2.code && course1.group == course2.group
}

function sameClases(clases1, clases2){
  if(clases1.length !== clases2.length){
    return false
  }

  for(const clas1 of clases1){
    let index = clases2.findIndex(
      clas2 => sameCourse(clas1, clas2)
    )

    if (index === -1){
      return false
    }
  }
  return true
}

function removeRepeated(nonOverlapingCourses){
  return nonOverlapingCourses.filter(
    (clases, index) => nonOverlapingCourses.findIndex( clasess => sameClases(clases, clasess)) === index
  )
}

export function getNonOverlapingCourses(courses){
  if(courses.length === 0){
    return []
  }

  let nonOverlapingClases = []
  let currentNonOverlapingClases = []

  for (let i = 0; i<courses.length; i++){
    let overlap = false
    for (let j=0; j<currentNonOverlapingClases.length; j++){
      if(coursesOverlap(courses[i], currentNonOverlapingClases[j])){
        let index = courses.findIndex(
          course => sameCourse(course,currentNonOverlapingClases[j])
        )
        let newCourses = [...courses.slice(0,index), ...courses.slice(index+1)]
        nonOverlapingClases.push(
          ...getNonOverlapingCourses(newCourses)
        )
        overlap = true
        break
      }
    }
    if(overlap){
      continue
    }
    currentNonOverlapingClases.push(courses[i])
  }

  if (currentNonOverlapingClases.length > 0){
    nonOverlapingClases.push(currentNonOverlapingClases)
  }

  nonOverlapingClases = removeRepeated(nonOverlapingClases)

  return nonOverlapingClases
}
