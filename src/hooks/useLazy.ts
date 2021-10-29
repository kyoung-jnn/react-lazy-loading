import { useState, useEffect, useCallback } from 'react';

const useLazy = () => {
  // elements에 <img/>를 담음.
  const [elements, setElements] = useState<Element[]>([]);

  const handleLazyLoading = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImageElement = entry.target as HTMLImageElement;

          lazyImageElement.src = lazyImageElement.dataset.src as string;
          lazyImageElement.style.transitionProperty = 'all';
          lazyImageElement.style.transitionDuration = '1s';
          lazyImageElement.style.opacity = '1';

          lazyImageElement.classList.remove('lazy');

          // 로딩이 완료 되었으므로 옵저버 해제
          observer.unobserve(lazyImageElement);
        }
      });
    },
    [],
  );

  // <img/>가 저장되면 Intersection Observer 설정 시작
  useEffect(() => {
    const option = {
      root: null,
      threshold: 0.25,
    };
    let lazyObserver: IntersectionObserver;

    if (elements.length) {
      lazyObserver = new IntersectionObserver(handleLazyLoading, option);

      elements.forEach((element: Element) => {
        lazyObserver.observe(element);
      });
    }

    return () => lazyObserver && lazyObserver.disconnect();
  }, [elements]);

  return { setElements };
};

export default useLazy;
