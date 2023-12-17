'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function Recipe() {
  const { data } = useQuery<string>({
    queryKey: ['recipe'],
  });

  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [data]);

  useEffect(() => {
    if (data) {
      if (currentIndex < data.length) {
        setTimeout(() => {
          setDisplayedText((prev) => prev + data[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, 25);
      }
    }
  }, [data, currentIndex]);

  if (!data) return null;

  return <div className="whitespace-pre-line mt-4 bg-secondary/40 rounded-md p-4 border text-sm">{displayedText}</div>;
}
