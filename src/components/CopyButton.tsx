import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }

  const icon = copied ? <FaRegCheckCircle /> : <FaRegCopy />;

  return (
    <button className="px-3" onClick={copyToClipboard}>
      {icon}
    </button>
  );
}

export default CopyButton;
