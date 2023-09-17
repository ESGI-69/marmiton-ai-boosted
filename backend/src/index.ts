import { config } from 'dotenv';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

config({ path: '../.env' });

const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  res.send(user)
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
