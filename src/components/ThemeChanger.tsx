import React, { useEffect } from "react";
import { useColorMode } from "theme-ui";

// A TypeScript component to handle color mode changes
const ColorModeScript: React.FC = () => {
  const [_, setColorMode] = useColorMode();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    // Function to update color mode based on system preference
    const handleChange = () => {
      setColorMode(darkModeMediaQuery.matches ? "dark" : "light");
    };

    // Initial check
    handleChange();

    // Listen for changes in the preference
    darkModeMediaQuery.addEventListener("change", handleChange);

    // Clean up the listener when the component is unmounted
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, [setColorMode]);

  return null;
};

export default ColorModeScript;
