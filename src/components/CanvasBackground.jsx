import { motion } from 'framer-motion';

export default function CanvasBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-dark-bg">
      {/* Dynamic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
      
      {/* Vignette Layer (Positioned behind the lights so the glowing blurs pop on top!) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_80%)] opacity-60 pointer-events-none"></div>
      
      {/* Static Massive ambient glows */}
      <div 
        className="ambient-orb ambient-orb-1 absolute top-[10%] left-[10%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full blur-[100px] md:blur-[150px] transform-gpu"
      ></div>

      <div 
        className="ambient-orb ambient-orb-2 absolute bottom-[10%] right-[10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-[80px] md:blur-[120px] transform-gpu"
      ></div>
      
    </div>
  );
}
