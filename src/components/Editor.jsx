import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Editor = forwardRef(({ value, onChange }, ref) => {
  const quillRef = useRef(null);
  useImperativeHandle(ref, () => {
    getQuill: () => {
      return quillRef.current.getEditor();
    };
  });
  //   const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="text-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Write something amazing..."
      />
    </div>
  );
});

export default Editor;
