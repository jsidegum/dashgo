import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 1; // paginas ao lado da atual... se estivermos na 5, sera exibido: 1 ... 4 5 6 .... 20

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
        .map((_, i) => i + from + 1)
        .filter(page => page > 0);
}

export function Pagination({
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange,
}: PaginationProps) {

    const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

    const previousPages =
        currentPage > 1
            ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
            : [];

    const nextPages =
        currentPage < lastPage
            ? generatePagesArray(
                currentPage,
                Math.min(currentPage + siblingsCount, lastPage)
            )
            : [];

    return (
        <Stack
            direction={["column", "row"]}
            spacing="6"
            mt="8"
            justify="space-between"
            align="center"
        >

            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>

            <Stack direction="row" spacing="2">

                {currentPage > 1 + siblingsCount && (
                    <>
                        <PaginationItem
                            page={1}
                            onPageChange={onPageChange}
                        />
                        {currentPage > 2 + siblingsCount && (
                            <Text
                                color="gray.300"
                                width="8"
                                textAlign="center"
                            >
                                ...
                            </Text>
                        )}
                    </>
                )}

                {previousPages.map(page => (
                    <PaginationItem
                        key={page}
                        page={page}
                        onPageChange={onPageChange}
                    />
                ))}

                <PaginationItem
                    page={currentPage}
                    isCurrent
                    onPageChange={onPageChange}

                />

                {nextPages.map(page => (
                    <PaginationItem
                        key={page}
                        page={page}
                        onPageChange={onPageChange}
                    />
                ))}

                {currentPage + siblingsCount < lastPage && (
                    <>
                        {currentPage + 1 + siblingsCount < lastPage && <Text>...</Text>}
                        <PaginationItem page={lastPage} onPageChange={onPageChange}
                        />

                    </>
                )}
            </Stack>

        </Stack>

    )
}