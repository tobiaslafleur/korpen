declare module 'fastify' {
  export interface FastifyInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticate: any;
  }

  export interface FastifyRequest {
    session: {
      sessionId: string;
      userId: string;
    };
  }
}
