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
    // Temporarily disable smooth scroll so navigation jumps instantly to top
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    html.scrollTop = 0;

    // Restore smooth scrolling on next frame
    const id = requestAnimationFrame(() => {
      html.style.scrollBehavior = prevBehavior;
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, search, hash, navType]);

  return null;
};

export default ScrollToTop;
