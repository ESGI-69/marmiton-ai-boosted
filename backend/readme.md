# Endpoints

# Auth

## POST /auth/login

### Request

```json
{
    "username": "username",
    "password": "password",
}
```

### Response

Token is a json web token

```json
{
    "token": "token",
}
```

# User

## POST /users/

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

## GET /users/me

> Need bearer token authorization header

### Response

```json
{
    "id": 1,
    "username": "username",
    "name": "name",
}
```

# Recipe

## GET /recipe/:id

### Response

```json
{
    "id": 1,
    "title": "title",
    "description": "description",
    "steps": [
        "prends le lait",
        "boire le lait",
    ],
    "ingredientsWithQuantityIds": [],
    "createdAt": "2023-09-27T01:38:16.313Z",
    "updatedAt": "2023-09-27T01:38:16.313Z",
    "ingredientsWithQuantity": [
        {
            "id": 1,
            "quantity": "1ml",
            "ingredientId": 1,
            "recipeId": 1,
            "createdAt": "2023-09-27T01:38:16.301Z",
            "updatedAt": "2023-09-27T01:38:16.313Z",
            "ingredient": {
                "id": 1,
                "name": "caco"
            }
        },
        {
            "id": 2,
            "quantity": "2ml",
            "ingredientId": 2,
            "recipeId": 1,
            "createdAt": "2023-09-27T01:38:16.301Z",
            "updatedAt": "2023-09-27T01:38:16.313Z",
            "ingredient": {
                "id": 2,
                "name": "lait"
            }
        }
    ],
    "ratings": [/* to complete */],
}
```