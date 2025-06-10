import React, { useState, useEffect } from 'react';
import { 
  User, 
  Palette, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Settings,
  Camera,
  Mail,
  Languages,
  Volume2,
  Smartphone,
  Eye,
  Save,
  Check
} from 'lucide-react';
import './Config.css'; // Importando o CSS para animações e estilos

export default function ModernSettingsScreen() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    language: 'pt-BR',
    avatar: null
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityTracking: false,
    dataSharing: false
  });
  const [isSaved, setIsSaved] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User, color: 'blue' },
    { id: 'appearance', label: 'Aparência', icon: Palette, color: 'purple' },
    { id: 'notifications', label: 'Notificações', icon: Bell, color: 'green' },
    { id: 'privacy', label: 'Privacidade', icon: Shield, color: 'red' },
    { id: 'language', label: 'Idioma', icon: Globe, color: 'orange' }
  ];

  const ToggleSwitch = ({ checked, onChange, color = 'blue' }) => (
    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
          checked ? 'translate-x-6' : 'translate-x-1'
        } ${checked ? `bg-${color}-500` : 'bg-white'}`}
      />
      <div className={`absolute inset-0 rounded-full transition-colors duration-200 ${
        checked ? `bg-gradient-to-r from-${color}-400 to-${color}-600` : 'bg-gray-200 dark:bg-gray-700'
      }`} />
    </div>
  );

  const InputField = ({ label, type = 'text', value, onChange, placeholder, icon: Icon }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500`}
        />
      </div>
    </div>
  );

  const Card = ({ children, className = '' }) => (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );

  const SectionHeader = ({ icon: Icon, title, color }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-xl bg-gradient-to-r from-${color}-400 to-${color}-600 shadow-lg`}>
        <Icon className="text-white" size={20} />
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Configurações
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Personalize sua experiência
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card className="p-6 sticky top-8">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r from-${tab.color}-400 to-${tab.color}-600 text-white shadow-lg transform scale-[1.02]`
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="space-y-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-fade-in">
                  <Card className="p-8">
                    <SectionHeader icon={User} title="Informações Pessoais" color="blue" />
                    
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <button className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-700 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
                          <Camera size={16} className="text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Foto do Perfil</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Clique no ícone para alterar</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="Nome Completo"
                        value={user.name}
                        onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Seu nome completo"
                        icon={User}
                      />
                      <InputField
                        label="Email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="seu@email.com"
                        icon={Mail}
                      />
                    </div>
                  </Card>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6 animate-fade-in">
                  <Card className="p-8">
                    <SectionHeader icon={Palette} title="Aparência" color="purple" />
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-600">
                            {isDarkMode ? <Moon className="text-white" size={20} /> : <Sun className="text-white" size={20} />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">Tema Escuro</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Alternar entre tema claro e escuro</p>
                          </div>
                        </div>
                        <ToggleSwitch checked={isDarkMode} onChange={toggleTheme} color="purple" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="font-medium text-gray-800 dark:text-white">Azul</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cor de destaque padrão</p>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 cursor-pointer transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            <span className="font-medium text-gray-800 dark:text-white">Roxo</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Alternativa vibrante</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-fade-in">
                  <Card className="p-8">
                    <SectionHeader icon={Bell} title="Notificações" color="green" />
                    
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600">
                              {key === 'email' && <Mail className="text-white" size={16} />}
                              {key === 'push' && <Smartphone className="text-white" size={16} />}
                              {key === 'sms' && <Volume2 className="text-white" size={16} />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 dark:text-white capitalize">
                                {key === 'email' ? 'Email' : key === 'push' ? 'Push' : 'SMS'}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Receber notificações via {key === 'email' ? 'email' : key === 'push' ? 'push' : 'SMS'}
                              </p>
                            </div>
                          </div>
                          <ToggleSwitch 
                            checked={value} 
                            onChange={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                            color="green"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6 animate-fade-in">
                  <Card className="p-8">
                    <SectionHeader icon={Shield} title="Privacidade" color="red" />
                    
                    <div className="space-y-4">
                      {Object.entries(privacy).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-full bg-gradient-to-r from-red-400 to-pink-600">
                              <Eye className="text-white" size={16} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 dark:text-white">
                                {key === 'profileVisible' ? 'Perfil Visível' : 
                                 key === 'activityTracking' ? 'Rastreamento de Atividade' : 'Compartilhamento de Dados'}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {key === 'profileVisible' ? 'Permitir que outros vejam seu perfil' : 
                                 key === 'activityTracking' ? 'Rastrear atividade para melhorar experiência' : 'Compartilhar dados para análises'}
                              </p>
                            </div>
                          </div>
                          <ToggleSwitch 
                            checked={value} 
                            onChange={() => setPrivacy(prev => ({ ...prev, [key]: !prev[key] }))}
                            color="red"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Language Tab */}
              {activeTab === 'language' && (
                <div className="space-y-6 animate-fade-in">
                  <Card className="p-8">
                    <SectionHeader icon={Globe} title="Idioma e Região" color="orange" />
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Idioma Principal
                        </label>
                        <div className="relative">
                          <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <select
                            value={user.language}
                            onChange={(e) => setUser(prev => ({ ...prev, language: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="pt-BR">🇧🇷 Português (Brasil)</option>
                            <option value="en-US">🇺🇸 English (US)</option>
                            <option value="es-ES">🇪🇸 Español</option>
                            <option value="fr-FR">🇫🇷 Français</option>
                            <option value="de-DE">🇩🇪 Deutsch</option>
                            <option value="it-IT">🇮🇹 Italiano</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaved}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    isSaved
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                  }`}
                >
                  {isSaved ? <Check size={20} /> : <Save size={20} />}
                  {isSaved ? 'Salvo!' : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}