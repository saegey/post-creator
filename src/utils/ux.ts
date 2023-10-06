import React from 'react';

/**
 * This Hook can be used for detecting clicks outside the Opened Menu
 */
function useClickOutside(ref, onClickOutside) {
  React.useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event) {
      if (
        !ref.current ||
        !ref.current.contains ||
        !(typeof ref.current.contains === 'function')
      ) {
        return;
      }
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(event);
      }
    }
    // Bind
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

export { useClickOutside };
