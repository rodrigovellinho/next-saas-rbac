import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recover',
    {
      schema: {
        tags: ['auth'],
        summary: 'Get authenticated user profile',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          /*  201: z.null(), */
          201: {
            code: z.string(),
          },
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body
      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      // we don´t want people to know if user already exists
      if (!userFromEmail) {
        return reply.status(201).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })

      // Send email with password recover link

      console.log(`Recover password token: ${code}`)

      return reply.status(201).send({ code })
    },
  )
}
