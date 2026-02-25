import { ReactLenis } from 'lenis/react';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.2, 
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical'
    }}>
      {children}
    </ReactLenis>
  );
};