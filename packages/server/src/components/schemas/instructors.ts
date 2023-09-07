import z from 'zod';

export const createInstructorSchema = z.object(
  {
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
);

export const updateInstructorSchema = z.object(
  {
    first_name: z
      .string({
        invalid_type_error: 'first_name must be of type string',
        required_error: 'first_name is required',
      })
      .optional(),
    last_name: z
      .string({
        invalid_type_error: 'last_name must be of type string',
        required_error: 'last_name is required',
      })
      .optional(),
  },
  {
    invalid_type_error: 'Input must be a JSON object',
    required_error: 'Input is required',
  }
);

export type CreateInstructor = z.infer<typeof createInstructorSchema>;
export type UpdateInstructor = z.infer<typeof updateInstructorSchema>;
