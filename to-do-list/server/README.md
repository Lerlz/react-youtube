# To-Do List Application

This frontend project is a **React.js-based To-Do List application** that allows users to efficiently create, update, and manage their tasks. It is designed to be **simple**, **intuitive**, and **responsive**, making it an ideal solution for task management.

This project has been developed separately as part of a **MERN stack** implementation and works independently from the `server` folder present in the repository. In the upcoming days, the `main` branch will contain the full MERN stack project.

## 🛠️ Tech Stack

- ⚛️ **REACT.JS**
- 🌐 **HTML5**
- 🎨 **CSS3**
- 🎯 **FontAwesome**

## 📦 Project Structure

### 📂 Components

- **`MainPage.js`** – Manages the task list, handles **state** and task operations (add, edit, delete).
- **`TaskForm.js`** – A controlled form for creating tasks with **validation**.
- **`TaskBoard.js`** – Displays tasks, enables **editing**, **deleting**, and viewing **task details**.

## 🚀 Features

### ➕ Add Tasks

- Users can create new tasks by providing:
  - **Name**
  - **Description**
  - **Priority Level (High, Medium, Low)**
  - **Due Date**
- **✅ Form Validation:** Tasks cannot be added unless all fields are completed. Error messages guide users when fields are left blank.

### ✏️ Edit Tasks

- Users can modify **task titles** inline by clicking the **pencil icon**.
- Press **Enter** or lose focus (`onBlur`) to save changes.

### 🗑️ Delete Tasks

- Tasks can be deleted using the **trash bin icon**.

### ℹ️ Task Details

- Click the **three dots icon** to view more task details such as:
  - **Description**
  - **Due Date**
  - **Priority Level**

### 📊 Priority Sorting

- Tasks are **automatically sorted** by priority:
  - **High (Top Priority)** ⬆️
  - **Medium**
  - **Low (Lowest Priority)** ⬇️
- Ensures important tasks are highlighted at the top.

### 📱 Responsive Design

- The application is fully responsive with **CSS media queries** optimizing for **desktop, tablet, and mobile** screen sizes.