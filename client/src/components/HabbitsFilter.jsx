import React from 'react'

const HabbitFilter = ({ filter, setFilter }) => {

  return (
    <div className="heading card">
      <h2 className="heading form">Your habbits</h2>
      <div>
        <label>Search: </label>
        <input
          type="text"
          className="form-search"
          placeholder="Input title"
          value={filter.query}
          onChange={e => setFilter({ ...filter, query: e.target.value })}
        />
        <label>Sort: </label>
        <select
          className="btn sort"
          value={filter.sort}
          onChange={e => setFilter({ ...filter, sort: e.target.value })}
        >
          <option value="dateAd">Date</option>
          <option value="type">Type</option>
          <option value="progress">Progress</option>
        </select>
      </div>
    </div>
  )
}

export default HabbitFilter