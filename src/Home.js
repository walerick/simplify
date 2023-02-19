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
        prompt: `Prompt: Given the following text, please generate a concise summary of the main points:
        [${textInput}]
        Please generate a summary that captures the most important information and key ideas from the input. The summary should be no longer than three to four sentences and should be written in a clear and concise manner.
        The following conditions must be met before proceeding to execute the prompt above:
        The given text must not be empty. e.g [].
        The given text must not involve mathematical calculations e.g. 2+3.
        The given text must not contain only one word. e.g Boy.
        If the conditions are not met , give an Error response relating to the conditions mentioned above.`,
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
