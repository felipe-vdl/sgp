import { unstable_getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../db';
import bcrypt from 'bcrypt';

export default async function Signup(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.json(405).json({ message: `${req.method} method is not allowed.` });
    }

    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const authUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        }
      });

      if (authUser.role !== "STAFF") {
        return res.status(403).json({ message: "Ação não autorizada." });
      }

      const { email, name, role } = req.body;

      if (!email || !email.includes('@') || !role || !name) {
        return res.status(422).json({ message: 'Informações inválidas.' });
      }

      const checkExistingUser = await prisma.user.findUnique({
        where: {
          email,
        }
      });
      if (checkExistingUser) {
        return res.status(409).json({ message: 'E-mail already in use.' });
      }

      await prisma.user.create({
        data: {
          email,
          name,
          password: await bcrypt.hash(process.env.DEFAULT_PASSWORD, 10),
          role,
          updatedAt: null,
        },
      });

      return res.status(201).json({ message: 'Usuário criado com sucesso.' });
    } else {
      return res.status(401).json({ message: 'Usuário não está autenticado.' })
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'There was an error.' });
  }
}