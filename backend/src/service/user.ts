import { prisma } from '../db';
import bcrypt from 'bcryptjs';

interface CreateUserInput {
  username: string;
  password: string;
  name: string;
}

const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export default {
  create: async function ({ username, password, name }: CreateUserInput) {
    const user = await prisma.user.create({
      data: {
        username,
        name,
        password: await encryptPassword(password),
      },
    });
    return user;
  },
};
