import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
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
  Palette,
  Highlighter,
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

const Toolbar = ({ activeFormats, formatText, formatBlock, formatFont }) => {
  const [isHeadingDropdownOpen, setIsHeadingDropdownOpen] = useState(false);
  const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] = useState(false);
  const [isTextColorDropdownOpen, setIsTextColorDropdownOpen] = useState(false);
  const [isHighlightColorDropdownOpen, setIsHighlightColorDropdownOpen] =
    useState(false);

  const headingDropdownRef = useRef(null);
  const fontSizeDropdownRef = useRef(null);
  const textColorDropdownRef = useRef(null);
  const highlightColorDropdownRef = useRef(null);

  // Font sizes available in Google Docs
  const fontSizes = [
    { value: "1", label: "8" },
    { value: "2", label: "10" },
    { value: "3", label: "12" },
    { value: "4", label: "14" },
    { value: "5", label: "18" },
    { value: "6", label: "24" },
    { value: "7", label: "36" },
    { value: "8", label: "48" },
    { value: "9", label: "72" },
  ];

  // Text colors available in Google Docs
  const textColors = [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#b7b7b7",
    "#cccccc",
    "#d9d9d9",
    "#efefef",
    "#f3f3f3",
    "#ffffff",
    "#980000",
    "#ff0000",
    "#ff9900",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#4a86e8",
    "#0000ff",
    "#9900ff",
    "#ff00ff",
    "#e6b8af",
    "#f4cccc",
    "#fce5cd",
    "#fff2cc",
    "#d9ead3",
    "#d0e0e3",
    "#c9daf8",
    "#cfe2f3",
    "#d9d2e9",
    "#ead1dc",
  ];

  // Highlight colors available in Google Docs
  const highlightColors = [
    "transparent",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#0000ff",
    "#ff00ff",
    "#ff0000",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        headingDropdownRef.current &&
        !headingDropdownRef.current.contains(event.target)
      ) {
        setIsHeadingDropdownOpen(false);
      }
      if (
        fontSizeDropdownRef.current &&
        !fontSizeDropdownRef.current.contains(event.target)
      ) {
        setIsFontSizeDropdownOpen(false);
      }
      if (
        textColorDropdownRef.current &&
        !textColorDropdownRef.current.contains(event.target)
      ) {
        setIsTextColorDropdownOpen(false);
      }
      if (
        highlightColorDropdownRef.current &&
        !highlightColorDropdownRef.current.contains(event.target)
      ) {
        setIsHighlightColorDropdownOpen(false);
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

  const handleFontSizeClick = (e, size) => {
    preventFormSubmission(e);
    formatText("fontSize", size.value);
    setIsFontSizeDropdownOpen(false);
  };

  const handleTextColorClick = (e, color) => {
    preventFormSubmission(e);
    formatFont("foreColor", color);
    setIsTextColorDropdownOpen(false);
  };

  const handleHighlightColorClick = (e, color) => {
    preventFormSubmission(e);
    formatFont("hiliteColor", color);
    setIsHighlightColorDropdownOpen(false);
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
      {/* Font Size Dropdown */}
      <div className="flex gap-1 items-center border-r border-gray-200 dark:border-gray-600 px-2">
        <div className="relative" ref={fontSizeDropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              preventFormSubmission(e);
              setIsFontSizeDropdownOpen(!isFontSizeDropdownOpen);
            }}
            className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 ${
              activeFormats.fontSize
                ? "text-blue-600 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-300"
            }`}
            title="Font Size"
          >
            <span className="whitespace-nowrap">
              {fontSizes.find((size) => size.value === activeFormats.fontSize)
                ?.label || "12"}
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                isFontSizeDropdownOpen ? "rotate-180" : ""
              } opacity-70`}
            />
          </button>

          {isFontSizeDropdownOpen && (
            <div
              className="fixed top-auto left-auto mt-1 min-w-[100px] max-h-[300px] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[100] py-1"
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                transform: "translateY(4px)",
              }}
            >
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={(e) => handleFontSizeClick(e, size.value)}
                  className={`w-full px-3 py-1.5 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ${
                    activeFormats.fontSize === size.value
                      ? "bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="text-sm font-medium">{size.label}</span>
                  {activeFormats.fontSize === size.value && (
                    <span className="ml-auto text-blue-500">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Text Formatting */}
      <div className="flex gap-1 items-center border-r border-gray-200 dark:border-gray-600 px-2">
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
        <button
          type="button"
          onClick={(e) => {
            preventFormSubmission(e);
            formatText("strikethrough");
          }}
          className={buttonClasses(activeFormats.strikethrough)}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>
      </div>

      {/* Text Color and Highlight */}
      <div className="flex gap-1 items-center border-r border-gray-200 dark:border-gray-600 px-2">
        <div className="relative" ref={textColorDropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              preventFormSubmission(e);
              setIsTextColorDropdownOpen(!isTextColorDropdownOpen);
            }}
            className={`p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300`}
            title="Text Color"
          >
            <div className="flex items-center">
              <Palette size={16} />
              <div
                className="ml-1 w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: activeFormats.textColor }}
              />
            </div>
          </button>

          {isTextColorDropdownOpen && (
            <div
              className="fixed top-auto left-auto mt-1 p-4 max-h-[320px] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[100] w-72"
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                transform: "translateY(4px)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Text Color
                </span>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 mr-2"
                    style={{ backgroundColor: activeFormats.textColor }}
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activeFormats.textColor}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {textColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={(e) => handleTextColorClick(e, color)}
                    className={`w-8 h-8 rounded-md border flex items-center justify-center transition-all duration-150 ${
                      activeFormats.textColor === color
                        ? "border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700 shadow-sm"
                        : "border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {activeFormats.textColor === color && (
                      <span className="text-white text-xs font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={highlightColorDropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              preventFormSubmission(e);
              setIsHighlightColorDropdownOpen(!isHighlightColorDropdownOpen);
            }}
            className={`p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300`}
            title="Highlight Color"
          >
            <div className="flex items-center">
              <Highlighter size={16} />
              <div
                className="ml-1 w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
                style={{
                  backgroundColor:
                    activeFormats.highlightColor === "transparent"
                      ? "transparent"
                      : activeFormats.highlightColor,
                }}
              />
            </div>
          </button>

          {isHighlightColorDropdownOpen && (
            <div
              className="fixed top-auto left-auto mt-1 p-4 max-h-[320px] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[100] w-72"
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                transform: "translateY(4px)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Highlight Color
                </span>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 mr-2"
                    style={{
                      backgroundColor:
                        activeFormats.highlightColor === "transparent"
                          ? "transparent"
                          : activeFormats.highlightColor,
                    }}
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activeFormats.highlightColor === "transparent"
                      ? "No highlight"
                      : activeFormats.highlightColor}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {highlightColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={(e) => handleHighlightColorClick(e, color)}
                    className={`w-8 h-8 rounded-md border flex items-center justify-center transition-all duration-150 ${
                      activeFormats.highlightColor === color
                        ? "border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700 shadow-sm"
                        : "border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700"
                    }`}
                    style={{
                      backgroundColor:
                        color === "transparent" ? "transparent" : color,
                    }}
                    title={color === "transparent" ? "No highlight" : color}
                  >
                    {activeFormats.highlightColor === color && (
                      <span className="text-gray-700 text-xs font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lists */}
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

      {/* Alignment */}
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

      {/* Headings */}
      <div className="flex gap-1 items-center border-r border-gray-200 dark:border-gray-600 px-2">
        <div className="relative" ref={headingDropdownRef}>
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
            <div
              className="fixed top-auto left-auto mt-1 min-w-[140px] max-h-[300px] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[100] py-1"
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                transform: "translateY(4px)",
              }}
            >
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

      {/* Special Formatting */}
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
