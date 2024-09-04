import React from "react";

/**
 * This Hook can be used for detecting clicks outside the Opened Menu
 */
const useClickOutside = (
  ref: React.MutableRefObject<HTMLElement | undefined>,
  onClickOutside: (e: any) => void
) => {
  React.useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    const handleClickOutside = (event: any) => {
      if (
        !ref.current ||
        !ref.current.contains ||
        !(typeof ref.current.contains === "function")
      ) {
        return;
      }
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(event);
      }
    };
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;
