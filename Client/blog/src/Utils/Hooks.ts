import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }