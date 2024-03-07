import axios from "axios";
import "./App.css";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { ChangeEvent, FormEvent, useState } from "react";

function App() {
  const [value, setValue] = useState(15); // Valor inicial
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://ipassword-api.vercel.app/generate/${value}`
      );
      const password = response.data;
      setGeneratedPassword(password.password);
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 flex-row bg-slate-50">
        <CardHeader>
          <CardTitle className="text-center">Gerador de Senhas</CardTitle>
        </CardHeader>
        <CardContent>
          <h2>Senha gerada:</h2>
          <p className="bg-slate-200 p-6 mb-6 text-center">
            {generatedPassword}
          </p>
          <form onSubmit={handleSubmit}>
            <label>Quantidade de Caracteres:</label>
            <div className="flex p-3 bg-slate-200 mb-3">
              <input
                type="range"
                min="3"
                max="30"
                value={value}
                onChange={handleChange}
                className="w-full"
              />
              <p className="ml-3 font-bold min-w-4 text-center">{value}</p>
            </div>
            <Button className="w-full" type="submit">
              Gerar Nova Senha
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
