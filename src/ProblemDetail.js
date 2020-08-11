import React, { useState } from "react";
import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";

import { postUserSolution } from "./api/problems";

export default function ProblemDetail({ problem }) {
  const [code, setcode] = useState("");
  const [isModalShowing, setisModalShowing] = useState(false);
  const [codeResult, setcodeResult] = useState("");

  function validateAnswer() {
    postUserSolution(problem._id, code).then((data) => {
      setisModalShowing(true);
      if (data.result !== "에러") {
        setcodeResult(data.result);
      } else {
        setcodeResult(data.detail);
      }
    });
  }
  return (
    <div className="problem">
      {isModalShowing && (
        <div>
          <div
            className="modal-overlay"
            onClick={() => setisModalShowing(false)}
          ></div>
          <div className="modal">
            {codeResult}
            <button class="closeButton" onClick={() => setisModalShowing(false)}>Close</button>
          </div>
        </div>
      )}
      <section className="description">
        <h3>{problem.title}</h3>
        <p>{problem.description}</p>
      </section>
      <section className="code-editor">
        <CodeMirror
          onChange={function onChange(newValue) {
            setcode(newValue);
          }}
          value={`function solution () {}`}
          options={{
            mode: "javascript",
          }}
        />
        <button onClick={validateAnswer}>제출</button>
      </section>
    </div>
  );
}
