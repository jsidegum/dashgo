import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';


// ReferenceError: window is not defined: This error happened while generating the page. Any console logs will be displayed in the terminal window.
// Ao construir uma aplicação Next o carregamento é feito na camada do Next (SSR)... antes de rodar no client ...
// E na camada do Next (SSR) não existe o "Window"
// A biblioteca react-apexcharts precisa do "Window"
// Então usamos o "Dynamic" do next, para desativarmos SSR ao chamar o react-apexcharts


const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const options: ApexOptions = {
    chart: {
        toolbar: {
            show: false //remove menu acima do grafico
        },
        zoom: {
            enabled: false, //remove o zoom padrão dos graficos
        },
        foreColor: theme.colors.gray[500]
    },
    grid: {
        show: false
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        type: "datetime",
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            '2022-09-18T00:00:00.000Z',
            '2022-09-19T00:00:00.000Z',
            '2022-09-20T00:00:00.000Z',
            '2022-09-21T00:00:00.000Z',
            '2022-09-22T00:00:00.000Z',
            '2022-09-23T00:00:00.000Z',
            '2022-09-24T00:00:00.000Z',
        ]
    },

    fill: {
        opacity: 0.3,
        type: "gradient",
        gradient: {
            shade: "dark",
            opacityFrom: 0.7,
            opacityTo: 0.3
        }
    }

}

const series =
    [{
        name: 'series1',
        data: [31, 100, 28, 140, 42, 109, 100]
    }, {
        name: 'series2',
        data: [11, 85, 45, 75, 34, 52, 41]
    }]




export default function Dashboard() {
    return (

        <Flex direction="column" h="100vh">

            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

                <Sidebar />

                <SimpleGrid flex="1" gap="4" minChildWidth="320px">
                    <Box
                        p={["6", "8"]}
                        bg="gray.700"
                        borderRadius={8}
                    >
                        <Text fontSize="lg" mb="4">
                            Inscritos da semana
                        </Text>

                        <Chart options={options} series={series} type="area" height={160} />
                    </Box>

                    <Box
                        p={["6", "8"]}
                        bg="gray.700"
                        borderRadius={8}
                    >
                        <Text fontSize="lg" mb="4">
                            Taxa de abertura
                        </Text>
                        <Chart options={options} series={series} type="area" height={160} />
                    </Box>
                </SimpleGrid>

            </Flex>
        </Flex>

    )
}