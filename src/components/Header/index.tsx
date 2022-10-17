import { Flex, Icon, IconButton, useBreakpoint, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri';
import { useSideBarDrawer } from '../../contexts/SideBarDrawerContext';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header() {

    const { onOpen } = useSideBarDrawer();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })


    return (
        <Flex
            as="header"
            w="100%"
            h="20"
            maxWidth={1480}
            mx="auto" //marginX
            mt="4" //marginTop
            px="6" //paddingX
            align="center"
        >

            {
                !isWideVersion && (
                    <IconButton
                        aria-label="Open navigation"
                        icon={<Icon as={RiMenuLine} />}
                        fontSize="24"
                        variant="unstyled"
                        onClick={onOpen}
                        mr="2"
                    >
                    </IconButton>
                )

            }

            <Logo />

            {isWideVersion && (
                <SearchBox />
            )}

            <Flex align="center" ml="auto">
                <NotificationsNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>

        </Flex>

    )
}