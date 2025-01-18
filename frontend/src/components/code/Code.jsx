import { ClipboardPasteIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

const Code = ({ children, language }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="code">
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <button className="icon copy-icon">
          {copied ? <ClipboardPasteIcon /> : <CopyIcon />}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter language={language}>{children}</SyntaxHighlighter>
    </div>
  );
};

export default Code;
