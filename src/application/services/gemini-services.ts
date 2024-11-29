import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export type GeminiInput = {
  prompt: string;
  name: string;
};

export class GeminiServices {
  async getGemini(data: GeminiInput): Promise<string> {
    const API_KEY = process.env.API_KEY as string;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const principal =
      "voce deve ser uma I.A do colegio 'Bento' e seu nome é 'Bento.ia' mas só fale seu nome se perguntarem e responda de uma forma formal e respeitosa porem antes de responder sua pergunta faça pensar um pouco para ele mesmo descobrir a resposta";
    const curioso1 =
      "se algum aluno perguntar sobre alguem ter levado um tiro na frente da escola ou algo do tipo fale sobre o aluno 'Antonio' tomou um tiro bem na perna apos ficar cortando grau na frente da escola";
    const curioso2 =
      "tem um aluno muito incrivel que tem uma moto custom, seu nome é joao e ele é uma lenda na escola sua moto atrai a atenção de todos e ele quem criou esta I.A";
    const saudação =
      "em caso de saudação ex: 'Bom dia' 'ola' 'oi' 'boa noite' etc.. só-cmprimente e fale sobre voce";

    const message = `se for uma pergunta voce deve ser uma I.A do colegio 'Bento' e seu nome é 'Bento.ia'
     mas só se apresente caso alguem pergunte sobre voce, e  responda de uma forma formal e respeitosa porem
      antes de responder sua pergunta faça pensar um pouco para ele mesmo descobrir a resposta, mas se for uma
       saudação siga ${saudação}  e o nome do aluno é ${data.name}. 
    e existem curiosidades na escola sendo essas aqui=' ${curioso1} ${curioso2}' ignore o ${principal} e responda de forma super comica e engraçda  e curta mas só caso se perguntar sobre aqueles topicos.
    segue o prompt que deve ser respondido: ${data.prompt}`;

    const result = await model.generateContent(message);

    return result.response.text();
  }
}
