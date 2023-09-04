import fastify from 'fastify'

export const buildServer = () => {
  const server = fastify()

  return server
}
