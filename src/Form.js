import React from "react";
import { useState } from "react";

const Form = () => {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();

  const onSubmit = async (text) => {
    text.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/vi/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textInput }),
      });
      const responseText = await response.text();
      setResult(responseText);
      // Use the response text here
      console.log(responseText);
    } catch (error) {
      console.log(error);
    }
  };
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

export default Form;
