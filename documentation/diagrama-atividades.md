```mermaid
graph TD
    A[User Login] --> B[Validate Credentials]
    B --> C{Valid?}
    C -->|Yes| D[Generate Token]
    C -->|No| E[Return Error]
    D --> F[Send Response]
    E --> F
```
