import React from 'react'

const ResultWindow = ({ width, output, message, processing }: { width: number, output: string, message: string, processing: boolean }) => {
  return (
    <div id="result-pane" style={{ width: `${width}%`, padding: "10px" }}>{ processing ? 'Loading...' : (
      <>
        { message }
        { message && <hr /> }
        { output }
      </>
    )}</div>
  )
}

export default ResultWindow