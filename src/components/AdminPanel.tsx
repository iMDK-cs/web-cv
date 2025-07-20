 
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Lock } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

interface AdminPanelProps {
  isAuthenticated: boolean;
  onLogin: (password: string) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isAuthenticated, onLogin, onLogout }) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  // Load certifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_certifications');
    if (saved) {
      setCertifications(JSON.parse(saved));
    }
  }, []);

  // Save certifications to localStorage
  const saveCertifications = (certs: Certification[]) => {
    setCertifications(certs);
    localStorage.setItem('portfolio_certifications', JSON.stringify(certs));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
    setPassword('');
    setShowLogin(false);
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      date: '',
      credentialId: '',
      url: ''
    };
    setEditingCert(newCert);
    setIsEditing(true);
  };

  const editCertification = (cert: Certification) => {
    setEditingCert({ ...cert });
    setIsEditing(true);
  };

  const saveCertification = () => {
    if (!editingCert) return;

    const updatedCerts = editingCert.id && certifications.find(c => c.id === editingCert.id)
      ? certifications.map(c => c.id === editingCert.id ? editingCert : c)
      : [...certifications, editingCert];

    saveCertifications(updatedCerts);
    setIsEditing(false);
    setEditingCert(null);
  };

  const deleteCertification = (id: string) => {
    if (confirm('Are you sure you want to delete this certification?')) {
      saveCertifications(certifications.filter(c => c.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="glass rounded-lg p-8 border border-sky-500/20 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Lock className="text-sky-400 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
            <p className="text-gray-400">Enter password to manage content</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-gray-800/50 border border-sky-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-all duration-300 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-all duration-300"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="px-4 py-3 border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-black rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-lg border border-sky-500/20 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Certifications</h3>
                <button
                  onClick={addCertification}
                  className="inline-flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-all duration-300"
                >
                  <Plus size={20} className="mr-2" />
                  Add Certification
                </button>
              </div>

              <div className="grid gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="glass rounded-lg p-4 border border-sky-500/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{cert.title}</h4>
                        <p className="text-sky-300">{cert.issuer}</p>
                        <p className="text-gray-400 text-sm">{cert.date}</p>
                        {cert.credentialId && (
                          <p className="text-gray-400 text-sm">ID: {cert.credentialId}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editCertification(cert)}
                          className="p-2 text-sky-400 hover:text-sky-300 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteCertification(cert.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {certifications.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No certifications added yet. Click "Add Certification" to get started.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && editingCert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="glass rounded-lg border border-sky-500/20 p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                {editingCert.id && certifications.find(c => c.id === editingCert.id) ? 'Edit' : 'Add'} Certification
              </h3>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingCert(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Certification Title"
                value={editingCert.title}
                onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-sky-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-all duration-300"
              />
              
              <input
                type="text"
                placeholder="Issuing Organization"
                value={editingCert.issuer}
                onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-sky-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-all duration-300"
              />
              
              <input
                type="text"
                placeholder="Date (e.g., Jan 2024)"
                value={editingCert.date}
                onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-sky-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-all duration-300"
              />
              
              <input
                type="text"
                placeholder="Credential ID (optional)"
                value={editingCert.credentialId || ''}
                onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-sky-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-all duration-300"
              />
              
              <input
                type="url"
                placeholder="Verification URL (optional)"
                value={editingCert.url || ''}
                onChange={(e) => setEditingCert({ ...editingCert, url: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-sky-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-all duration-300"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveCertification}
                disabled={!editingCert.title || !editingCert.issuer}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300"
              >
                <Save size={20} className="mr-2" />
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingCert(null);
                }}
                className="px-4 py-3 border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-black rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;