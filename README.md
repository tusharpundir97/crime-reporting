

🕵‍♂ Crime Reporting & Management System

A full-stack MERN web application that allows citizens to report crimes and police to manage and update crime statuses. Built with role-based access, image uploads, and email notifications.

🔗 **Live Frontend:** [Vercel Link]  https://crime-reporting-frontend-a05o94wn9-tushar-pundir-s-projects.vercel.app/  
🔗 **Live Backend:** [Render Link]  https://your-backend.onrender.com  
🔗 **GitHub:** [github.com/tusharpundir97/crime-reporting](https://github.com/tusharpundir97/crime-reporting)

---

🚀 Features

- 👥 Role-based authentication (Citizen & Police)
- 📝 Citizens can report crimes with images
- 📃 Users can view their own reports
- 🛠 Police can view all reports and update status
- 📬 Email notification when crime status updates
- 🖼 Image upload with Multer
- 🎨 Tailwind CSS UI
- 🌍 Deployed on Render & Vercel

---

🗂 Folder Structure


crime-reporting/
├── client/         # React frontend using Vite
├── server/         # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── .gitignore
└── README.md


---

🛠 Tech Stack

**Frontend:** React (Vite), Tailwind CSS, Fetch API  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Auth:** JWT  
**File Uploads:** Multer  
**Email:** Nodemailer (Gmail SMTP)  
**Deploy:** Vercel (Frontend), Render (Backend)

---

👤 User Roles

- **Citizen**  
  - Register / Login  
  - Report crimes  
  - View their reported crimes  

- **Police**  
  - Login  
  - View all crimes  
  - Update crime status (Pending → In Progress → Resolved)  

---

🔌 API Endpoints

### Auth
- `POST /api/auth/register` – Register user or police  
- `POST /api/auth/login` – Login and get JWT  

### Crimes
- `POST /api/crimes/report` – Report a new crime  
- `GET /api/crimes` – Get crimes (citizen/police-based access)  
- `PUT /api/crimes/update` – Update status (Police only)  

---


## 💡 Future Improvements

- Crime report filtering and search  
- Admin dashboard for analytics  
- Email OTP verification  
- Map integration with crime locations  

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Fork the repo and make it even better.

---

## 👨‍💻 Author

**Tushar Pundir**  
🔗 GitHub: [@tusharpundir97](https://github.com/tusharpundir97)  
📧 Email: tusharpundir97@gmail.com

---

## ⭐ Show Your Support

If you liked this project, leave a ⭐ on [GitHub](https://github.com/tusharpundir97/crime-reporting)!




