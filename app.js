const habbitsCards = document.querySelector('#habbits-cards')
const habbitModal = document.querySelector('#habbit-modal')
const backdrop = document.querySelector('#modal-backdrop')
const sortSelector = document.querySelector('#sort')
const editModal = document.querySelector('#habbit-modal-edit')

habbitsCards.addEventListener('click', clickHabbitCard)
backdrop.addEventListener('click', closeModal)

sortSelector.addEventListener('change', sorthabbits)

const formForHabbit = document.querySelector('#form-for-habbit')
const formForEdit = document.querySelector('#form-for-edit')

formForHabbit.addEventListener('submit', addHabbit)
formForHabbit[2].addEventListener('click', randromHabbit)
formForEdit.addEventListener('submit', editHabbit)

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
      <div class="top-card">
          <div class="habbit-type">${habbit.type}</div>
          <div class="description">${habbit.title}</div>
          <button class="btn delete" onclick="deleteHabbit(${index})">Delete</button>
          <button class="btn edit" onclick="openEditModal(${index})">Edit</button>
          <div class="post-day">${habbit.date}</div>
      </div>
      <div class="bottom-card">
        <button class="btn done ${habbit.progress >= 21 ? 'hide' : ''}"
        onclick="DayDoneHabbit(${index})">Done</button>
        <div class="progress-bar">
          <div class="progress-value"></div>
        </div>
      </div>
    </div>
  `
}

function clickHabbitCard(event) {
  const item = event.target
  const itemId = findId(item)
  const habbit = habbits[itemId]

  if(!habbit) return

  if (habbitsCards.children[itemId].className === 'habbit-card') {
    habbitsCards.children[itemId].classList.add('open')
    habbitsCards.children[itemId].style.height = '155px'
  } else {
    habbitsCards.children[itemId].classList.remove('open')
    habbitsCards.children[itemId].style.height = '120px'
  }
  

  // openModal(toModal(habbit), habbit.title)
  // renderModalHabbitProgress(itemId)
}

function findId(item) {
  if (item.localName === "button") {
    return
  }

  const itemId = item.dataset.id
  return (itemId) ? itemId : findId(item.parentElement)
}

// function openModal(html, title = APP_TITLE) {
//   document.title = `${title} | ${APP_TITLE}`
//   habbitModal.innerHTML = html
//   habbitModal.classList.add('open')
//   backdrop.style.display = 'block'
// }

// function toModal(habbit) {
//   return `
//     <h2>${habbit.title}</h2>
//     <p>Type: ${habbit.type}</p>
//     <hr>
//     <div class="progress-bar modal">
//         <div class="progress-value modal" id="progress-value-modal"></div>
//     </div>
//   `
// }

// function renderModalHabbitProgress(index) {
//   const progressModalValue = document.querySelector('#progress-value-modal')
//   progressModalValue.style.width = habbits[index].progress * 4.7619047619 + "%"

//   if(habbits[index].progress === 0) {
//     return
//   } else {
//     progressModalValue.textContent = habbits[index].progress + ' d'
//   }
// }

function closeModal(event) {
  document.title = APP_TITLE

  backdrop.style.display = 'none'
  // habbitModal.classList.remove('open')
  editModal.classList.remove('open') 
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
  sorthabbits()
  saveLocal()
  renderHtmlList()
}

function isInvalid(title) {
  return !title.value
}

function Habbit(title, type) {
  this.title = title
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

  sorthabbits()
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
  const sortType = sortSelector.value
  const collatore = new Intl.Collator()

  if (sortType === 'progress') {
    habbits.sort((a, b) => b.progress - a.progress)
  } else if (sortType === 'type') {
    habbits.sort((a, b) => collatore.compare(a.type, b.type))
  } else if (sortType === 'date') {
    habbits.sort((a, b) => collatore.compare(b.date, a.date))
  }

  saveLocal()
  renderHtmlList()
}

function openEditModal(index) {
  document.title = `${habbits[index].title} | ${APP_TITLE}`
  habbitIndexEdit = index

  formForEdit[0].value = habbits[index].title
  formForEdit[1].value = habbits[index].type
  
  editModal.classList.add('open')
  backdrop.style.display = 'block'
}

let habbitIndexEdit

function editHabbit(event) {
  event.preventDefault()

  const {title, type} = event.target

  if (isInvalid(title)) {
    if (!title.value) title.classList.add('invalid')

    setTimeout(() => {
      title.classList.remove('invalid')
    }, 2000)

    return
  }

  habbits[habbitIndexEdit].title = title.value
  habbits[habbitIndexEdit].type = type.value

  closeModal()

  sorthabbits()
  saveLocal()
  renderHtmlList()
}

const randomHabbits = [
  {title: 'Плавать в ванной', type: 'Sport'},
  {title: 'Закаляться в морозилке', type: 'Health'},
  {title: 'Говорить задом наперед', type: 'Skills'},
  {title: 'Разводить мух', type: 'Hobby'},
  {title: 'Наладить связь с космосом', type: 'Mind'},
]

function randromHabbit() {
  const randromHabbit = getRandom(randomHabbits)

  formForHabbit[0].value = randromHabbit.title
  formForHabbit[1].value = randromHabbit.type
}

function getRandom(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length)

  return arr[randomNumber]
}