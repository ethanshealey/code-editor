import React, { useState } from 'react'
import Editor from "@monaco-editor/react";
import Language from '../../models/Language';

const CodeWindow = ({ onChange, width, code, language, theme }: { onChange: any, width: number, code: string, language: Language | undefined, theme: string }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value: string | undefined) => {
    setValue(value || "");
    onChange("code", value);
  };

  return (
    <div id="code-pane" style={{ width: `${width}%` }}>
      <Editor
        height="100%"
        width={`100%`}
        language={language?.value || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// get coding!"
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default CodeWindow