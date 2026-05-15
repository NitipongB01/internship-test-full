# Database Schema Design

## Users Table

| Field | Type | Description |
|---|---|---|
| id | INTEGER | Primary Key |
| username | VARCHAR | Username |
| role | VARCHAR | admin / employee |

---

## Projects Table

| Field | Type | Description |
|---|---|---|
| id | INTEGER | Primary Key |
| name | VARCHAR | Project name |
| created_by | INTEGER | FK -> users.id |

---

## Tasks Table

| Field | Type | Description |
|---|---|---|
| id | INTEGER | Primary Key |
| title | VARCHAR | Task title |
| status | VARCHAR | To Do / Done |
| project_id | INTEGER | FK -> projects.id |
| assigned_to | INTEGER | FK -> users.id |

---

# Relationships

- One User can create many Projects
- One Project can contain many Tasks
- One Employee can have many assigned Tasks