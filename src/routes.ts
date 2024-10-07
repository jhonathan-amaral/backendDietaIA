import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateNutritionController } from "./controllers/CreateNutritionController";

//rotas da nossa aplicação
export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
    let response =
      '```json\n{\n  "nome": "Jhonathan",\n  "sexo": "Masculino",\n  "idade": 30,\n  "altura": 185,\n  "peso": 86,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "07:00",\n      "nome": "Café da Manhã",\n      "alimentos": [\n        "2 fatias de pão integral",\n        "2 ovos mexidos com queijo cottage",\n        "1 banana",\n        "200ml de leite desnatado",\n        "Café preto ou chá verde"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da Manhã",\n        "alimentos": [\n          "1 iogurte grego com granola",\n          "1 Maçã"\n        ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoço",\n      "alimentos": [\n        "150g de frango grelhado",\n        "100g de arroz integral",\n        "100g de batata doce",\n        "Salada verde com azeite de oliva"\n      ]\n    },\n    {\n      "horario": "16:00",\n      "nome": "Lanche da Tarde",\n      "alimentos": [\n        "1 scoop de whey protein",\n        "1 batata doce média"\n      ]\n    },\n    {\n      "horario": "20:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de peixe grelhado",\n        "100g de batata doce",\n        "Salada verde com azeite de oliva"\n      ]\n    },\n    {\n      "horario": "22:00",\n      "nome": "Pré-Sono",\n      "alimentos": [\n        "1 scoop de caseína",\n        "1 colher de sopa de azeite de oliva"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Whey Protein",\n    "Creatina",\n    "BCAA",\n    "Glutamina",\n    "Ômega 3"\n  ]\n}\n```';

    try {
      let jsonString = response
        .replace(/```\w*\n/g, "")
        .replace(/\```/g, "")
        .trim();
      let jsonObject = JSON.parse(jsonString);
      reply.send({ data: jsonObject });
    } catch (error) {}
    reply.send({ ok: true });
  });

  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply);
    }
  );
}
