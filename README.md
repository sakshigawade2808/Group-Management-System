# Group Management System

## About the Project

This is a Group Management System developed as part of my internship assignment. The main objective of this project is to manage groups by allowing users to add, view, update, and delete group records. The application also provides a dashboard to display group statistics such as total, active, and inactive groups.

The project is built using the MVC architecture with Node.js, Express.js, MySQL, and EJS.

---

## Features

- Dashboard with group statistics
- View all groups
- Add a new group
- Edit group details
- Soft delete groups
- Display active and inactive status
- Validation for duplicate group names
- Prevent deletion of groups linked with a Chain ID
- Success and error messages using flash notifications

---

## Technologies Used

- Node.js
- Express.js
- MySQL
- EJS
- Bootstrap 5
- CSS
- JavaScript
- Express Session
- Connect Flash
- Dotenv

---

## Folder Structure

```
Group-Management-System
│
├── controllers
├── models
├── routes
├── views
│   └── partials
├── public
│   └── css
├── app.js
├── package.json
├── README.md
└── .env
```

---

## Database

**Database Name:** `group_management`

**Table Name:** `user_groups`

The main table contains the following fields:

- group_id
- group_name
- chain_id
- is_active
- created_at
- updated_at

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Group-Management-System.git
```

### 2. Open the project folder

```bash
cd Group-Management-System
```

### 3. Install the required packages

```bash
npm install
```

### 4. Create a `.env` file

Add your database details in the following format:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=group_management
PORT=3000
```

### 5. Start the application

```bash
node app.js
```

### 6. Open the application

```
http://localhost:3000
```

---

## What I Learned

While developing this project, I learned:

- Creating an application using the MVC architecture
- Connecting Node.js with MySQL
- Performing CRUD operations
- Implementing soft delete functionality
- Using Express routing and controllers
- Displaying dynamic data using EJS
- Handling form validations
- Using flash messages for user feedback
- Building responsive pages with Bootstrap

---

## Future Improvements

Some features that can be added in the future are:

- User authentication and authorization
- Search and filter groups
- Pagination
- Export group data to Excel or PDF
- Better dashboard analytics

---
