import { defineAbilityFor, projectSchema } from '@saas/auth'

const project = projectSchema.parse({ id: 'project-id', ownerId: 'user-id' })

const ability = defineAbilityFor({ role: 'ADMIN', id: 'user-id' })

const userCanInvite = ability.can('delete', project)

console.log(userCanInvite)
