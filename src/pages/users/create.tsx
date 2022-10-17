import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, Divider, VStack, SimpleGrid, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";


type CreateUserFormData = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

const createUserFormSchema = yup.object().shape({
    name: yup
        .string()
        .required("Nome obrigatório!"),
    email: yup
        .string()
        .required("E-mail obrigatório!")
        .email("O campo precisa ser um email válido"),
    password: yup
        .string()
        .required("Senha obrigatória!")
        .min(6, 'Mínimo de 6 caracteres'),
    password_confirmation: yup
        .string()
        .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais")
});


export default function CreateUser() {

    const router = useRouter()

    const createUser = useMutation(
        async (user: CreateUserFormData) => {
            const response = await api.post('users', {
                user: {
                    ...user,
                    created_at: new Date(),
                },
            })

            return response.data.user

        }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users'])//invalida o cash e recarrega os users novamente
        },
    },);


    const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
        resolver: yupResolver(createUserFormSchema)
    });

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values,) => {
        await createUser.mutateAsync(values)
        router.push('/users') //envia usuário de volta para a lista de users
    }

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

                <Sidebar />

                <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size="lg" fontWeight="normal">Criar Usuários</Heading>
                    <Divider marginY="6" borderColor="gray.700" />
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
                            <Input
                                name="name"
                                label="Nome completo"
                                type="text"
                                error={formState.errors.name}
                                {...register('name')}
                            />
                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                error={formState.errors.email}
                                {...register('email')}
                            />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
                            <Input
                                name="password"
                                type="password"
                                label="Senha"
                                error={formState.errors.password}
                                {...register('password')}
                            />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirmação da senha"
                                error={formState.errors.password_confirmation}
                                {...register('password_confirmation')}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button
                                type="submit"
                                colorScheme="pink"
                                isLoading={formState.isSubmitting} //Icone de carregando
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>

                </Box>

            </Flex>
        </Box>
    )
}