import React, { Suspense, lazy } from 'react';

interface Tooth3DProps {
  onClick?: () => void;
  size?: number;
}

// The real Tooth3D pulls in three.js (~120kB gzipped) just for a decorative icon.
// Code-splitting it keeps that weight out of the initial bundle — everyone hits the
// landing/sign-in page before ever authenticating, so this was blocking first paint.
const Tooth3DImpl = lazy(() => import('./Tooth3D').then((m) => ({ default: m.Tooth3D })));

const ToothFallback: React.FC<Tooth3DProps> = ({ onClick, size = 50 }) => (
  <div
    onClick={onClick}
    className="relative flex items-center justify-center cursor-pointer rounded-full bg-primary-600/10"
    style={{ width: size, height: size }}
  >
    <span style={{ fontSize: size * 0.55 }}>🦷</span>
  </div>
);

export const Tooth3D: React.FC<Tooth3DProps> = (props) => (
  <Suspense fallback={<ToothFallback {...props} />}>
    <Tooth3DImpl {...props} />
  </Suspense>
);
