import { useState, useEffect } from "react";
import Toolbar from "./toolbar";

const FormattingToolbar = ({ editorRef }) => {
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    list: false,
    orderedList: false,
    align: "left",
    heading: "",
    isCode: false,
    isQuote: false,
    fontFamily: "",
    fontSize: "",
    textColor: "",
    highlightColor: "",
  });

  const updateActiveFormats = () => {
    if (!editorRef.current) return;

    // Get the current selection
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const element =
      container.nodeType === 3 ? container.parentElement : container;

    // Get computed styles for the selected element
    const computedStyle = window.getComputedStyle(element);

    const formats = {
      bold:
        computedStyle.fontWeight === "700" ||
        computedStyle.fontWeight === "bold",
      italic: computedStyle.fontStyle === "italic",
      underline: computedStyle.textDecoration.includes("underline"),
      strikethrough: computedStyle.textDecoration.includes("line-through"),
      list: element.closest("ul") !== null,
      orderedList: element.closest("ol") !== null,
      align: computedStyle.textAlign,
      heading: null,
      isCode: element.closest("pre") !== null,
      isQuote: element.closest("blockquote") !== null,
      fontFamily: computedStyle.fontFamily.replace(/['"]/g, ""),
      fontSize: computedStyle.fontSize,
      textColor: computedStyle.color,
      highlightColor: computedStyle.backgroundColor,
    };

    // Check for heading level
    const headingMatch = element.tagName.toLowerCase().match(/^h([1-6])$/);
    if (headingMatch) {
      formats.heading = parseInt(headingMatch[1]);
    }

    setActiveFormats(formats);
  };

  // Update active formats when selection changes
  useEffect(() => {
    const updateActiveFormats = () => {
      if (!editorRef.current) return;

      // Get the current selection
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const element =
        container.nodeType === 3 ? container.parentElement : container;

      // Get computed styles for the selected element
      const computedStyle = window.getComputedStyle(element);

      const formats = {
        bold:
          computedStyle.fontWeight === "700" ||
          computedStyle.fontWeight === "bold",
        italic: computedStyle.fontStyle === "italic",
        underline: computedStyle.textDecoration.includes("underline"),
        strikethrough: computedStyle.textDecoration.includes("line-through"),
        list: element.closest("ul") !== null,
        orderedList: element.closest("ol") !== null,
        align: computedStyle.textAlign,
        heading: null,
        isCode: element.closest("pre") !== null,
        isQuote: element.closest("blockquote") !== null,
        fontFamily: computedStyle.fontFamily.replace(/['"]/g, ""),
        fontSize: computedStyle.fontSize,
        textColor: computedStyle.color,
        highlightColor: computedStyle.backgroundColor,
      };

      // Check for heading level
      const headingMatch = element.tagName.toLowerCase().match(/^h([1-6])$/);
      if (headingMatch) {
        formats.heading = parseInt(headingMatch[1]);
      }

      setActiveFormats(formats);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const listItem = range.startContainer.parentElement.closest("li");

        if (listItem) {
          e.preventDefault();

          // If the list item is empty, remove it and create a new paragraph
          if (listItem.textContent.trim() === "") {
            const list = listItem.parentElement;
            const paragraph = document.createElement("p");
            listItem.parentNode.replaceChild(paragraph, listItem);

            // If this was the last item, remove the list
            if (list.children.length === 0) {
              list.remove();
            }

            // Move cursor to the new paragraph
            range.setStart(paragraph, 0);
            range.setEnd(paragraph, 0);
            selection.removeAllRanges();
            selection.addRange(range);
          } else {
            // Create a new list item
            const newListItem = document.createElement("li");
            listItem.parentNode.insertBefore(newListItem, listItem.nextSibling);

            // Move cursor to the new list item
            range.setStart(newListItem, 0);
            range.setEnd(newListItem, 0);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("keyup", updateActiveFormats);
      editor.addEventListener("mouseup", updateActiveFormats);
      editor.addEventListener("keydown", handleKeyDown);
      document.addEventListener("selectionchange", updateActiveFormats);
    }

    return () => {
      if (editor) {
        editor.removeEventListener("keyup", updateActiveFormats);
        editor.removeEventListener("mouseup", updateActiveFormats);
        editor.removeEventListener("keydown", handleKeyDown);
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
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const element =
        container.nodeType === 3 ? container.parentElement : container;

      if (!element) return;

      switch (command) {
        case "bold":
          element.style.fontWeight =
            element.style.fontWeight === "bold" ? "normal" : "bold";
          break;
        case "italic":
          element.style.fontStyle =
            element.style.fontStyle === "italic" ? "normal" : "italic";
          break;
        case "underline":
          element.style.textDecoration =
            element.style.textDecoration === "underline" ? "none" : "underline";
          break;
        case "strikethrough":
          element.style.textDecoration =
            element.style.textDecoration === "line-through"
              ? "none"
              : "line-through";
          break;
        case "insertUnorderedList":
          const parentList = element.closest("ul");
          if (parentList) {
            // Convert list items to paragraphs
            const listItems = parentList.querySelectorAll("li");
            listItems.forEach((item) => {
              const p = document.createElement("p");
              p.textContent = item.textContent;
              item.parentNode.replaceChild(p, item);
            });
            parentList.remove();
          } else {
            // Create new list
            const list = document.createElement("ul");
            const listItem = document.createElement("li");
            if (!range.collapsed) {
              listItem.textContent = range.toString();
              range.deleteContents();
            }
            list.appendChild(listItem);
            range.insertNode(list);
            range.setStart(listItem, 0);
            range.setEnd(listItem, 0);
          }
          break;
        case "insertOrderedList":
          const parentOrderedList = element.closest("ol");
          if (parentOrderedList) {
            // Convert list items to paragraphs
            const listItems = parentOrderedList.querySelectorAll("li");
            listItems.forEach((item) => {
              const p = document.createElement("p");
              p.textContent = item.textContent;
              item.parentNode.replaceChild(p, item);
            });
            parentOrderedList.remove();
          } else {
            // Create new list
            const list = document.createElement("ol");
            const listItem = document.createElement("li");
            if (!range.collapsed) {
              listItem.textContent = range.toString();
              range.deleteContents();
            }
            list.appendChild(listItem);
            range.insertNode(list);
            range.setStart(listItem, 0);
            range.setEnd(listItem, 0);
          }
          break;
        case "justifyLeft":
          element.style.textAlign = "left";
          break;
        case "justifyCenter":
          element.style.textAlign = "center";
          break;
        case "justifyRight":
          element.style.textAlign = "right";
          break;
        default:
          console.warn(`Unhandled command: ${command}`);
          break;
      }

      selection.removeAllRanges();
      selection.addRange(range);
      updateActiveFormats();
    } catch (error) {
      console.error("Error applying formatting:", error);
    }
  };

  const formatBlock = (tag, className = "") => {
    if (!editorRef.current) return;

    try {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const element =
        container.nodeType === 3 ? container.parentElement : container;

      if (!element) return;

      // If we're already in the desired block type, convert to paragraph
      if (element.tagName.toLowerCase() === tag.toLowerCase()) {
        const p = document.createElement("p");
        p.textContent = element.textContent;
        element.parentNode.replaceChild(p, element);
      } else {
        const newBlock = document.createElement(tag);
        if (className) {
          newBlock.className = className;
        }
        newBlock.textContent = element.textContent;
        element.parentNode.replaceChild(newBlock, element);
      }

      updateActiveFormats();
    } catch (error) {
      console.error("Error applying block format:", error);
    }
  };

  const formatFont = (property, value) => {
    if (!editorRef.current) return;

    try {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const element =
        container.nodeType === 3 ? container.parentElement : container;

      if (!element) return;

      switch (property) {
        case "fontName":
          element.style.fontFamily = value;
          break;
        case "fontSize":
          element.style.fontSize = value;
          break;
        case "foreColor":
          element.style.color = value;
          break;
        case "hiliteColor":
          element.style.backgroundColor = value;
          break;
        default:
          console.warn(`Unhandled font property: ${property}`);
          break;
      }

      selection.removeAllRanges();
      selection.addRange(range);
      updateActiveFormats();
    } catch (error) {
      console.error("Error applying font format:", error);
    }
  };

  return (
    <Toolbar
      activeFormats={activeFormats}
      formatText={formatText}
      formatBlock={formatBlock}
      formatFont={formatFont}
    />
  );
};

export default FormattingToolbar;
