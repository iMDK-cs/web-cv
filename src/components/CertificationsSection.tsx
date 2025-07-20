 
import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
  isVisible: boolean;
  animationDelay?: string;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  isVisible,
  animationDelay = '0.8s'
}) => {
  if (certifications.length === 0) {
    return (
      <div className={`mt-16 text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay }}>
        <div className="glass rounded-lg p-8 border border-sky-500/20 max-w-2xl mx-auto hover-lift">
          <Award className="text-sky-400 mx-auto mb-4 animate-glow" size={48} />
          <h3 className="text-2xl font-semibold text-white mb-4">Certifications</h3>
          <p className="text-gray-300 mb-6">
            certifications will be display here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`mt-16 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay }}>
      <h3 className="text-2xl font-semibold text-white text-center mb-8">Certifications & Achievements</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <div
            key={cert.id}
            className={`glass rounded-lg p-6 border border-sky-500/20 hover:border-sky-400/50 transition-all duration-300 hover-lift ${
              isVisible ? 'animate-bounce-in' : 'opacity-0'
            }`}
            style={{ animationDelay: `${parseFloat(animationDelay) + index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <Award className="text-sky-400 mt-1 animate-glow" size={24} />
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
            
            <h4 className="text-lg font-semibold text-white mb-2">{cert.title}</h4>
            <p className="text-sky-300 mb-1">{cert.issuer}</p>
            <p className="text-gray-400 text-sm mb-2">{cert.date}</p>
            
            {cert.credentialId && (
              <p className="text-gray-400 text-xs">
                Credential ID: {cert.credentialId}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsSection;