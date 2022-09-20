const habbitsCards = document.querySelector('#habbits-cards')

const formForTrashHabbit = document.querySelector('#form')

formForTrashHabbit.addEventListener('submit', addHabbit)

const LS_KEY = 'trash_habbits'

let trashHabbits = getLocal()

renderHtmlList()

function renderHtmlList() {
  renderHabbitsCards()
}

function renderHabbitsCards() {
  if (trashHabbits.length === 0) {
    habbitsCards.innerHTML = `<p class="empty">You have trash habbits, add</p>`
  } else {
    let html = ''

    trashHabbits.forEach((item, index) => {
      html += toCard(item, index)
    })
    habbitsCards.innerHTML = html
  }
}

function toCard(habbit, index) {
  return `
    <div class="habbit-card" data-id="${index}">
      <div class="title">${habbit.title}</div>
      <div class="type">${habbit.type}</div>
    </div>
  `
}

function addHabbit(event) {
  event.preventDefault()

  const {title, type} = event.target

  // if (isInvalid(title)) {
  //   if (!title.value) title.classList.add('invalid')

  //   setTimeout(() => {
  //     title.classList.remove('invalid')
  //   }, 2000)

  //   return
  // }

  trashHabbits.push(new Habbit(title.value, type.value))

  title.value = ''
  saveLocal()
  renderHtmlList()
}

function isInvalid(title) {
  return !title.value
}

function Habbit(title, type) {
  this.title = title
  this.type = type
}

// function deleteHabbit(index) {
//   habbits.splice(index, 1)

//   saveLocal()
//   renderHtmlList()
// }

function saveLocal () {
  // localStorage.setItem(LS_KEY, JSON.stringify(trashHabbits))
}

function getLocal () {
  // const raw = localStorage.getItem(LS_KEY)
  // return raw ? JSON.parse(raw) : []
}