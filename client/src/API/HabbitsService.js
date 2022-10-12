import axios from 'axios';

export default class HabbitsService {

  static async getAllHabbits() {
    const response = await axios.get(
      process.env.REACT_APP_API_URL || `http://localhost:${process.env.REACT_APP_PORT}/`
    )

    return response.data
  }

  static async randomTrashHabbit() {

    const response = await axios.get(
      process.env.REACT_APP_API_URL || `http://localhost:${process.env.REACT_APP_PORT}/random`)

    return response.data
  }

  static async createHabbit(habbit) {

    const { data } = await axios.post(
      process.env.REACT_APP_API_URL || `http://localhost:${process.env.REACT_APP_PORT}/`, habbit)

    return data
  }

  static async deleteHabbit(id) {

    await axios.delete(
      process.env.REACT_APP_API_URL || `http://localhost:${process.env.REACT_APP_PORT}/${id}`)
  }

  static async editHabbit(id, data) {
    await axios.patch(
      process.env.REACT_APP_API_URL || `http://localhost:${process.env.REACT_APP_PORT}/edit/${id}`,
      { title: data.newTitle, type: data.newType }
    )
  }

  static async dayDoneHabbit(id) {
    await axios.patch(
      process.env.REACT_APP_API_URL || `http://localhost:${process.env.REACT_APP_PORT}/done/${id}`)
  }
}