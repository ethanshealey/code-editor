import { useState } from 'react'
import Editor from "@monaco-editor/react";

const InputWindow = ({ onChange, width, input, theme }: { onChange: any, width: number, input: string, theme: string }) => {
    const [value, setValue] = useState(input || "");

    const handleEditorChange = (value: string | undefined) => {
      setValue(value || "");
      onChange("input", value);
    };
  
    return (
      <div id="code-pane" style={{ width: `${width}%` }}>
        <Editor
          height="100%"
          width={`100%`}
          language={"plaintext"}
          value={value}
          theme={theme}
          defaultValue=""
          onChange={handleEditorChange}
        />
      </div>
    )
}

export default InputWindow