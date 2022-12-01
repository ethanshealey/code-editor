import React from 'react'

const ResultWindow = ({ width, output, error, processing }: { width: number, output: string, error: string, processing: boolean }) => {
  return (
    <div id="result-pane" style={{ width: `${width}%`, padding: "10px" }}>{ processing ? 'Loading...' : (
      <>
        { error }
        { error && <hr /> }
        { output }
      </>
    )}</div>
  )
}

export default ResultWindow