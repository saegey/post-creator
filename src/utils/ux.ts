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
      // console.log(ref.current, event);
      if (
        !ref.current ||
        !ref.current.contains ||
        !(typeof ref.current.contains === 'function')
      ) {
        return;
      }
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(event);
        // console.log('handle1');
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
