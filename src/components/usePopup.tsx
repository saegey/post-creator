import React from "react";

function usePopup(popupRef: React.RefObject<HTMLDivElement>) {
  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleDocumentClick = (e: { target: any }) => {
      const clickedComponent = e.target;
      if (!popupRef?.current?.contains(clickedComponent)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { showPopup, setShowPopup };
}

export default usePopup;
