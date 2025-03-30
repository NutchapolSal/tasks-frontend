# Tasks Frontend

## Running

see instructions on Tasks backend

## Key Architectural decisions

- App is split into 2 main parts:
    - `auth-app`: manages auth and user info
    - `tasks-app`: manages tasks
- Each part has a `Main` that does part-specific logic and manages state
- API calls are done inside of Formik `onSubmit` to simplify alerting errors, business data is returned via callbacks
- Auth data is provided to components via Context
- CSS is a single `index.css`
- makes uses of OpenAPI description from backend.
- Containerized version is an nginx container serving built static files.

## Development

### Generate types for Axios OpenAPI Client
```
npx openapicmd typegen http://localhost:3000/api-json > src/types/backend-openapi.d.ts
```

