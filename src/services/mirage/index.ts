import { faker } from '@faker-js/faker';
import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';


type User = {
    name: string;
    email: string;
    created_at: string;
};


export function makeServer() {

    const server = createServer({

        //serializers = Determina para o Mirage como ele deve interpretar os dados que são enviados
        serializers: {
            application: ActiveModelSerializer, //ActiveModelSerializer = Modelo de envio de dados em uma requisição só Ex.: {nome: "Juliana", email: "...", address: {Cidade: "Blumenau", Rua: "..."}}
        },

        models: {
            user: Model.extend<Partial<User>>({})
        },
        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10);
                },

            })
        },
        seeds(server) {
            server.createList("user", 15)
        },
        routes() {
            this.namespace = "api";
            this.timing = 750;//ms Toda chamada vai demorar 750 ms para acontecer

            this.get('/users', function (schema, request) {
                const { page = 1, per_page = 10 } = request.queryParams

                const total = schema.all('user').length

                const pageStart = (Number(page) - 1) * Number(per_page)
                const pageEnd = pageStart + Number(per_page)

                const users = this.serialize(schema.all('user'))
                    .users.slice(pageStart, pageEnd)

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                )
            })

            this.get("/users/:id");
            this.post("/users");

            this.namespace = "";
            this.passthrough();
        },
    });

    return server;
}