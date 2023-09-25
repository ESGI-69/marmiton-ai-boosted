# Marmiton AI Boosted

This app is a marmiton boosted with AI. It's a school project for the course "Artificial Intelligence" at ESGI

Endpoints are documented in the [backend readme](./backend/readme.md)

## Init for dev

> Don't forget to `mv .env.example .env`

### Back

1. deps install
    ```sh
      npm i -D
    ```

2. Launch the postgres db
    ```sh
      docker compose up
    ```

3. Migrade the database with pisma
    ```
      npx prisma migrate deploy
    ```

4. launch
    ```sh
      npm run start
    ```

### Front

1. deps install
    ```sh
      npm i -D
    ```

2. launch
    ```
      npm run dev
    ```
