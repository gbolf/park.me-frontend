import React, { ReactNode, useEffect } from 'react';
import { StyledEmptyContainer } from './style';
import { useMapContext } from '@contexts/map';

export function EmptyLayout({ children }: { children: ReactNode }) {
  const { setIsActive } = useMapContext();
  useEffect(() => {
    setIsActive(true);
    return () => setIsActive(false);
  }, []);
  
  return <StyledEmptyContainer>{children}</StyledEmptyContainer>;
}
