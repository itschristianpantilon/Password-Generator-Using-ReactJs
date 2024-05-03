import React, { useState } from 'react';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const numbers = '0123456789';
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseLetters ='abcdefghijklmnopqrstuvwxyz';
const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";

function App() {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(10)
  const [upperCase, setupperCase] = useState(false)
  const [lowerCase, setlowerCase] = useState(false)
  const [addNumbers, setaddNumbers] = useState(false)
  const [addSymbols, setaddSymbols] = useState(false)

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }

  const generatePassword = () => {
    if (!upperCase && !lowerCase && !addNumbers && !addSymbols){
      notify("You must select atleast one checkbox to generate password", true)
    }else {
      let characterList = ""
      if(upperCase){
        characterList = characterList + upperCaseLetters
      }
      if(lowerCase){
        characterList = characterList + lowerCaseLetters
      }
      if(addNumbers){
        characterList = characterList + numbers
      }
      if(addSymbols){
        characterList = characterList + specialCharacters
      }
      setPassword(createPassword(characterList))
      notify("Password Generated Successfully", false)
    }

  }
  const createPassword = (characterList) => {
    let password = ""
    const characterListLength = characterList.length
    for (let i = 0; i < passwordLength; i++){
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = (password) => {

    navigator.clipboard.writeText(password)
  }

  const copyPassword = (e) => {
    if(password === ""){
      notify("Password successfully copied to clipboard",true)
    }else {
      copyToClipboard(password)
      notify("Password successfully copied to clipboard")
    }
  }
  
  return (
    <div className='app__main'>
      <div className="app__container">
        <h2>Password Generator</h2>
          <div className="app__password-generated-container">
            <h4>{password}</h4>
            <button onClick={copyPassword}>
              <i className="bi bi-copy" />
            </button>
          </div>

          <div className="app__password-container">
            <label htmlFor="password-length">Password length:</label>
            <input className='pl' type="number" name='password-strength' max={26} min={8} defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} />
          </div>

          <div className="app__password-container">
            <label htmlFor="">Add Uppercase Letters</label>
            <input type="checkbox" name='' id='' checked={upperCase} onChange={(e) => setupperCase(e.target.checked)} />
          </div>

          <div className="app__password-container">
            <label htmlFor="">Add Lowercase Letters</label>
            <input type="checkbox" name='' id='' checked={lowerCase} onChange={(e) => setlowerCase(e.target.checked)} />
          </div>

          <div className="app__password-container">
            <label htmlFor="">Include Numbers</label>
            <input type="checkbox" name='' id='' checked={addNumbers} onChange={(e) => setaddNumbers(e.target.checked)} />
          </div>

          <div className="app__password-container">
            <label htmlFor="">Include Symbols</label>
            <input type="checkbox" name='' id='' checked={addSymbols} onChange={(e) => setaddSymbols(e.target.checked)} />
          </div>

          <button className='generate-password' onClick={generatePassword}>Generate Password</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      </div>

    </div>
  )
}


export default App
