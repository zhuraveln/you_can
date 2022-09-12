const habbitsCards = document.querySelector('.habbits-cards')

const formForHabbit = document.querySelector('#form-for-habbit')

formForHabbit.addEventListener('submit', addHabbit)

const HB_KEY = 'habbits'

let habbits = getLocal()


function toCard(habbit, index) {
  return `
        <div class="habbit-card ${habbit.completed ? 'checked' : ''}">
            <div class="top">
                <div class="description">${habbit.description}</div>
                <div class="top-buttons">
                    <input onclick="completehabbit(${index})" type="checkbox" 
                    class="btn-complete" ${habbit.completed ? 'checked' : ''}>
                    <button onclick="changehabbit(${index})" class="btn-change">Change</button>
                </div>
            </div>
            <div class="bottom">
                <p class="post-day">${habbit.date}</p>
                <button onclick="deleteHabbit(${index})" class="btn-delete">Delete</button>
            </div>
        </div>`
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
  // renderHabbitsProgress()
}

function renderHabbitsCards() {
  if (habbits.length === 0) {
    habbitsCards.innerHTML = `<p>You have not tracked habbit, add</p>`
  } else {
    let html = ''
    // filterhabbits()

    habbits.forEach((item, index) => {
      html += toCard(item, index)
    })
    habbitsCards.innerHTML = html
    // habbits = document.querySelectorAll('.habbit-card')
  }
}

// renderHabbitsProgress()

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

function isInvalid(title) {
  return !title.value
}

function addHabbit(event) {
  event.preventDefault()

  const {title} = event.target

  if (isInvalid(title)) {
    if (!title.value) title.classList.add('invalid')

    setTimeout(() => {
      title.classList.remove('invalid')
    }, 2000)

    return
  }

  habbits.push(new Habbit(title.value))

  title.value = ''
  saveLocal()
  renderHtmlList()
}

function completehabbit(index) {
  habbits[index].completed = !habbits[index].completed
  if (habbits[index].completed) {
    habbits[index].classList.add('checked')
  } else {
    habbits[index].classList.remove('checked')
  }
  saveLocal()
  renderHtmlList()
}

function changehabbit(index) {
  if (
    habbits[index].children[1].children[1].classList.value ===
    'btn-delete hide'
  ) {
    habbits[index].children[1].children[1].classList.remove('hide')
    habbits[index].children[0].children[1].children[1].classList.add(
      'clicked'
    )
  } else {
    habbits[index].children[1].children[1].classList.add('hide')
    habbits[index].children[0].children[1].children[1].classList.remove(
      'clicked'
    )
  }
}

function deleteHabbit(index) {
  // habbitss[index].classList.add('delition')

  // setTimeout(() => {
  //     habbits.splice(index, 1)
  //     saveLocal()
  //     renderHtmlList()
  // }, 500)

  habbits.splice(index, 1)
  saveLocal()
  renderHtmlList()
}

function saveLocal () {
  localStorage.setItem(HB_KEY, JSON.stringify(habbits))
}

function getLocal () {
  const raw = localStorage.getItem(HB_KEY)
  return raw ? JSON.parse(raw) : []
}

renderHtmlList()