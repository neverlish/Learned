import React, { useEffect, useRef } from 'react';

const useFadeIn = (duration = 1, delay = 0) => {
  // if (typeof duration !== 'number' || typeof delay !== 'number') {
  //   return;
  // }
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
}

const App = () => {
  const fadeInH1 = useFadeIn(1, 2);
  const fadeInP = useFadeIn(5, 10);
  return (
    <div>
      <h1 {...fadeInH1}>Hello</h1>
      <p {...fadeInP}>lorem ipsum lalalal</p>
    </div>
  )
};

export default App;