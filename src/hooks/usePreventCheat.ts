import { useEffect, useRef, useState } from "react";

const usePreventCheat = () => {
  const switchTabCountRef = useRef(0);
  const [switchTabCount, setSwitchTabCount] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        switchTabCountRef.current += 1;
        setSwitchTabCount(switchTabCountRef.current);
        // console.log(
        //   "User attempted to switch tabs.",
        //   switchTabCountRef.current
        // );
      }
    };

    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    const disableCopyPaste = (e: ClipboardEvent) => e.preventDefault();

    const preventConsole = (e: KeyboardEvent) => {
      if (
        // (e.ctrlKey && e.shiftKey && e.key === "I") ||
        // (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "U") || // Ctrl+U
        (e.ctrlKey && e.shiftKey && e.key === "C") || // Ctrl+Shift+C
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("copy", disableCopyPaste);
    document.addEventListener("paste", disableCopyPaste);
    document.addEventListener("keydown", preventConsole);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("copy", disableCopyPaste);
      document.removeEventListener("paste", disableCopyPaste);
      document.removeEventListener("keydown", preventConsole);
    };
  }, []);

  return switchTabCount;
};

export default usePreventCheat;
