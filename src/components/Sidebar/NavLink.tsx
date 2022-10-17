import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import Link from "next/link";
import { ActiveLink } from "../ActiveLink";

interface NavLinKProps extends ChakraLinkProps {
    icon: ElementType;
    title: string;
    href: string;
}

export function NavLink({ icon, title, href, ...rest }: NavLinKProps) {
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink display="flex" {...rest}>
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium">{title}</Text>
            </ChakraLink>
        </ActiveLink>
    )
}