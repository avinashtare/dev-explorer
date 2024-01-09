import React, { useCallback, useEffect, useState } from 'react'
import "./app.css"

function App() {
  const [PassValue, setPassValue] = useState("")
  const [PassRange, setPassRange] = useState(6)
  const [ShowNumber, setShowNumber] = useState(false)

  const generatePass = useCallback(() => {
    let PassChar = '@$*!~?|.,ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let passStr = "";
    for (let i = 0; i < PassRange; i++) {
      let randomNum = Math.floor(Math.random() * (PassChar.length - 0)) + 0;
      if (ShowNumber && Math.floor(Math.random() * 2) == 1) {
        passStr += randomNum % 10;
      }
      else {
        passStr += PassChar[randomNum];
      }

      // break if length grather
      if (passStr.length > PassRange) break;
    }
    setPassValue(passStr)
  })

  const WritePass = () => {
    window.navigator.clipboard.writeText(PassValue)
  }

  const handleCopyPass = (e) => {
    WritePass()
    e.target.style.background = "gray"
    e.target.innerText = "Copied";
    e.target.disabled = true;

    setTimeout(() => {
      e.target.style.background = "#1a60c2"
      e.target.innerText = "Copy";
      e.target.disabled = false;
    }, 1000)
  }

  useEffect(() => {
    generatePass()
  }, [PassRange, ShowNumber])

  return (
    <div className='app'>
      <div className="box">
        <div className="pass-gen">
          <h1>Password Generator</h1>
          <div className='pass-box'>
            <input type="text" value={PassValue} onChange={(e) => { setPassValue(e.target.value) }} />
            <button onClick={handleCopyPass}>Copy</button>
          </div>
          <div className='d-box'>
            <label>range:</label>
            <input type="range" value={PassRange} onChange={(e) => { setPassRange(e.target.value) }} />
            <label>{PassRange}</label>
          </div>
          <div className='d-box'>
            <label>Numbers:</label>
            <input type="checkbox" checked={ShowNumber} onChange={(e) => e.target.checked ? setShowNumber(true) : setShowNumber(false)} />
          </div>
          <div className='btn-pass-sec'>
            <button onClick={generatePass} className='btn-pass'>Generate</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App