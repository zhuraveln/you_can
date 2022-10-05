import React from 'react'
import HabbitCard from './HabbitCard'

const HabbitList = ({ habbits, remove, edit, dayDone }) => {

  if (!habbits.length) {
    return (
      <div>
        <h2>Habbits not found</h2>
      </div>
    )
  }

  return (
    <div className="habbits-cards">
      {habbits.map(habbit =>
        <HabbitCard
          body={habbit}
          key={habbit.id}
          remove={remove}
          edit={edit}
          dayDone={dayDone}
        />
      )}
    </div>
  )
}

export default HabbitList