import { useCallback } from "react";

export const useScrollToTop = () => {
  return useCallback((behavior: ScrollBehavior = "smooth") => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior });
  }, []);
};
