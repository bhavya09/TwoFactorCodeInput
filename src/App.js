import "./styles.css";

import { useEffect, useRef, useState } from "react";

export default function App() {
  const emptyArr = ["", "", "", ""];

  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArr);

  const [missing, setMissing] = useState(emptyArr);
  const CODE = "1234";

  const handleSubmit = () => {
    const missed = inputs
      .map((item, index) => {
        if (item === "") {
          return index;
        }
      })
      .filter((item) => item || item === 0);

    setMissing(missed);

    if (missed.length) {
      return;
    }

    const userInput = inputs.join("");
    const isMatch = userInput === CODE;
    const msg = isMatch ? "CODE is valid" : "Code is Invalid";
    alert(msg);
  };

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  const handleInputChange = (e, index) => {
    const val = e.target.value;
    if (!Number(val)) {
      return;
    }
    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }
    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = "";
      setInputs(copyInputs);

      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text");

    if (!Number(data) || data.length !== inputs.length) return;

    const pasteCode = data.split("");
    setInputs(pasteCode);

    refs[inputs.length - 1].current.focus();
  };

  return (
    <div className="App">
      <h1> Two Factor Code Input </h1>
      <div>
        {emptyArr.map((item, i) => {
          return (
            <input
              value={inputs[i]}
              ref={refs[i]}
              type="text"
              maxLength="1"
              onPaste={handlePaste}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={missing.includes(i) ? "error" : ""}
            />
          );
        })}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
