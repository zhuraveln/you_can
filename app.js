const habbitsCards = document.querySelector('#habbits-cards')
const habbitModal = document.querySelector('#habbit-modal')
const backdrop = document.querySelector('#backdrop')

habbitsCards.addEventListener('click', targetHabbitCard)
backdrop.addEventListener('click', closeModal)

const formForHabbit = document.querySelector('#form-for-habbit')

formForHabbit.addEventListener('submit', addHabbit)

const APP_TITLE = document.title
const LS_KEY = 'habbits'

let habbits = getLocal()


function targetHabbitCard(event) {
  const data = event.target.dataset.id
  const habbit = habbits[data]

  if(!habbit) return

  openModal(toModal(habbit), habbit.description)
}

function openModal(html, title = APP_TITLE) {
  document.title = `${title} | ${APP_TITLE}`
  habbitModal.innerHTML = html
  habbitModal.classList.add('open')
}

function closeModal(event) {
  document.title = APP_TITLE
  habbitModal.classList.remove('open')
}

function toModal(habbit) {
  return `
    <h2>${habbit.description}</h2>
    <p>${habbit.type}</p>
    <hr>
  `
}

function toCard(habbit, index) {
  return `
    <div class="habbit-card" data-id="${index}">
      <div class="card">
        <div class="top">
          <div class="description">${habbit.description}</div>
          <button class="btn-day-done ${habbit.progress >= 21 ? 'hide' : ''}" onclick="DayDoneHabbit(${index})">Done</button>
        </div>
        <div class="bottom">
          <p class="post-day">${habbit.date}</p>
          <button class="btn-delete" onclick="deleteHabbit(${index})">Delete</button>
        </div>
      </div>
      <div class="progress-bar">
        <div class="habbit-type">${habbit.type}</div>
        <div class="progress-value"></div>
      </div>
    </div>
  `
}

// const filterhabbits = () => {
//   const activehabbits =
//     habbits.length && habbits.filter((item) => item.completed === false)
//   const completedhabbits =
//     habbits.length && habbits.filter((item) => item.completed === true)
//   habbits = [...activehabbits, ...completedhabbits]
// }

function renderHtmlList() {
  renderHabbitsCards()
}

function renderHabbitsCards() {
  if (habbits.length === 0) {
    habbitsCards.innerHTML = `<p class="empty">You have not tracked habbit, add</p>`
  } else {
    let html = ''

    habbits.forEach((item, index) => {
      html += toCard(item, index)
    })
    habbitsCards.innerHTML = html
    renderHabbitsProgress()
  }
}

function renderHabbitsProgress() {
  const progressValue = document.querySelectorAll('.progress-value')
  progressValue.forEach((item, index) => {
    item.style.width = habbits[index].progress * 4.7619047619 + "%"

    if(habbits[index].progress === 0) {
      return
    } else {
      item.textContent = habbits[index].progress + ' d'
    }
  })
}

function Habbit(description, type) {
  this.description = description
  this.type = type
  this.progress = 0
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

function isInvalid(title) {
  return !title.value
}

function addHabbit(event) {
  event.preventDefault()

  const {title, type} = event.target

  if (isInvalid(title)) {
    if (!title.value) title.classList.add('invalid')

    setTimeout(() => {
      title.classList.remove('invalid')
    }, 2000)

    return
  }

  habbits.push(new Habbit(title.value, type.value))

  title.value = ''
  saveLocal()
  renderHtmlList()
}

function DayDoneHabbit(index) {
  habbits[index].progress++

  saveLocal()
  renderHtmlList()
}

function deleteHabbit(index) {
  habbits.splice(index, 1)
  saveLocal()
  renderHtmlList()
}

function saveLocal () {
  localStorage.setItem(LS_KEY, JSON.stringify(habbits))
}

function getLocal () {
  const raw = localStorage.getItem(LS_KEY)
  return raw ? JSON.parse(raw) : []
}

renderHtmlList()