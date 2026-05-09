# Wisdora - Online Learning Platform

A comprehensive online learning management system built with modern web technologies. Wisdora enables students to explore and enroll in courses, teachers to create and manage courses, and administrators to oversee the entire platform.

## 🎯 Live Project

**Live URL:** [https://wisdora-client.vercel.app/](https://wisdora-client.vercel.app/)

---

## ✨ Features

### For Students/Users

- Browse and search courses
- Enroll in courses
- Track learning progress
- Add courses to wishlist
- View course details and instructor profiles
- Update profile and password
- Contact support

### For Teachers/Instructors

- Create and manage courses
- Upload course materials
- Track student enrollments
- Manage course content
- View analytics

### For Administrators

- Manage all users (students, teachers, admins)
- Monitor platform activity
- Content moderation
- System settings and configuration
- View platform statistics

---

## 🧑‍💻 Demo Credentials

### Teacher/Instructor Account

```
Phone: 1767092980
Password: 01767092980
```

### Admin Account

```
Phone: 1767092988
Password: 1767092980
```

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15
- **UI Library:** Material-UI (MUI)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS, Emotion
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Maps:** Leaflet

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Cloudinary
- **Rate Limiting:** Express Rate Limit
- **Password Hashing:** bcryptjs

### Development Tools

- ESLint for code linting
- Nodemon for auto-reload during development

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)

### Backend Setup

1. Navigate to server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file in the server directory:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` file in the client directory:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 📁 Project Structure

```
Wisdora/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Pages and layouts
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities and helpers
│   │   ├── redux/         # Redux store and slices
│   │   └── theme/         # Theme configuration
│   └── package.json
│
├── server/                 # Express.js Backend
│   ├── src/
│   │   ├── app/           # Routes and middleware
│   │   ├── db/            # Database configuration
│   │   ├── errors/        # Error handling
│   │   ├── utils/         # Utility functions
│   │   └── modules/       # Feature modules
│   └── package.json
│
└── README.md
```

---

## 🚀 Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend

- `npm run dev` - Start with auto-reload (Nodemon)
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues

---

## 📝 API Documentation

The backend API is RESTful and uses JWT authentication. Key endpoints include:

- **Authentication:** `/api/auth/login`, `/api/auth/register`
- **Courses:** `/api/courses`, `/api/courses/:id`
- **Users:** `/api/users`, `/api/users/profile`
- **Enrollments:** `/api/enrollments`
- **Admin:** `/api/admin/*`

---

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting on API endpoints
- CORS protection
- MongoDB injection prevention with express-mongo-sanitize
- Environment variables for sensitive data

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💼 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support & Contact

For support, please use the contact form on the platform or reach out to the development team.

---

**Happy Learning! 🎓**
