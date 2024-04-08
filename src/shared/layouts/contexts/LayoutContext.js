import { createContext, useContext } from "react";

export const LayoutContext = createContext({ user: null });

export const useLayoutState = () => {
  const {
    setShowSidebar,
    setIsChangeLayoutBg,
    user,
    setRemovePadding,
    setSideStepsConfig,
    setDrawerConfig,
    openProgress,
    setOpenProgress,
  } = useContext(LayoutContext);
  return {
    setShowSidebar,
    setIsChangeLayoutBg,
    user,
    setRemovePadding,
    setSideStepsConfig,
    setDrawerConfig,
    openProgress,
    setOpenProgress,
  };
};
