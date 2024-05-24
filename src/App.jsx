import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [error, setError] = useState("");

  async function generateAnswer(e) {
    e.preventDefault();
    setError("");
    setGeneratingAnswer(true);
    setAnswer("Loading your answer...");
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCVvLh7h275WW6u5bmR1SqinxsCxIO6OYU",
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setError("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  }

  const clearFields = () => {
    setQuestion("");
    setAnswer("");
    setError("");
  };

  return (
    <>
      <div className="bg-white h-screen p-3">
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 py-2"
        >
          <a href="https://github.com/thedarkking01" target="_blank">
            <h1 className="text-3xl text-center">Baisu</h1>
          </a>
          <textarea
            required
            className="border rounded w-11/12 my-2 min-h-fit p-3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
            disabled={generatingAnswer}
          >
            {generatingAnswer ? "Generating..." : "Generate answer"}
          </button>
          <button
            type="button"
            className="bg-gray-300 p-3 rounded-md hover:bg-gray-400 ml-2 transition-all duration-300"
            onClick={clearFields}
          >
            Clear
          </button>
        </form>
        {error && (
          <div className="w-full md:w-2/3 m-auto text-center rounded bg-red-100 my-1 p-3">
            <p>{error}</p>
          </div>
        )}
        {!error && answer && (
          <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 my-1">
            <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

