import React, { useState } from 'react'
import HabbitModal from './HabbitModal'

const HabbitCard = ({ body, remove, edit, dayDone }) => {

  const { id, title, type, progress, dateAd } = body

  const [modal, setModal] = useState(false)

  const [habbitProgress, setHabbitProgress] = useState(progress)

  const dayDoneHabbit = (e) => {
    e.stopPropagation()
    setHabbitProgress(habbitProgress + 1)
    dayDone({ id: id, progress: habbitProgress + 1 })
  }

  const [openCard, setOpenCard] = useState(false)

  const openHabbit = () => {
    !openCard ? setOpenCard(true) : setOpenCard(false)
  }

  return (
    <div className={!openCard ? "habbit-card" : "habbit-card open"} onClick={openHabbit}>
      <div className="top-card">
        <div className="habbit-type">{type}</div>
        <div className="description">{title}</div>
        <button
          className="btn edit"
          onClick={(e) => {
            e.stopPropagation()
            setModal(true)
          }}
        >Edit
        </button>
        <div className={!openCard ? "post-day" : "post-day active"}><strong>Create date:</strong> {dateAd}</div>
      </div>
      <div className="bottom-card">
        <button
          className={progress >= 21 ? "btn hide" : "btn done"}
          onClick={dayDoneHabbit}
        >Done
        </button>
        <div className="progress-bar">
          <div
            className="progress-value"
            style={{ width: `${progress * 4.7619047619 + "%"}` }}
          >
            {progress > 0 ? progress : ''}
          </div>
        </div>
      </div>
      <HabbitModal
        visible={modal}
        setVisible={setModal}
        body={body}
        remove={remove}
        edit={edit}
      />
    </div>
  )
}

export default HabbitCard