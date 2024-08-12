"use client"
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLogin } from '../../utils/schemas';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '@services/mutations/loginMutation';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const router = useRouter();
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<TLogin>({
        resolver: zodResolver(loginSchema),
    });

    const [loginUser, { loading }] = useMutation(LOGIN_MUTATION);

    const onSubmit: SubmitHandler<TLogin> = async (formData: TLogin) => {
        await loginUser({
            variables: {
                email: formData.email,
                password: formData.password
            },
        })
            .then((res) => {
                const { data } = res;
                if (data?.login?.success) {
                    router.refresh();
                } else {
                    throw new Error(data?.error?.message || 'Login failed');
                }
            })
            .catch((err) => {
                if (err instanceof Error) {
                    setError('root', { message: err.message });
                } else {
                    setError('root', { message: 'An unknown error occurred' });
                }
            });

    };

    return (
        <Center h="100vh">
            <Card w={'lg'}>
                <CardHeader>
                    <Center>
                        <Text fontSize='2xl' fontWeight={500}>Login</Text>
                    </Center>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={Boolean(errors.email)}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
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
                            <FormLabel htmlFor="password">Password</FormLabel>
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
                        <Button
                            w={'100%'}
                            mt={4}
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            type="submit">
                            Login
                        </Button>
                    </form>
                    <Link href={'/register'}>
                        <Text mt={2} color={'gray'}>
                            Create an account?
                        </Text>
                    </Link>
                </CardBody>
            </Card>
        </Center>
    );
};

export default Login;
