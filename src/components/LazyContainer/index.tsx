import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import useLazy from '@src/hooks/useLazy';
import { Card } from '@src/components';
import './index.scss';

const LazyContainer = () => {
  const [images, setImages] = useState<string[]>([]);
  const { setElements } = useLazy();

  const getImages = useCallback(async () => {
    const response: AxiosResponse<any> = await axios.get(
      'https://api.unsplash.com/photos/random',
      {
        params: {
          client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
          count: 14,
        },
      },
    );

    setImages(response.data.map((image: any) => image.urls.small));
  }, []);

  useEffect(() => {
    if (images.length) {
      const imageElements = Array.from(document.getElementsByClassName('lazy'));

      setElements(imageElements);
    }
  }, [images]);

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="lazyWrapper">
      <section className="lazyContainer">
        {images.map((url: string) => (
          <Card key={url} url={url} />
        ))}
      </section>
    </div>
  );
};

export default LazyContainer;
