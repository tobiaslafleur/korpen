import z from 'zod';

export const loginSchema = z.object(
  {
    email: z
      .string({
        invalid_type_error: 'email must be of type string',
        required_error: 'email is required',
      })
      .email('email must be a valid email'),
    password: z
      .string({
        invalid_type_error: 'password must be of type string',
        required_error: 'password is required',
      })
      .min(8, 'password must be a minimum of 8 characters long'),
  },
  {
    invalid_type_error: 'Input must be a JSON object',
    required_error: 'Input is required',
  }
);

export type Login = z.infer<typeof loginSchema>;
