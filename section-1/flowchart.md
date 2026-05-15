# System Flowchart

```mermaid
flowchart TD

A[Login Page] --> B{Select Role}

B -->|Admin| C[Admin Dashboard]
B -->|Employee| D[Employee Dashboard]

C --> E[View All Tasks]
C --> F[Create New Task]

D --> G[View Assigned Tasks]
D --> H[Update Task Status]

H --> I[Change Status To Done]
```