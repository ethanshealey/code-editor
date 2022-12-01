import { useState, useEffect } from 'react'
import CodeWindow from './components/CodeWindow'
import ResultWindow from './components/ResultWindow'
import Header from './components/Header'
import { defineTheme } from './static/themes'
import axios from 'axios'
import Language from './models/Language'
import { languageOptions } from './static/languages'

function App() {

  const [ code, setCode ] = useState('')
  const [ language, setLanguage ] = useState<Language | undefined>(languageOptions[0])
  const [ theme, setTheme ] = useState('')
  const [ processing, setProcessing ] = useState(false)
  const [ output, setOutput ] = useState('')
  const [ error, setError ] = useState('')

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
      body: `{"language_id":${language?.id},"source_code":"${window.btoa(code)}","stdin":"SnVkZ2Uw"}`
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        handleResults(json.token)
        setProcessing(false)
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
      setOutput(window.atob(json.compile_output))
      setOutput(window.atob(json.stdout))
    })
    .catch(err => console.error('error:' + err));
  }

return (
  <>
    <div id="main">
      <Header changeLanguage={changeLanguage} changeTheme={changeTheme} language={language} theme={theme} run={run} processing={processing} />
      <div id="editor-body">
        <CodeWindow onChange={onChange} width={50} code={code} language={language} theme={theme} />
        <div id="divider" className="noselect">||</div>
        <ResultWindow width={50} output={output} error={error} processing={processing} />
      </div>
    </div>
    <div id="error">Please only use on desktop</div>
  </>
  

);
}

export default App;
