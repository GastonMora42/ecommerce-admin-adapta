import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

// Lista de correos electrónicos de administradores
const adminEmails = ['gastonmora1742@gmail.com']

// Configuración de opciones de autenticación
export const authOptions = {
  secret: process.env.SECRET, // Asegúrate de que la variable de entorno esté bien escrita
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session
      } else {
        return null // Devuelve null si el usuario no es un admin
      }
    },
  },
}

// Exportar NextAuth con las opciones configuradas
export default NextAuth(authOptions)

// Función para verificar si una solicitud es de un administrador
export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session || !adminEmails.includes(session.user.email)) {
    res.status(401).end()
    throw new Error('Not an admin')
  }
}
