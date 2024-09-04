// ModalManager.tsx
import React, { useContext } from "react";
import { EditorContext } from "./EditorContext";
import RaceResultsImport from "../RaceResults/RaceResultsImport";
import RWGPSModal from "./AddRWGPS";
import MobileMenu from "./MobileMenu";
import AddVideoModal from "./AddVideo";
import OptionsDropdown from "../../OptionsDropdown";
import AddImage from "../Image/AddImage";
import FloatingMenu from "./FloatingMenu";
import Menu from "../../Menu";

const ModalManager = () => {
  const {
    isRaceResultsModalOpen,
    isOptionsOpen,
    isHeroImageModalOpen,
    isNewComponentMenuOpen,
    selectionMenu,
    isChangingQuickly,
    menuPosition,
  } = useContext(EditorContext);

  return (
    <>
      {isRaceResultsModalOpen && <RaceResultsImport />}
      <RWGPSModal />
      <MobileMenu />
      <AddVideoModal />
      {isOptionsOpen && <OptionsDropdown />}
      {selectionMenu && !isChangingQuickly && (
        <FloatingMenu top={selectionMenu.top} left={selectionMenu.left} />
      )}
      {isHeroImageModalOpen && <AddImage />}
      {isNewComponentMenuOpen && <Menu menuPosition={menuPosition} />}
    </>
  );
};

export default ModalManager;
