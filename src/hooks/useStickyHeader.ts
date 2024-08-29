import { useEffect } from "react";

const useStickyHeader = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (header && window.scrollY > 0) {
        header.style.position = "fixed";
        header.style.top = "0";
        header.style.zIndex = "10";
      } else if (header) {
        header.style.position = "sticky";
        header.style.top = "0";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

export default useStickyHeader;
