# 📝📈 Habit tracker "You can!"

powered by 💙 **React JS** 💚 **Node.JS**

## 👀 Demo

- **[you-can](https://you-can.vercel.app/)** (vercel)

## 🛠 Tech Stack

- **Server**

  - Node.js / Express
  - MongoDB / mongoose

- **Client**
  - React / axios

## ⚡️ Features

- Create, save and track habits
- Button `random` for get trash habit from **[trash-habbits-maker](https://trash-habbits-maker.herokuapp.com/)**

## 🏗 API Reference (server directory)

### Get All Habits

```bash
  GET /
```

### Get All **random** Habits

```bash
  GET /random
```

### Create Habit

```bash
  POST /
```

| Body                         | Type   |
| :--------------------------- | :----- |
| `{ "title": "","type": "" }` | `JSON` |

### Delete Habit

```bash
  DELETE /api/${id}
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | habit id    |

### Edit Habbit

```bash
  PATCH /edit/${id}
```

| Parameter       | Body                         | Types             |
| :-------------- | :--------------------------- | :---------------- |
| `id` - habit id | `{ "title": "","type": "" }` | `string` , `JSON` |

### Day done Habbit

```bash
  PATCH /done/${id}
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | habit id    |

## 🚚 Run Locally

Clone the project

```bash
  git clone https://github.com/zhuraveln/you_can.git
```

Go to the project directory (client and server)

```bash
  cd server / cd client
```

Install dependencies (apart for client and server directory)

```bash
  npm install
```

Start the local server for backend (in server directory)

```bash
  npm run dev
```

Start the local server for frontend (in client directory)

```bash
  npm start
```

## 🔐 Environment Variables

Add the following environment variables to your .env file

**Server**

`MONGO_URL` - _your MongoDB URL_

`PORT` - _your local port_

**Client**

`REACT_APP_API_URL` - _your server URL_
