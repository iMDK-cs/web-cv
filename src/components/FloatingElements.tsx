 
import React from 'react';
import { Code, Database, Server, Globe, Cpu, Shield } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const icons = [
    { Icon: Code, delay: '0s', position: 'top-20 left-10' },
    { Icon: Database, delay: '2s', position: 'top-40 right-20' },
    { Icon: Server, delay: '4s', position: 'top-60 left-20' },
    { Icon: Globe, delay: '6s', position: 'bottom-40 right-10' },
    { Icon: Cpu, delay: '8s', position: 'bottom-60 left-40' },
    { Icon: Shield, delay: '10s', position: 'top-80 right-40' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {icons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} opacity-10 animate-float`}
          style={{
            animationDelay: delay,
            animationDuration: '6s',
          }}
        >
          <Icon size={40} className="text-sky-400" />
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;