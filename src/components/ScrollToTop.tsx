import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType();

  // Disable browser's automatic scroll restoration so back/forward also start at top
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = previous;
      };
    }
  }, []);

  useEffect(() => {
    // Always scroll to top on any navigation (PUSH, POP, REPLACE)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash, navType]);

  return null;
};

export default ScrollToTop;
