# 🚀 EasyMeet — Plateforme de prise de rendez-vous (Fullstack Vue.js + Node.js + MongoDB)

EasyMeet est une **solution digitale moderne** qui permet aux professionnels (médecins, coiffeurs, vétérinaires, esthéticiennes, coachs, petites structures) de **gérer leurs rendez-vous** simplement, avec une interface fluide et une API sécurisée.

🎯 Objectif : remplacer les outils dispersés (WhatsApp / Excel / appels) par une application unique, rapide et professionnelle.

---

## 📌 Fonctionnalités principales

### 👤 Authentification (JWT)
- Inscription utilisateur (Register)
- Connexion utilisateur (Login)
- Token JWT généré côté backend
- Session conservée côté frontend (localStorage)
- Déconnexion (Logout)

### 📅 Rendez-vous
- Prendre un rendez-vous (motif, date, heure)
- Consultation des rendez-vous de l’utilisateur connecté
- Stockage des rendez-vous en base MongoDB
- Données filtrées par utilisateur (sécurité)

### 🎉 Événements (démo)
- Page Events accessible depuis le menu
- Liste d’événements (présentation / démo)

---

## 🧱 Stack technique

### Frontend
- **Vue 3**
- **Vite**
- **Vue Router**
- **Axios**
- UI moderne responsive (type SaaS)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (jsonwebtoken)**
- **bcrypt** (hash mots de passe)

---

## 📁 Structure du projet

```bash
easymeet/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   └── appointments.js
│   ├── models/
│   │   ├── User.js
│   │   └── Appointment.js
│   ├── .env
│   ├── package.json
│   └── node_modules/
│
└── frontend/
    └── vue-project/
        ├── src/
        │   ├── assets/
        │   ├── components/
        │   │   ├── Header.vue
        │   │   └── Footer.vue
        │   ├── router/
        │   │   └── index.js
        │   ├── services/
        │   │   └── api.js
        │   ├── views/
        │   │   ├── Home.vue
        │   │   ├── Login.vue
        │   │   ├── Register.vue
        │   │   ├── Events.vue
        │   │   ├── BookAppointment.vue
        │   │   └── MyAppointments.vue
        │   ├── App.vue
        │   └── main.js
        ├── package.json
        └── vite.config.js
⚙️ Installation & Lancement (Local)
1) Cloner le repo
bash
Copier le code
git clone https://github.com/Rayanabbas/easymeet.git
cd easymeet
🔥 Backend (API)
2) Installer les dépendances backend
bash
Copier le code
cd backend
npm install
3) Créer le fichier .env
Créer : backend/.env

env
Copier le code
PORT=3000
MONGO_URI=mongodb://localhost:27017/easymeet
JWT_SECRET=monsecretjwt
4) Lancer MongoDB
MongoDB doit tourner sur le port 27017.

➡️ Si besoin (Windows) :

bash
Copier le code
mongod
5) Démarrer le serveur
bash
Copier le code
node server.js
✅ Résultat attendu :

Serveur lancé sur le port 3000

MongoDB connecté

Backend accessible sur :
👉 http://localhost:3000

🎨 Frontend (Vue)
6) Installer les dépendances frontend
bash
Copier le code
cd ../frontend/vue-project
npm install
7) Lancer le front
bash
Copier le code
npm run dev
Frontend accessible sur :
👉 http://localhost:5173

🔗 Pages / Navigation (Frontend)
/ → Accueil (Home)

/register → Inscription

/login → Connexion

/book → Prendre RDV

/my-appointments → Mes RDV

/events → Events

🔌 Endpoints API (Backend)
Auth
✅ Register

http
Copier le code
POST /api/auth/register
Content-Type: application/json

{
  "email": "test@mail.com",
  "password": "123456"
}
✅ Login

http
Copier le code
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@mail.com",
  "password": "123456"
}
Réponse :

json
Copier le code
{
  "token": "JWT_TOKEN"
}
Appointments (protégé JWT)
📌 Header obligatoire :

http
Copier le code
Authorization: Bearer JWT_TOKEN
✅ Voir mes rendez-vous

http
Copier le code
GET /api/appointments
✅ Créer un rendez-vous

http
Copier le code
POST /api/appointments
Content-Type: application/json
Authorization: Bearer JWT_TOKEN

{
  "reason": "Consultation",
  "date": "2026-01-20",
  "time": "10:30"
}
🔐 Sécurité & bonnes pratiques
Mot de passe hashé avec bcrypt

Authentification via JWT

Routes protégées via token Authorization: Bearer ...

Données rendez-vous filtrées par userId

Architecture simple, claire et scalable

🧪 Test rapide API (PowerShell)
powershell
Copier le code
$token="COLLE_TON_TOKEN"
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod "http://localhost:3000/api/appointments" -Headers $headers
🎓 Contexte projet / Jury
EasyMeet est conçu comme une solution SaaS destinée aux petites structures pour :

gagner du temps

centraliser la gestion des rendez-vous

réduire les erreurs

améliorer l’expérience client

👨‍💻 Auteur
Rayan ABBAS
Projet Fullstack — Vue.js / Node.js / MongoDB
EEMI — RNCP Niveau 7

📌 Repo GitHub
👉 https://github.com/Rayanabbas/easymeet