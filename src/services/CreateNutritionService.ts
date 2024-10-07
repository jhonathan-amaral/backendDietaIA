//FICA RESPONSÁVEL PELA REGRA DE NEGOCIO

import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataProps } from "../controllers/CreateNutritionController";

class CreateNutritionService {
  async execute({
    name,
    weight,
    age,
    height,
    gender,
    level,
    objective,
  }: DataProps) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(
      `Crie uma dieta completa para uma pessoa com nome: ${name} 
      do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, 
      idade: ${age} anos e com foco e objetivo em ${objective}, 
      atualmente nível de atividade: ${level} e ignore qualquer 
      outro parametro que não seja os passados, retorne em json com as 
      respectivas propriedades, propriedade nome o nome da pessoa, 
      propriedade sexo com sexo, propriedade idade, propriedade altura, 
      propriedade peso, propriedade objetivo com o objetivo atual, 
      propriedade refeições com uma array contendo dentro cada objeto 
      sendo uma refeição da dieta e dentro de cada refeição a propriedade horário 
      com horário da refeição, propriedade nome com nome e a propriedade 
      alimentos com array contendo os alimentos dessa refeição e pode 
      incluir uma propreidade como suplementos contendo array com 
      sugestão de suplemento que é indicado para o sexo dessa pessoa e o 
      objetivo dela e não retorne nenhuma observação alem das passadas no prompt, 
      retorne em json e nenhuma propriedade pode ter acento.`
    );

    if (response.response && response.response.candidates) {
      //quebramos o código para recebermos os dados que queremos
      const jsonText = response.response.candidates[0]?.content.parts[0]
        .text as string;
        //convertemos o nosso código recebido para retornar um json
      let jsonString = jsonText
        .replace(/```\w*\n/g, "")
        .replace(/\```/g, "")
        .trim();
      let jsonObject = JSON.parse(jsonString);

      return { data: jsonObject };
    }
    console.log(JSON.stringify(response, null, 2));

    return { ok: true };
  }
}

export { CreateNutritionService };
