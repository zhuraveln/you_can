const sortSelector = document.querySelector('#sort')
const btnRandom = document.querySelector('#btn-random')
const habbitsCards = document.querySelector('#habbits-cards')
const progressValue = document.querySelectorAll('.progress-value')
const btnEdit = document.querySelectorAll('#btn-edit')
const btnEditDel = document.querySelector('#btn-edit-del')
const btnDone = document.querySelectorAll('#btn-done')
const editModal = document.querySelector('#habbit-modal-edit')
const backdrop = document.querySelector('#modal-backdrop')

habbitsCards.addEventListener('click', clickHabbitCard)
backdrop.addEventListener('click', closeModal)

sortSelector.addEventListener('change', sorthabbits)

const formForHabbit = document.querySelector('#form-for-habbit')
const formForEdit = document.querySelector('#form-for-edit')

btnRandom.addEventListener('click', () => {
  fetch('/random')
    .then(res => res.json())
    .then(data => randromHabbit(dasta))

})

// btnRandom.addEventListener('click', () => {
//   fetch('https://trash-habbits-maker.herokuapp.com/api')
//     .then(res => res.json())
//     .then(data => randromHabbit(data))
// })

function randromHabbit(arr) {
  const randromHabbit = getRandom(arr)

  formForHabbit[0].value = randromHabbit.title
  formForHabbit[1].value = randromHabbit.type
}

function getRandom(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length)

  return arr[randomNumber]
}

function clickHabbitCard(event) {
  const item = event.target
  const itemId = findId(item)
  if (!itemId) return
  const habbit = getCard()

  function getCard() {
    for (i = 0; i <= habbitsCards.children.length; i++) {
      if (habbitsCards.children[i].dataset.id === itemId) {
        return habbitsCards.children[i]
      }
    }
  }

  if (!habbit) return

  if (habbit.children[0].className === 'top-card') {
    habbit.children[0].classList.add('open')
    habbit.style.height = '155px'
  } else {
    habbit.children[0].classList.remove('open')
    habbit.style.height = '120px'
  }
}

function findId(item) {
  if (item.localName === "button" || item.className === "habbits-cards") {
    return
  }

  const itemId = item.dataset.id
  return (itemId) ? itemId : findId(item.parentElement)
}

btnEdit.forEach((item) => {
  item.addEventListener('click', (event) => {
    const item = event.target
    const itemId = findIdEdit(item)
    editModal.classList.add('open')
    backdrop.style.display = 'block'

    fetch(`/edit/${itemId}`)
      .then(res => res.json())
      .then(data => {
        formForEdit[0].value = data.title
        formForEdit[1].value = data.type
        formForEdit.action = `/edit/${itemId}?_method=PUT`
      })

    btnEditDel.addEventListener('click', () => {
      fetch(`/${itemId}`, {
        method: 'DELETE'
      })
        .then(() => {
          window.location.reload()
        })
    })
  })
})

function findIdEdit(item) {
  const itemId = item.dataset.id
  return (itemId) ? itemId : findId(item.parentElement)
}

function closeModal() {
  backdrop.style.display = 'none'
  editModal.classList.remove('open')

  formForEdit[0].value = ''
  formForEdit[1].value = ''
}

function renderHabbitsProgress() {
  progressValue.forEach((item) => {
    const progress = item.dataset.progress
    item.style.width = progress * 4.7619047619 + "%"

    if (progress === 0) {
      return
    } else {
      item.textContent = progress + ' d'
    }
  })
}

renderHabbitsProgress()

btnDone.forEach((item) => {
  item.addEventListener('click', (event) => {
    const item = event.target
    const itemId = findIdEdit(item)

    fetch(`/done/${itemId}`, {
      method: 'PUT'
    })
      .then(() => {
        window.location.reload()
      })
  })
})

function sorthabbits() {
  const type = sortSelector.value

  fetch(`/${type}`, {
    method: 'GET'
  })
    .then(() => console.log('Finish!'))
}

  // const collatore = new Intl.Collator()

  // if (sortType === 'progress') {
  //   habbits.sort((a, b) => b.progress - a.progress)
  // } else if (sortType === 'type') {
  //   habbits.sort((a, b) => collatore.compare(a.type, b.type))
  // } else if (sortType === 'date') {
  //   habbits.sort((a, b) => collatore.compare(b.date, a.date))
  // }
