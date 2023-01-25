import React, { useEffect, useState } from "react";

import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";

interface Props {
  setReviewContent: React.Dispatch<React.SetStateAction<string>>;
}

const TextEdit = ({ setReviewContent }: Props) => {
  const theme = "snow";
  const modules = {
    toolbar: {
      container: [
        ["image"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }, "bold", "italic", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "underline", { script: "sub" }, { script: "super" }],
      ],
    },
  };
  // 위에서 설정한 모듈들 foramts을 설정한다
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "image",
  ];
  const { quill, quillRef } = useQuill({ modules, theme, formats });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log("Text change!");
        console.log(quill.root.innerHTML);
        setReviewContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return <div ref={quillRef}></div>;
};

export default TextEdit;
