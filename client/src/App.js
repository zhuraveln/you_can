import React, { useState } from 'react'
import HabbitsFilter from './components/HabbitsFilter';
import HabbitForm from './components/HabbitForm';
import HabbitsList from './components/HabbitsList';
import NavBar from './components/NavBar';
import './styles/App.css'
import { useHabbits } from './hooks/useHabbits';

function App() {
  const [habbits, setHabbits] = useState([
    { id: '1', title: 'You will run today!', type: 'Sport', progress: 7, dateAd: '02.10.2022, 18:46:32' },
    { id: '2', title: 'You will mass up!', type: 'Health', progress: 3, dateAd: '03.10.2022, 18:46:32' },
    { id: '3', title: 'You will rest to night!', type: 'Mind', progress: 15, dateAd: '01.10.2022, 18:46:32' },
  ])

  const [filter, setFilter] = useState({ sort: 'dateAd', query: '' })
  const sortedAndSearchedHabbits = useHabbits(habbits, filter.sort, filter.query)

  const createHabbit = (habbit) => {
    setHabbits([...habbits, habbit])
  }

  const removeHabbit = (habbit) => {
    setHabbits(habbits.filter(h => h.id !== habbit.id))
  }

  const editHabbit = ({ id, newTitle, newType }) => {
    setHabbits([...habbits].map(item => {
      if (item.id === id) {
        item.title = newTitle
        item.type = newType
      }
      return item
    }))
  }

  const dayDone = ({ id, progress }) => {
    setHabbits([...habbits].map(item => {
      if (item.id === id) {
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
