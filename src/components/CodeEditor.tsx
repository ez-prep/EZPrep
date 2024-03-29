// "use client";
import "../assets/css/editor.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropDown from "./LanguageDropDown";
import Button from "@mui/material/Button";
import axios, { AxiosError } from "axios";
import { MessagesContext } from "../contexts/MessagesContext";
import { MessageTypes } from "../reducers/MessagesReducer";
import language from "../assets/static/language";
import getProblemInfo from "../apis/CodeEditorAPI";
import { ProblemInfo } from "../reducers/ProblemInfo";
import { commentProblemStatement } from "../utils/CodeFormatter";

function CodeEditor() {
  const [languageChoice, setLanguageChoice] = useState(language[0]);
  const [problemInfo, setProblemInfo] = useState<ProblemInfo | null>(null);
  const editorRef = useRef(null as any);
  const { dispatch } = useContext(MessagesContext);
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  function submitValue() {
    // TODO: Extract network request into service
    // problem_id
    // problem_statement

    // submit code editor value
    axios
      .post("https://ezprep.discovery.cs.vt.edu/api/submit", {
        problem_id: -1,
        code: editorRef.current?.getValue(),
        language: languageChoice,
      })
      .then((response) => {
        dispatch({
          type: MessageTypes.RECEIVE,
          content: response.data.ai_response,
        });
      });
  }

  useEffect(() => {
    (async function () {
      try {
        const problem_info = await getProblemInfo();
        if ("problem_statement" in problem_info) {
          return setProblemInfo(problem_info);
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    function postUpdatedValueBackend() {
      const date = new Date();
      const showTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      // axios post updated value back to backend
      axios
        .post("https://ezprep.discovery.cs.vt.edu/api/update-code-value", {
          problem_id: -1,
          code: editorRef.current?.getValue(),
          language: languageChoice,
          timestamp: showTime,
        })
        .then((response) => {
          dispatch({
            type: MessageTypes.RECEIVE,
            content: response.data.ai_response,
          });
        });
      console.log("timestamp");
    }
    postUpdatedValueBackend();
    const interval = setInterval(() => postUpdatedValueBackend(), 300000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="editor-wrapper">
      <div className="editor-layout-left-right">
        <div className="editor-layout-left-top">
          <LanguageDropDown setLanguageChoice={setLanguageChoice} />
          <Button
            variant="contained"
            onClick={submitValue}
            // style={{ float: "right" }}
            type="button"
          >
            Submit
          </Button>
        </div>

        <Editor
          height="94%"
          language={languageChoice}
          value={commentProblemStatement(
            problemInfo?.problem_statement,
            languageChoice
          )}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
