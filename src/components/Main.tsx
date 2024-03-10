import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import CopyButton from "./CopyButton";

function Main() {
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
          <CardTitle className="text-center text-slate-800">
            Gerador de Senhas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2>Senha gerada:</h2>
          <div className="flex justify-end items-center h-24 bg-slate-200">
            <p className="h-full w-full flex justify-center items-center font-bold text-center text-slate-800">
              {generatedPassword}
            </p>
            <CopyButton text={generatedPassword} />
          </div>

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
              <p className="ml-3 font-bold min-w-4 text-center text-slate-800">
                {value}
              </p>
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

export default Main;
