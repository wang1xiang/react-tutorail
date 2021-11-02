import { useState, useEffect } from 'react';
const useBodyScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(null);
  useEffect(() => {
    console.log(window.scrollY)
    const handleScroll = setScrollPosition(window.scrollY);
    document.addEventListener('scroll', handleScroll);
    return () => document.removeListener('scroll', handleScroll);
  }, [])

  return scrollPosition;
}

export default useBodyScrollPosition
