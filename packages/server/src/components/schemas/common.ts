import z from 'zod';

export const paramsIdSchema = z.object({
  id: z.string({
    invalid_type_error: 'id must be of type string in params',
    required_error: 'id is required in params',
  }),
});

export type ParamsId = z.infer<typeof paramsIdSchema>;
