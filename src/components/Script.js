import { useEffect } from 'react'

/**
 * React hook for creating script elements in react render function
 * @param {*} path 
 */
const Script = path => {
  useEffect(() => {
    const scriptElem = document.createElement('script');
    scriptElem.src = path;
    scriptElem.async = true;
    document.body.appendChild(scriptElem);
    return () => {
      document.body.removeChild(scriptElem);
    };
  }, [path]);
};

export default Script;
