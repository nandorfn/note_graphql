"use client"
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGISTER_MUTATION } from '@services/mutations';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerSchema, TRegister } from '@utils/schemas';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Center,
  Card,
  CardHeader,
  CardBody,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser, { loading }] = useMutation(REGISTER_MUTATION);
  
  const onSubmit: SubmitHandler<TRegister> = async (formData: TRegister) => {
    try {
      const { data } = await registerUser({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });
  
      if (data?.register?.success) {
        return router.push('/login');
      } else {
        throw new Error(data?.register?.message || 'Registration failed');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('root', { message: err.message });
      } else {
        setError('root', { message: 'An unknown error occurred' });
      }    
    }
  };  
    
  return (
    <Center h="100vh">
      <Card w={'lg'}>
        <CardHeader>
          <Center>
            <Text fontSize='2xl' fontWeight={500}>Register</Text>
          </Center>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.username)}>
              <FormLabel
                htmlFor="username"
              >
                Username
              </FormLabel>
              <Input
                id="username"
                placeholder="username"
                {...register('username', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel
                htmlFor="email"
              >
                Email
              </FormLabel>
              <Input
                id="email"
                type='email'
                placeholder="email"
                {...register('email', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel
                htmlFor="password"
              >
                Password
              </FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="password"
                {...register('password', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.confirmPassword)}>
              <FormLabel
                htmlFor="confirmPassword">
                Confirm Password
              </FormLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors?.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.root)}>
              <FormErrorMessage>
                {errors.root && errors?.root?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              w={'100%'}
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting || loading}
              type="submit">
              Register
            </Button>
          </form>
          <Link href={'/login'}>
            <Text mt={2} color={'gray'}>
              Already, have an account? Login here!
            </Text>
          </Link>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Register;