# Mood Feed

Mood Feed is a full-stack web application featuring server-side rendering using EJS. The project leverages Node.js, Express.js, Mongoose, and MongoDB Atlas for its backend infrastructure.

This application is my first project built while learning backend development, and it serves as a hands-on demonstration of CRUD operations, RESTful routing, and dynamic content rendering.

---

## Features

- **Server-Side Rendering:** Uses EJS templating to dynamically generate HTML pages.
- **RESTful API:** Implements CRUD operations for mood entries.
- **MongoDB Atlas Integration:** Connects to a cloud-hosted MongoDB database using Mongoose.
- **User-Friendly Interface:** Simple and intuitive UI for submitting and viewing mood entries.

---

## Tech Stack

- **Frontend:** EJS templates, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (via Mongoose ODM)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or use a local MongoDB instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Umesh341/mood-feed.git
   cd mood-feed
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB Atlas URI:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     PORT=3000
     ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **View in browser:**
   - Visit `http://localhost:3000`

---

## Usage

- Submit your daily mood entries.
- View all submitted moods in a list.
- Edit or delete entries as needed.

---

## Folder Structure

```
mood-feed/
│
├── models/          # Mongoose models
├── public/          # Static assets (CSS, images)
├── routes/          # Express route handlers
├── views/           # EJS templates
├── .env.example     # Example environment variables
├── app.js           # Main application file
├── package.json     # Project metadata
└── README.md
```

---

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)

---
