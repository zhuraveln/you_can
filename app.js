// const deskTaskInput = document.querySelector('#description-task')
// const addTaskBtn = document.querySelector('#add-task-btn')
const todosWrapper = document.querySelector('.todos-wrapper')

const formForHabbit = document.querySelector('#form-for-habbit')

formForHabbit.addEventListener('submit', addHabbit)

let tasks = []

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let toDoItemElem = []

function Habbit(description) {
  this.description = description
  this.completed = false
  this.date = getDate()
}

function getDate(t = new Date()) {
  function addZero(d) {
    return d < 10 ? '0' + d : d
  }

  const Y = t.getFullYear()
  const M = addZero(t.getMonth() + 1)
  const D = addZero(t.getDate())
  const h = addZero(t.getHours())
  const m = addZero(t.getMinutes())

  const days = [
    'Воскрсенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ]

  const d = days[t.getDay()]

  return `${D}.${M}.${Y} ${h}:${m} (${d})`
}

const createTemplate = (task, index) => {
  return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="top">
                <div class="description">${task.description}</div>
                <div class="top-buttons">
                    <input onclick="completeTask(${index})" type="checkbox" 
                    class="btn-complete" ${task.completed ? 'checked' : ''}>
                    <button onclick="changeTask(${index})" class="btn-change">Change</button>
                </div>
            </div>
            <div class="bottom">
                <p class="post-day">${task.date}</p>
                <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </div>`
}

const filterTasks = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed === false)
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed === true)
  tasks = [...activeTasks, ...completedTasks]
}

const fillHtmlList = () => {
  todosWrapper.innerHTML = ''
  if (tasks.length > 0) {
    filterTasks()
    tasks.forEach((item, index) => {
      todosWrapper.innerHTML += createTemplate(item, index)
    })
    toDoItemElem = document.querySelectorAll('.todo-item')
  }
}

fillHtmlList()

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed
  if (tasks[index].completed) {
    toDoItemElem[index].classList.add('checked')
  } else {
    toDoItemElem[index].classList.remove('checked')
  }
  updateLocal()
  fillHtmlList()
}

function addHabbit(event) {
  event.preventDefault()

  const {title} = event.target

  tasks.push(new Habbit(title.value))

  title.value = ''
  updateLocal()
  fillHtmlList()
}

// function addTask() {
//   tasks.push(new Task(deskTaskInput.value))
//   updateLocal()
//   fillHtmlList()
//   deskTaskInput.value = ''
// }

// addTaskBtn.addEventListener('click', () => {
//   addTask()
// })

// deskTaskInput.addEventListener('keydown', (event) => {
//   if (event.key === 'Enter') {
//     addTask()
//   }
// })

function changeTask(index) {
  if (
    toDoItemElem[index].children[1].children[1].classList.value ===
    'btn-delete hide'
  ) {
    toDoItemElem[index].children[1].children[1].classList.remove('hide')
    toDoItemElem[index].children[0].children[1].children[1].classList.add(
      'clicked'
    )
  } else {
    toDoItemElem[index].children[1].children[1].classList.add('hide')
    toDoItemElem[index].children[0].children[1].children[1].classList.remove(
      'clicked'
    )
  }
}

const deleteTask = (index) => {
  // toDoItemElems[index].classList.add('delition')

  // setTimeout(() => {
  //     tasks.splice(index, 1)
  //     updateLocal()
  //     fillHtmlList()
  // }, 500)

  tasks.splice(index, 1)
  updateLocal()
  fillHtmlList()
}