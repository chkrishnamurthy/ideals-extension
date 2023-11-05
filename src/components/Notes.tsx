import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Notes: React.FC = () => {
  const [editorHtml, setEditorHtml] = useState<string>("");

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      // ['clean']
    ],
  };

  const formats = [
    "header",
    "font",
    "list",
    "bold",
    "italic",
    "underline",
    "link",
  ];

  const saveNotes = (
    content: string,
    delta: any,
    source: string,
    editor: any
  ): void => {
    setEditorHtml(content);

    const deltaToSave = editor.getContents();
    if (deltaToSave.ops[0].insert.length >= 8185) {
      alert("Please enter a note");
      return;
    }

    chrome.storage.sync.set({ notes: JSON.stringify(deltaToSave) }, () => {
      console.log("Notes saved");
    });
  };

  useEffect(() => {
    chrome.storage.sync.get(["notes"], (result) => {
      const storedNotes = result.notes as string;
      console.log("storedNotes", storedNotes.length);
      if (storedNotes) {
        try {
          const parsedNotes = JSON.parse(storedNotes);
          setEditorHtml(parsedNotes);
        } catch (error) {
          console.error("Failed to parse stored notes:", error);
        }
      }
    });
  }, []);

  return (
    <div
      className="w-full h-screen text-black"
      style={{
        backgroundImage:
          "url('https://static.tumblr.com/maopbtg/nBUmgtogx/paper.png')",
      }}
    >
      <ReactQuill
        value={editorHtml}
        onChange={saveNotes}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Write something awesome..."
        className="h-full border-none"
      />
    </div>
  );
};

export default Notes;
