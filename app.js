const habbitsCards = document.querySelector('#habbits-cards')
const habbitModal = document.querySelector('#habbit-modal')
const backdrop = document.querySelector('#modal-backdrop')
const sortSelector = document.querySelector('#sort')

habbitsCards.addEventListener('click', clickHabbitCard)
backdrop.addEventListener('click', closeModal)

sortSelector.addEventListener('change', sorthabbits)

const formForHabbit = document.querySelector('#form-for-habbit')
formForHabbit.addEventListener('submit', addHabbit)

const APP_TITLE = document.title
const LS_KEY = 'habbits'

let habbits = getLocal()

renderHtmlList()

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

function toCard(habbit, index) {
  return `
    <div class="habbit-card" data-id="${index}">
      <div class="card">
        <div class="top">
          <div class="description">${habbit.description}</div>
          <button class="btn ${habbit.progress >= 21 ? 'hide' : ''}" onclick="DayDoneHabbit(${index})">Done</button>
        </div>
        <div class="bottom">
          <p class="post-day">${habbit.date}</p>
          <button class="btn" onclick="deleteHabbit(${index})">Delete</button>
        </div>
      </div>
      <div class="progress-bar">
        <div class="habbit-type">${habbit.type}</div>
        <div class="progress-value"></div>
      </div>
    </div>
  `
}

function clickHabbitCard(event) {
  const item = event.target
  const itemId = findId(item)
  const habbit = habbits[itemId]

  if(!habbit) return

  openModal(toModal(habbit), habbit.description)
  renderModalHabbitProgress(itemId)
}

function findId(item) {
  const itemId = item.dataset.id

  return (itemId) ? itemId : findId(item.parentElement)
}

function openModal(html, title = APP_TITLE) {
  document.title = `${title} | ${APP_TITLE}`
  habbitModal.innerHTML = html
  habbitModal.classList.add('open')
}

function toModal(habbit) {
  return `
    <h2>${habbit.description}</h2>
    <p>Type: ${habbit.type}</p>
    <hr>
    <div class="progress-bar modal">
        <div class="progress-value modal" id="progress-value-modal"></div>
    </div>
  `
}

function renderModalHabbitProgress(index) {
  const progressModalValue = document.querySelector('#progress-value-modal')
  progressModalValue.style.width = habbits[index].progress * 4.7619047619 + "%"

  if(habbits[index].progress === 0) {
    return
  } else {
    progressModalValue.textContent = habbits[index].progress + ' d'
  }
}

function closeModal(event) {
  document.title = APP_TITLE
  habbitModal.classList.remove('open')
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

function isInvalid(title) {
  return !title.value
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

function sorthabbits() {
  console.log('changed')
  const sortType = sortSelector.value
  const collatore = new Intl.Collator()

  if (sortType === 'progress') {
    habbits.sort((a, b) => b.progress - a.progress)
  } else if (sortType === 'type') {
    habbits.sort((a, b) => collatore.compare(a.type, b.type))
  } else if (sortType === 'date') {
    habbits.sort((a, b) => collatore.compare(a.date, b.date))
  }
  // habbits.sort((a, b) => {
  //   // console.log(sortType)
  //   // console.log(`change to ${sort.value}`)
  //   // return (a.sortType) - (b.sortType)
  //   return a.progress - b.progress
  // })

  // console.log('alert!')
  // console.log(habbits)
  saveLocal()
  renderHtmlList()
}