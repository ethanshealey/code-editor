import { useState, useEffect } from 'react'
import CodeWindow from './components/CodeWindow'
import ResultWindow from './components/ResultWindow'
import Header from './components/Header'
import { defineTheme } from './static/themes'
import axios from 'axios'
import Language from './models/Language'
import { languageOptions } from './static/languages'
import InputWindow from './components/InputWIndow'

function App() {

  const [ code, setCode ] = useState('')
  const [ language, setLanguage ] = useState<Language | undefined>(languageOptions[0])
  const [ theme, setTheme ] = useState('')
  const [ processing, setProcessing ] = useState(false)
  const [ output, setOutput ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ showCode, setShowCode ] = useState(true)
  const [ input, setInput ] = useState('')

  useEffect(() => {
    defineTheme("blackboard").then((_) => setTheme("blackboard"))
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage((_) => lang)
  }

  const changeTheme = (th: string) => {
    defineTheme(th).then((_) => setTheme(th))
  }

  const onChange = (type: string, value: string) => {
    switch (type) {
      case "code": {
        setCode(value);
        break;
      }
      case "input": {
        setInput(value)
        break;
      }
      default: {
        console.warn("case not handled!", type, value);
      }
    }
  }

  const run = () => {
    setProcessing(true)

    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': `${process.env.REACT_APP_RAPID_API_HOST}`
      },
      body: `{"language_id":${language?.id},"source_code":"${window.btoa(code)}","stdin":"${window.btoa(input)}"}`
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if(json.message) {
          setMessage(json.message)
          setProcessing(false)
        }
        else {
          handleResults(json.token)
          setProcessing(false)
        }
      })
      .catch(err => console.error('error:' + err));
  }
  
  const handleResults = (token: string) => {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': `${process.env.REACT_APP_RAPID_API_HOST}`
      }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
      setMessage(json.message !== null ? window.atob(json.message) : '')
      setOutput(window.atob(json.stdout))
    })
    .catch(err => console.error('error:' + err));
  }

return (
  <>
    <div id="main">
      <Header changeLanguage={changeLanguage} changeTheme={changeTheme} language={language} theme={theme} run={run} processing={processing} showCode={showCode} setShowCode={setShowCode} />
      <div id="editor-body">
        { 
          showCode ?
          <CodeWindow onChange={onChange} width={50} code={code} language={language} theme={theme} /> :
          <InputWindow onChange={onChange} width={50} input={input} theme={theme} />
        }
        <div id="divider" className="noselect">||</div>
        <ResultWindow width={50} output={output} message={message} processing={processing} />
      </div>
    </div>
    <div id="error">Please only use on desktop</div>
  </>
  

);
}

export default App;
