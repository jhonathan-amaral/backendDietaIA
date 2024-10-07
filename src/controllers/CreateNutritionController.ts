import type { FastifyRequest, FastifyReply } from "fastify";
import { CreateNutritionService } from "../services/CreateNutritionService";

export interface DataProps {
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  objective: string;
  level: string;
}

//classe de criação para criar nosso controle que comunica com o serviço
class CreateNutritionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, weight, height, age, gender, objective, level } =
      request.body as DataProps;

    //cria a instancia do service
    const createNutrition = new CreateNutritionService();
    //executa o método do service
    const nutrition = await createNutrition.execute({
      name,
      weight,
      height,
      age,
      gender,
      objective,
      level,
    });
    //envia para o front os dados do service
    reply.send(nutrition);
  }
}

export { CreateNutritionController };
