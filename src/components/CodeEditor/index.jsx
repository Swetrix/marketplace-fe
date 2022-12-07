import React from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { dracula } from '@uiw/codemirror-theme-dracula'

const CodeEditor = ({ code, onChangeCodeValue }) => {
  return (
    <div className='text-[16px] lg:max-w-[80vw] max-w-[800px] mx-auto'>
      <ReactCodeMirror
        value={code}
        theme={dracula}
        height='600px'
        extensions={[javascript({ jsx: true })]}
        onChange={onChangeCodeValue}
        options={{
          mode: 'javascript',
          lineNumbers: true,
          lineWrapping: true,
          history: true,
          extraKeys: {
            'Ctrl-Space': 'autocomplete',
          },
          closeBrackets: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
          matchTags: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          autocompletion: true,
          styleActiveLine: true,
          styleSelectedText: true,
          highlightSelectionMatches: true,
          showCursorWhenSelecting: true,
          showTrailingSpace: true,
          continueComments: true,
          indentUnit: 2,
          tabSize: 2,
          indentWithTabs: false,
          smartIndent: true,
          electricChars: true,
          keyMap: 'sublime',
        }}
      />
    </div>
  )
}

export default CodeEditor
