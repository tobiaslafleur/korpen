import z from 'zod';

export const createWorkoutSchema = z.object({
  name: z.string({
    invalid_type_error: 'name must be of type string',
    required_error: 'name is required',
  }),
  location: z.string({
    invalid_type_error: 'location must be of type string',
    required_error: 'location is required',
  }),
  day_of_week: z
    .number({
      invalid_type_error: 'day_of_week must be of type number',
      required_error: 'day_of_week is required',
    })
    .int('day_of_week must be an integer')
    .min(1, "day_of_week can't be lower than 1")
    .max(7, "day_of_week can't be higher than 7"),
  time_of_day: z
    .string({
      invalid_type_error: 'time_of_day must be of type string',
      required_error: 'time_of_day is required',
    })
    .regex(
      /^(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$/,
      'time_of_day must have the format HH:MM:SS'
    ),
  is_recurring: z.boolean({
    invalid_type_error: 'is_recurring must be of type boolean',
    required_error: 'is_recurring is required',
  }),
  is_cancelled: z.boolean({
    invalid_type_error: 'is_cancelled must be of type boolean',
    required_error: 'is_cancelled is required',
  }),
});

export const updateWorkoutSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be of type string',
    })
    .optional(),
  location: z
    .string({
      invalid_type_error: 'location must be of type string',
    })
    .optional(),
  day_of_week: z
    .number({
      invalid_type_error: 'day_of_week must be of type number',
    })
    .int('day_of_week must be an integer')
    .min(1, "day_of_week can't be lower than 1")
    .max(7, "day_of_week can't be higher than 7")
    .optional(),
  time_of_day: z
    .string({
      invalid_type_error: 'time_of_day must be of type string',
    })
    .regex(
      /^(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$/,
      'time_of_day must have the format HH:MM:SS'
    )
    .optional(),
  is_recurring: z
    .boolean({
      invalid_type_error: 'is_recurring must be of type boolean',
    })
    .optional(),
  is_cancelled: z
    .boolean({
      invalid_type_error: 'is_cancelled must be of type boolean',
    })
    .optional(),
});

export type CreateWorkout = z.infer<typeof createWorkoutSchema>;
export type UpdateWorkout = z.infer<typeof updateWorkoutSchema>;
