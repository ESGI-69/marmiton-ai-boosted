# Endpoints

## POST /user/

### Request

```json
{
    "username": "username",
    "password": "password",
    "name": "name (optional)",
}
```

### Response

```json
{
    "id": 1,
    "username": "username",
    "name": "name",
}
```