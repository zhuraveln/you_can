import React, { useEffect, useState } from 'react'
import HabbitsFilter from './components/HabbitsFilter';
import HabbitForm from './components/HabbitForm';
import HabbitsList from './components/HabbitsList';
import NavBar from './components/NavBar';
import './styles/App.css'
import { useHabbits } from './hooks/useHabbits';
import axios from 'axios';


function App() {
  const [habbits, setHabbits] = useState([])

  const [filter, setFilter] = useState({ sort: 'createdAt', query: '' })
  const sortedAndSearchedHabbits = useHabbits(habbits, filter.sort, filter.query)

  useEffect(() => {
    fetchHabbit()
  }, [])

  const fetchHabbit = async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL)
    setHabbits(response.data)
  }

  const createHabbit = (habbit) => {
    setHabbits([...habbits, habbit])
  }

  const removeHabbit = (habbit) => {
    axios.delete(`${process.env.REACT_APP_API_URL}${habbit._id}`)
    setHabbits(habbits.filter(h => h._id !== habbit._id))
  }

  const editHabbit = ({ _id, newTitle, newType }) => {
    setHabbits([...habbits].map(item => {
      if (item.id === _id) {
        item.title = newTitle
        item.type = newType
      }
      return item
    }))
  }

  const dayDone = ({ _id, progress }) => {
    setHabbits([...habbits].map(item => {
      if (item._id === _id) {
        item.progress = progress
      }
      return item
    }))
  }

  return (
    <div className="container">
      <NavBar />
      <div className="main">
        <div className="left">
          <HabbitForm create={createHabbit} />
        </div>
        <div className="right">
          <HabbitsFilter
            filter={filter}
            setFilter={setFilter}
          />
          <HabbitsList
            habbits={sortedAndSearchedHabbits}
            remove={removeHabbit}
            edit={editHabbit}
            dayDone={dayDone}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
