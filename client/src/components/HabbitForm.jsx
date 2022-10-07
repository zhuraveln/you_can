import React, { useEffect, useState } from 'react'
import axios from 'axios';

const HabbitForm = ({ create }) => {
  const [habbit, setHabbit] = useState({ title: '', type: 'Health' })
  const [trashHabbits, setTrashHabbits] = useState([])

  const addNewHabbit = (e) => {
    e.preventDefault()

    const newHabbit = {
      ...habbit,
      id: Date.now(),
      progress: 0,
      dateAd: Date.now().toLocaleString(),
    }

    create(newHabbit)

    setHabbit({ title: '', type: habbit.type })
  }

  useEffect(() => {
    fetchTrashHabbit()
  }, [])

  const fetchTrashHabbit = async () => {
    const response = await axios.get('https://trash-habbits-maker.herokuapp.com/api')
    setTrashHabbits(response.data)
  }

  const randomTrashHabbit = () => {
    const rth = random(trashHabbits)
    setHabbit({ title: rth.title, type: rth.type })
  }

  function random(arr) {
    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber]
  }

  return (
    <form className="form-for-habbit">
      <h2 className="heading form">Add habbit</h2>
      <div className="input-area">
        <input
          type="text"
          className="form-control"
          placeholder="Input title"
          value={habbit.title}
          onChange={e => setHabbit({ ...habbit, title: e.target.value })}
        />
        <select
          className="btn type"
          value={habbit.type}
          onChange={e => setHabbit({ ...habbit, type: e.target.value })}
        >
          <option value="Health">Health</option>
          <option value="Sport">Sport</option>
          <option value="Skills">Skills</option>
          <option value="Hobby">Hobby</option>
          <option value="Mind">Mind</option>
        </select>
      </div>
      <button onClick={randomTrashHabbit} type="button" className="btn random">Random</button>
      <button onClick={addNewHabbit} className="btn create">Create</button>
    </form>
  )
}

export default HabbitForm