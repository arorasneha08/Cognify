# 🧠 Cognify – AI Learning Assistant

Cognify is an AI-powered learning platform that transforms unstructured documents (like PDFs) into structured, interactive learning materials. It leverages modern web technologies and AI capabilities to help users understand, revise, and retain information more effectively.


## 🚀 Features

* Upload and manage PDF documents
* AI-generated summaries
* Concept explanations using AI
* Automatic quiz generation
* Flashcard generation for revision
* Chat with your documents (AI chatbot)
* Progress tracking dashboard
* Secure authentication (JWT-based)



## Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### AI Integration

* Google Gemini API

### Other Tools

* Multer (file upload)
* JWT (authentication)
* Express Validator



## 📂 Project Structure

```
Cognify/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
│   └── index.html
│
└── README.md
```



## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/arorasneha08/cognify.git
cd cognify
```



### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=8000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Run backend:

```bash
npm run dev
```



### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```



## 🌐 API Endpoints

### 🔐 Auth Routes

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/profile`
* PUT `/api/auth/profile`
* PUT `/api/auth/change-password`


### 🤖 AI Routes

* POST `/api/ai/generate-summary`
* POST `/api/ai/generate-flashcards`
* POST `/api/ai/generate-quiz`
* POST `/api/ai/chat`
* POST `/api/ai/explain-concept`
* GET `/api/ai/chat-history/:documentId`



### 📄 Document Routes

* POST `/api/documents/upload`
* GET `/api/documents`
* GET `/api/documents/:id`
* DELETE `/api/documents/:id`



### 🎴 Flashcard Routes

* GET `/api/flashcards`
* GET `/api/flashcards/:documentId`
* POST `/api/flashcards/:cardId/review`
* PUT `/api/flashcards/:cardId/star`
* DELETE `/api/flashcards/:id`



### 📝 Quiz Routes

* GET `/api/quizzes/quiz/:id`
* POST `/api/quizzes/:id/submit`
* GET `/api/quizzes/:id/results`
* DELETE `/api/quizzes/:id`
* GET `/api/quizzes/:documentId`



### 📊 Progress Routes

* GET `/api/progress/dashboard`



## 🔄 How It Works

1. User uploads a PDF document
2. Backend extracts text from the file
3. Text is processed and sent to Gemini AI
4. AI generates:

   * Summary
   * Flashcards
   * Quiz
   * Explanations
5. Data is stored in MongoDB
6. User interacts via dashboard and chatbot


## 🔐 Authentication

* JWT-based authentication
* Protected routes using middleware
* Secure password handling



## 📊 Database Design

Collections:

* Users
* Documents
* Flashcards
* Quizzes
* ChatHistory



## 🚀 Future Improvements

* Multi-language support
* Voice interaction
* Mobile application
* LMS integration
* Advanced analytics dashboard


## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.


## 📄 License

This project is licensed under the MIT License.


## 👨‍💻 Author

Developed by Sneha Arora


