import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";


const Editor = ({value,setValue} ) => {

  return (
    <div className="container">
      <h1>Detay</h1>
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
         // const ddata = ReactHtmlParser(data);
          setValue(data);
        }}
        data={value}
      />

    </div>
  );
};

export default Editor;
