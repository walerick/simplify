import React from "react";
import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

const Home = () => {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ` ${textInput}, summarize this to a 3 years old `,
        temperature: 0.9,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
    } catch (err) {
      console.log(err);
      setResult("Error generating response");
    }
  }

  return (
    <main className="home">
      <h3>Simplify words</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="texts"
          placeholder="Text here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <input type="submit" value="Simplify" />
      </form>

      <div className="result">{result}</div>
    </main>
  );
};

export default Home;
