import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function resetPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/reset',
    {
      schema: {
        tags: ['auth'],
        summary: 'Get authenticated user profile',
        body: z.object({
          code: z.string(),
          password: z.string().min(6),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { code, password } = request.body

      const tokenFromCode = await prisma.user.findUnique({
        where: { id: code },
      })

      // we don´t want people to know if user already exists
      if (!tokenFromCode) {
        throw new UnauthorizedError()
      }

      const passwordHash = await hash(password, 6)

      await prisma.user.update({
        where: {
          id: tokenFromCode.id,
        },
        data: {
          passwordHash,
        },
      })

      return reply.status(204).send()
    },
  )
}
