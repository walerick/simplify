import React from "react";
import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

const Home = () => {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Summarize this to a 3 years old containing not more than 30 words: ${textInput}`,
        temperature: 0.9,
        max_tokens: 100,
      });
      const words = response.data.choices[0].text.split(" ");
      for (let i = 0; i < words.length; i++) {
        setResult(words.slice(0, i + 1).join(" "));
        await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for 300 milliseconds between each word
      }
    } catch (err) {
      console.log(err);
      setResult("Error generating response");
    }
  }

  return (
    <main className="home">
      <h3>Simplify words</h3>
      <form onSubmit={onSubmit}>
        <textarea
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
