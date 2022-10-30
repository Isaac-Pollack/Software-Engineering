import { useEffect } from 'react'

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
