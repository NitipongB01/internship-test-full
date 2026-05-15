# Bugs & Security Issues Analysis

## 1. SQL Injection Vulnerability

### Problem
Original code directly inserted `taskId` and `newStatus`
into SQL queries using template literals.

Example:

```javascript
`SELECT * FROM tasks WHERE id = ${taskId}`
```

This allows attackers to inject malicious SQL.

### Fix
Use parameterized queries:

```javascript
db.query(
  'SELECT * FROM tasks WHERE id = $1',
  [taskId]
)
```

### Why
Parameterized queries separate SQL logic from user input
and prevent SQL Injection attacks.

---

## 2. Sensitive Data Exposure

### Problem
The API returned:

```javascript
password: req.body.password
```

inside the response object.

This exposes sensitive information.

### Fix
Removed password from API response.

### Why
Passwords should never be returned to clients.

---

## 3. Weak Authorization Logic

### Problem
Original code used:

```javascript
if (userRole == 'admin' || task.assigned_to == userId)
```

without strict validation.

### Risks
- Type coercion issues
- Possible authorization bypass

### Fix
Use strict comparison and explicit checks:

```javascript
const isAdmin = userRole === 'admin'

const isOwner =
  Number(task.assigned_to) === Number(userId)
```

### Why
Improves authorization reliability and security.

---

## 4. Missing Input Validation

### Problem
The original code did not validate:
- missing fields
- invalid status values

### Fix
Added validation for:
- required fields
- allowed status values

### Why
Prevents invalid or malicious input.

---

## 5. Unsafe Update Query

### Problem
Original update query:

```javascript
`UPDATE tasks SET status = '${newStatus}' WHERE id = ${taskId}`
```

was vulnerable to SQL Injection.

### Fix
Replaced with parameterized query.

### Why
Improves database security.