import JoditEditor, { Jodit } from "jodit-react";
import { useRef } from "react";

export default function TextEditor({ setFieldValue, config,value }) {
  const editor = useRef(null);

 

  function preparePaste(jodit) {
    jodit.e.on(
      "paste",
      (e) => {
        jodit.e.stopPropagation("paste");
        jodit.s.insertHTML(
          Jodit.modules.Helpers.getDataTransfer(e)
            .getData(Jodit.constants.TEXT_HTML)
            .replace(/a/g, "b")
        );
        return false;
      },
      { top: true }
    );
  }
  Jodit.plugins.add("preparePaste", preparePaste);

  return (
    <div className="conainer">
      <div>
        <JoditEditor
          ref={editor}
          name="description"
          config={config}
          value={value}
          onChange={(content) => setFieldValue("description", content)}
        />
      </div>
    </div>
  );
}
