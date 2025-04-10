import { useState, useEffect } from "react";
import Toolbar from "./toolbar";

const FormattingToolbar = ({ editorRef }) => {
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    list: false,
    orderedList: false,
    align: "left",
    heading: null,
    isCode: false,
    isQuote: false,
  });

  // Update active formats when selection changes
  useEffect(() => {
    const updateActiveFormats = () => {
      if (!editorRef.current) return;

      // Get the current selection
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const parentElement = selection.getRangeAt(0).commonAncestorContainer;
      const formats = {
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        list: document.queryCommandState("insertUnorderedList"),
        orderedList: document.queryCommandState("insertOrderedList"),
        align: "left",
        heading: null,
        isCode: false,
        isQuote: false,
      };

      // Check alignment
      if (document.queryCommandState("justifyLeft")) formats.align = "left";
      if (document.queryCommandState("justifyCenter")) formats.align = "center";
      if (document.queryCommandState("justifyRight")) formats.align = "right";

      // Check for block-level formatting
      let element =
        parentElement.nodeType === 3
          ? parentElement.parentElement
          : parentElement;
      while (element && element !== editorRef.current) {
        const tagName = element.tagName.toLowerCase();
        if (tagName.match(/^h[1-6]$/)) {
          formats.heading = parseInt(tagName[1]);
        } else if (tagName === "pre") {
          formats.isCode = true;
        } else if (tagName === "blockquote") {
          formats.isQuote = true;
        }
        element = element.parentElement;
      }

      setActiveFormats(formats);
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("keyup", updateActiveFormats);
      editor.addEventListener("mouseup", updateActiveFormats);
      document.addEventListener("selectionchange", updateActiveFormats);
    }

    return () => {
      if (editor) {
        editor.removeEventListener("keyup", updateActiveFormats);
        editor.removeEventListener("mouseup", updateActiveFormats);
        document.removeEventListener("selectionchange", updateActiveFormats);
      }
    };
  }, [editorRef]);

  const formatText = (command, value = null) => {
    if (!editorRef.current) return;

    // Focus the editor if it's not already focused
    if (document.activeElement !== editorRef.current) {
      editorRef.current.focus();
    }

    try {
      // Save the current selection
      const selection = window.getSelection();
      if (!selection) return;

      let range = null;
      if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
      } else {
        // If no range exists, create one at the end of the editor
        range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      // Apply the formatting command
      document.execCommand(command, false, value);

      // Restore the selection
      if (range) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      // Update active formats
      const formats = {
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        list: document.queryCommandState("insertUnorderedList"),
        orderedList: document.queryCommandState("insertOrderedList"),
        align: "left",
        heading: activeFormats.heading,
        isCode: activeFormats.isCode,
        isQuote: activeFormats.isQuote,
      };

      if (document.queryCommandState("justifyLeft")) formats.align = "left";
      if (document.queryCommandState("justifyCenter")) formats.align = "center";
      if (document.queryCommandState("justifyRight")) formats.align = "right";

      setActiveFormats(formats);
    } catch (error) {
      console.error("Error applying format:", error);
    }
  };

  const formatBlock = (tag, className = "") => {
    if (!editorRef.current) return;

    try {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const blockElement =
        container.nodeType === 3 ? container.parentElement : container;

      // If we're already in the desired block type, remove it
      if (blockElement.tagName.toLowerCase() === tag.toLowerCase()) {
        document.execCommand("formatBlock", false, "p");
      } else {
        document.execCommand("formatBlock", false, tag);
        if (className && blockElement.classList) {
          blockElement.classList.add(className);
        }
      }
    } catch (error) {
      console.error("Error applying block format:", error);
    }
  };

  return (
    <Toolbar
      activeFormats={activeFormats}
      formatText={formatText}
      formatBlock={formatBlock}
    />
  );
};

export default FormattingToolbar;
