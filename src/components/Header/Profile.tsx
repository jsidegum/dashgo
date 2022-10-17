import { Flex, Text, Box, Avatar } from '@chakra-ui/react'

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">

            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Juliana Sidegum</Text>
                    <Text color="gray.300" fontSize="small">
                        jsidegum@gmail.com
                    </Text>
                </Box>
            )}

            <Avatar size="md" name="Juliana Sidegum" >
            </Avatar>
        </Flex>
    )
}