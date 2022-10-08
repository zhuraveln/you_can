import React, { useState } from 'react'
import axios from 'axios'

const HabbitModal = ({ visible, setVisible, body, remove, edit }) => {

  const { title, type, _id } = body

  let rootClasses = 'habbit-modal edit'

  if (visible) {
    rootClasses += ' open'
  }

  const [data, setData] = useState({ newTitle: title, newType: type })

  const newHabbitData = async (e) => {
    e.preventDefault()

    await axios.put(`${process.env.REACT_APP_API_URL}${_id}`, { title: data.newTitle, type: data.newType })

    edit({ id: _id, newTitle: data.newTitle, newType: data.newType })
    setVisible(false)
  }

  return (
    <div
      className={rootClasses}
      onClick={(e) => {
        e.stopPropagation()
        setVisible(false)
      }}
    >
      <div className="habbit-modal-content" onClick={e => e.stopPropagation()}>
        <h2>Edit habbit:</h2>
        <form className="form" method="post">
          <div className="input-area">
            <input
              type="text"
              className="form-control"
              value={data.newTitle}
              onChange={e => setData({ ...data, newTitle: e.target.value })}
            />
            <select
              className="btn type"
              value={data.newType}
              onChange={e => setData({ ...data, newType: e.target.value })}
            >
              <option value="Health">Health</option>
              <option value="Sport">Sport</option>
              <option value="Skills">Skills</option>
              <option value="Hobby">Hobby</option>
              <option value="Mind">Mind</option>
            </select>
          </div>
          <button onClick={newHabbitData} type="submit" className="btn edit">Save</button>
          <button onClick={() => remove(body)} type="button" className="btn edit">Delete</button>
        </form>
      </div>
    </div>
  )
}

export default HabbitModal