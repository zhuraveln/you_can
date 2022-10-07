import React from 'react'
import HabbitCard from './HabbitCard'
import { TransitionGroup, CSSTransition } from "react-transition-group"

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
      <TransitionGroup>
        {habbits.map(habbit =>
          <CSSTransition
            key={habbit.id}
            timeout={500}
            classNames="habbitItem"
          >
            <HabbitCard
              body={habbit}
              remove={remove}
              edit={edit}
              dayDone={dayDone}
            />
          </CSSTransition>

        )}
      </TransitionGroup>
    </div>
  )
}

export default HabbitList