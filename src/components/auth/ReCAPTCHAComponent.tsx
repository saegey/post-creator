import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Flex } from "theme-ui";
import { useThemeUI } from "theme-ui";

type ReCAPTCHAComponentProps = {
  setIsRobot: (value: boolean) => void;
};

const ReCAPTCHAComponent: React.FC<ReCAPTCHAComponentProps> = ({
  setIsRobot,
}) => {
  const { colorMode } = useThemeUI();

  return (
    <Flex sx={{ justifyContent: "center" }}>
      <ReCAPTCHA
        sitekey="6LdW_CUpAAAAAOC--lA01wOnW1UA3RlZyc_LgX_0"
        onChange={() => setIsRobot(false)}
        theme={colorMode === "dark" ? "dark" : "light"}
      />
    </Flex>
  );
};

export default ReCAPTCHAComponent;
