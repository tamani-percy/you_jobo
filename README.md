Job Tracker Application (WIP)

A full-stack job tracking application designed to help you manage your job search efficiently — from applications to interviews, contacts, notes, and documents — all in one place.

 **This project is still a Work In Progress (WIP).**
> Features, structure, and APIs may change as development continues.


### Overview

This application helps you organize and track your job search lifecycle with structured data and insightful dashboards.

Instead of juggling spreadsheets or notes, this app gives you a centralized system to:

* Track job applications
* Monitor progress and response rates
* Manage interviews and contacts
* Store documents like CVs/resumes
* Keep notes for each opportunity

---

### Features

### Dashboard

* View job application statistics:

  * Total applications
  * Active applications
  * Response rate
  * Applications needing follow-up
* Quick overview of your job search progress

---

### Job Applications

* Core entity of the system
* Required fields:

  * Title, Job Source, Status, Type, Work Mode, Priority
  * Dates (Applied, Posted, Deadline)
  * Company
  
* Optional fields:

  * Department
  * Salary range (min/max)
  * Currency
  * Job URL

---

### Interviews

* Track interview stages per job application
* Includes:

  * Interviewer details
  * Date & duration
  * Interview type & stage
  * Location or meeting link
  * Notes

---

###  Contact Persons

* Multiple contacts per job application
* Store:

  * Full name
  * Email
  * Phone number
  * LinkedIn URL
  * Role
  * Notes

---

###  Notes

* Add comments or observations per job application
* Useful for:

  * Interview feedback
  * Reminders
  * Personal insights

---

###  Documents

* Upload and manage:

  * Resume / CV
* Features:

  * Versioning support
  * Replace existing or add new documents

---


##  Getting Started (Docker)

### 1. Clone the repository

```bash
git clone https://github.com/tamani-percy/you_jobo.git
cd job-tracker
```

---

### 2. Run the application using Docker Compose

```bash
docker compose up --build
```

This will:

* Spin up MySQL
* Build and run the Spring Boot backend
* Build and serve the Vue frontend

---

### 3. Access the application

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:8080`

---

## Future Enhancements

Planned (or potential) features include:

* Authentication & Authorization (JWT / OAuth)
* Push notifications (interview reminders, follow-ups)
* Calendar integration
* Advanced analytics & reporting
* File previews (PDF viewer, etc.)
* Mobile support
* Smart suggestions (AI-powered insights)

---

## Known Limitations

* Some features may be incomplete or unstable
* APIs and database schema may change
* UI/UX is still evolving

---

## Contributing

Contributions, ideas, and feedback are welcome!

---

## License

This project is currently unlicensed (add a license if needed).
