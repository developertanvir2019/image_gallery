import { PinturaEditor } from "@pqina/react-pintura";
import { getEditorDefaults } from "@pqina/pintura";
import { useState } from "react";
const Editor = () => {
  const [inlineResult, setInlineResult] = useState();
  return (
    <div style={{ height: "80vh" }}>
      <PinturaEditor
        {...getEditorDefaults()}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Grenada.svg/1200px-Flag_of_Grenada.svg.png"
        onProcess={(res) => setInlineResult(URL.createObjectURL(res.dest))}
      />

      {inlineResult && <img src={inlineResult} alt="" />}
    </div>
  );
};

export default Editor;
