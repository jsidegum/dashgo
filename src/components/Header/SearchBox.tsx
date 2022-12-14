import { Flex, Input as ChakraInput, Icon } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri';

export function SearchBox() {
    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="8" //paddingX
            ml="6"
            maxWidth={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg="gray.700"
            borderRadius="full"
        >

            <ChakraInput
                color="gray.50"
                variant="unstyled"
                px="4" //padding x
                mr="4" //margin right
                placeholder="Buscar na plataforma"
                _placeholder={{ color: 'gray.400' }}

            />

            <Icon as={RiSearchLine} fontSize='20' />
        </Flex>
    )
}