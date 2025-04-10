import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Link,
  Image,
  Quote,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const buttonClasses = (isActive) =>
  `p-2 rounded-md transition-colors duration-200 ${
    isActive
      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
  }`;

// Prevent form submission for all toolbar elements
const preventFormSubmission = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const Toolbar = ({ activeFormats, formatText, formatBlock }) => {
  const [isHeadingDropdownOpen, setIsHeadingDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsHeadingDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHeadingClick = (e, headingLevel) => {
    preventFormSubmission(e);
    formatBlock(`h${headingLevel}`);
    setIsHeadingDropdownOpen(false);
  };

  return (
    <div
      className="p-2 flex flex-wrap gap-1 select-none"
      onClick={preventFormSubmission}
      onMouseDown={preventFormSubmission}
      onKeyDown={preventFormSubmission}
      onKeyUp={preventFormSubmission}
      onKeyPress={preventFormSubmission}
      onFocus={preventFormSubmission}
      onBlur={preventFormSubmission}
      onDoubleClick={preventFormSubmission}
      onContextMenu={preventFormSubmission}
    >
      <div className="flex gap-1 items-center border-r border-gray-200 dark:border-gray-600 pr-2">
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatText("bold");
          }}
          className={buttonClasses(activeFormats.bold)}
          title="Bold (⌘B)"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatText("italic");
          }}
          className={buttonClasses(activeFormats.italic)}
          title="Italic (⌘I)"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatText("underline");
          }}
          className={buttonClasses(activeFormats.underline)}
          title="Underline (⌘U)"
        >
          <Underline size={16} />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r border-gray-200 dark:border-gray-600 px-2">
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatText("insertUnorderedList");
          }}
          className={buttonClasses(activeFormats.list)}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatText("insertOrderedList");
          }}
          className={buttonClasses(activeFormats.orderedList)}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r border-gray-200 dark:border-gray-600 px-2">
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatText("justifyLeft");
          }}
          className={buttonClasses(activeFormats.align === "left")}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatText("justifyCenter");
          }}
          className={buttonClasses(activeFormats.align === "center")}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatText("justifyRight");
          }}
          className={buttonClasses(activeFormats.align === "right")}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r border-gray-200 dark:border-gray-600 px-2">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              preventFormSubmission(e);
              setIsHeadingDropdownOpen(!isHeadingDropdownOpen);
            }}
            className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 ${
              activeFormats.heading
                ? "text-blue-600 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-300"
            }`}
            title="Heading"
          >
            <span className="whitespace-nowrap">
              {activeFormats.heading ? `H${activeFormats.heading}` : "H1"}
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                isHeadingDropdownOpen ? "rotate-180" : ""
              } opacity-70`}
            />
          </button>

          {isHeadingDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 min-w-[140px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 py-1">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={(e) => handleHeadingClick(e, level)}
                  className={`w-full px-3 py-1.5 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ${
                    activeFormats.heading === level
                      ? "bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="text-sm font-medium min-w-[24px]">
                    H{level}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Heading {level}
                  </span>
                  {activeFormats.heading === level && (
                    <span className="ml-auto text-blue-500">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-1 items-center px-2">
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            const url = prompt("Enter the URL:", "https://");
            if (url) formatText("createLink", url);
          }}
          className={buttonClasses(false)}
          title="Insert Link"
        >
          <Link size={16} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            const url = prompt("Enter the image URL:", "https://");
            if (url) formatText("insertImage", url);
          }}
          className={buttonClasses(false)}
          title="Insert Image"
        >
          <Image size={16} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatBlock("pre", "code-block");
          }}
          className={buttonClasses(activeFormats.isCode)}
          title="Code Block"
        >
          <Code size={16} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatBlock("blockquote");
          }}
          className={buttonClasses(activeFormats.isQuote)}
          title="Quote"
        >
          <Quote size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
