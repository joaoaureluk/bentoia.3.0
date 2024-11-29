import express from "express";
import userRoutes from "./routes/user-routes";
import authRoutes from "./routes/authenticate-routes";
import geminiRoutes from "./routes/gemini-routes";
import cors from "cors"; // Importe o cors

const app = express();
const PORT = 3005;

app.use(cors());

app.use(express.json());

app.use(userRoutes);
app.use(authRoutes);
app.use(geminiRoutes);

app.listen(PORT, () => {
  console.log(`Server esta rodando em http://localhost:${PORT}`);
});
