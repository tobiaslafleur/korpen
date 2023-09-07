/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
    sanitizeRequest: any;
  }

  export interface FastifyRequest {
    session: {
      sessionId: string;
      userId: string;
    };
  }
}
