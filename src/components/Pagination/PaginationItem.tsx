import { Box, Button, Stack } from "@chakra-ui/react";
import PageLoader from "next/dist/client/page-loader";

interface PaginationItemProps {
    page: number;
    isCurrent?: boolean;
    onPageChange: (page: number) => void;
}

export function PaginationItem({ isCurrent = false, page, onPageChange }: PaginationItemProps) {

    if (isCurrent) {

        return (
            <Button
                size="sm"
                fontSize="xs"
                w="4"
                colorScheme="pink"
                disabled
                _disabled={{
                    bg: "pink.500",
                    cursor: 'default'
                }}
            >
                {page}
            </Button>
        )

    }


    return (

        <Button
            size="sm"
            fontSize="xs"
            w="4"
            bg="gray.700"
            _hover={{
                bg: "gray.500"
            }}
            onClick={() => onPageChange(page)}
        >
            {page}
        </Button>

    )


}