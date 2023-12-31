import z from 'zod';

export const createUserSchema = z
  .object(
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
      confirm_password: z.string({
        invalid_type_error: 'confirm_password must be of type string',
        required_error: 'confirm_password is required',
      }),
      first_name: z.string({
        invalid_type_error: 'first_name must be of type string',
        required_error: 'first_name is required',
      }),
      last_name: z.string({
        invalid_type_error: 'last_name must be of type string',
        required_error: 'last_name is required',
      }),
    },
    {
      invalid_type_error: 'Input must be a JSON object',
      required_error: 'Input is required',
    }
  )
  .refine(schema => schema.password === schema.confirm_password, {
    message: 'confirm_password and password must match',
    path: ['confirm_password'],
  });

export const updateUserSchema = z.object(
  {
    email: z
      .string({
        invalid_type_error: 'email must be of type string',
      })
      .email('email must be a valid email')
      .optional(),
    first_name: z
      .string({
        invalid_type_error: 'first_name must be of type string',
      })
      .optional(),
    last_name: z
      .string({
        invalid_type_error: 'last_name must be of type string',
      })
      .optional(),
  },
  {
    invalid_type_error: 'Input must be a JSON object',
    required_error: 'Input is required',
  }
);

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
