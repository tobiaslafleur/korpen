'use client';

import * as Form from '@radix-ui/react-form';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Spinner from '~/components/spinner';

type SignInFormProps = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (input: SignInFormProps) => {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/sessions',
        input,
        {
          withCredentials: true,
        }
      );

      return data;
    },
    onError(error) {
      if (error instanceof AxiosError) {
        return setError('root', {
          message: error.response?.data.message || 'Something went wrong',
        });
      }

      setError('root', { message: 'Something went wrong' });
    },
    onSuccess() {
      router.push('/dashboard');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormProps>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="rounded-md border-zinc-300 bg-white p-8 shadow">
      <Form.Root onSubmit={handleSubmit(data => mutate(data))}>
        <fieldset disabled={isLoading} className="group space-y-6">
          <Form.Field name="email" className="flex flex-col space-y-2">
            <Form.Label className="text-base font-semibold text-gray-700">
              Email
            </Form.Label>
            <Form.Control
              type="text"
              {...register('email')}
              className="w-full rounded-md border-zinc-300 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-100"
              placeholder="john@doe.com"
            />
            {errors.email ? (
              <Form.Message className="text-sm font-medium text-red-500">
                {errors.email.message}
              </Form.Message>
            ) : null}
          </Form.Field>
          <Form.Field name="password" className="flex flex-col space-y-2">
            <Form.Label className="text-base font-semibold text-gray-700">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              {...register('password')}
              className="w-full rounded-md border-zinc-300 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-100"
              placeholder="••••••••"
            />
            {errors.password ? (
              <Form.Message className="text-sm font-medium text-red-500">
                {errors.password.message}
              </Form.Message>
            ) : null}
            {errors.root ? (
              <Form.Message className="text-sm font-medium text-red-500">
                {errors.root.message}
              </Form.Message>
            ) : null}
          </Form.Field>
          <Form.Submit className="inline-flex w-full items-center justify-center rounded-md bg-indigo-700 px-4 py-2 font-medium text-white transition hover:bg-indigo-600 focus:border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <Spinner className="absolute h-6 w-6 fill-white group-enabled:opacity-0" />
            <span className="group-disabled:opacity-0">Logga in</span>
          </Form.Submit>
        </fieldset>
      </Form.Root>
    </div>
  );
}
