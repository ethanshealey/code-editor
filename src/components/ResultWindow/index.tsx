import React from 'react'

const ResultWindow = ({ width, output, processing }: { width: number, output: string, processing: boolean }) => {
  return (
    <div id="result-pane" style={{ width: `${width}%`, padding: "10px" }}>{ processing ? 'Loading...' : output }</div>
  )
}

export default ResultWindow