import React, { useState, useEffect } from 'react';
import {
    User,
    Bell,
    Moon,
    Sun,
    Globe,
    Volume2,
    VolumeX,
    Smartphone,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Save,
    RefreshCw,
    Trash2,
    Download,
    Upload,
    Shield,
    Crown,
    Palette,
    Zap,
    Target,
    Calendar,
    Clock,
    Heart,
    Leaf,
    ChevronRight,
    Check,
    X,
    Info,
    AlertTriangle
} from 'lucide-react';

const Config = () => {
    // Estados para as configurações
    const [user, setUser] = useState({
        name: 'João Silva',
        email: 'joao@exemplo.com',
        theme: 'light',
        language: 'pt-BR',
        notifications: {
            daily: true,
            meditation: true,
            progress: false,
            email: true,
            push: true
        },
        preferences: {
            soundEnabled: true,
            autoPlay: false,
            sessionGoal: 15,
            reminderTime: '08:00',
            weeklyGoal: 5
        },
        privacy: {
            dataSharing: false,
            analytics: true,
            publicProfile: false
        }
    });

    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Simular carregamento de dados
    useEffect(() => {
        setIsDarkMode(user.theme === 'dark');
    }, [user.theme]);

    const handleInputChange = (section, field, value) => {
        setUser(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        // Simular salvamento
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const toggleTheme = () => {
        const newTheme = user.theme === 'light' ? 'dark' : 'light';
        setUser(prev => ({ ...prev, theme: newTheme }));
        setIsDarkMode(newTheme === 'dark');
    };

    const tabs = [
        { id: 'profile', label: 'Perfil', icon: User, color: 'blue' },
        { id: 'notifications', label: 'Notificações', icon: Bell, color: 'green' },
        { id: 'preferences', label: 'Preferências', icon: Zap, color: 'purple' },
        { id: 'privacy', label: 'Privacidade', icon: Shield, color: 'red' },
        { id: 'account', label: 'Conta', icon: Crown, color: 'yellow' }
    ];

    return (
        <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'}`}>
            <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        .switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #cbd5e1;
          transition: 0.3s;
          border-radius: 24px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background: white;
          transition: 0.3s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input:checked + .slider {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        input:checked + .slider:before {
          transform: translateX(24px);
        }
        
        .tab-active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .input-field {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .input-field:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .dark .card-hover:hover {
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
      `}</style>

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-slate-800 dark:via-purple-900 dark:to-slate-800 text-white py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="glass-effect p-3 rounded-xl">
                                <Leaf size={28} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">Configurações</h1>
                                <p className="text-indigo-100 text-sm">Personalize sua experiência</p>
                            </div>
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="glass-effect p-3 rounded-xl hover:scale-105 transition-transform duration-200"
                        >
                            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar com tabs */}
                    <div className="lg:w-1/4">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 sticky top-8">
                            <div className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full max-w-md sm:max-w-lg flex items-center gap-3 px-4 py-4 sm:py-5 rounded-xl text-left transition-all duration-200 group tab-active ${activeTab === tab.id
                                                ? 'tab-active'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        <tab.icon size={20} className={`transition-transform group-hover:scale-110`} />
                                        <span className="font-medium">{tab.label}</span>
                                        <ChevronRight size={16} className={`ml-auto transition-transform ${activeTab === tab.id ? 'rotate-90' : ''}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Conteúdo principal */}
                    <div className="lg:w-3/4">
                        <div className="space-y-6">
                            {/* Perfil */}
                            {activeTab === 'profile' && (
                                <div className="animate-slide-in space-y-6">
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 card-hover">
                                        <div className="flex items-center gap-4 mb-6">
                                            <User className="text-blue-500" size={24} />
                                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Informações Pessoais</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Nome Completo
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user.name}
                                                    onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                                                    className="input-field w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none"
                                                    placeholder="Seu nome completo"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={user.email}
                                                    onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                                                    className="input-field w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none"
                                                    placeholder="seu@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Idioma
                                            </label>
                                            <select
                                                value={user.language}
                                                onChange={(e) => setUser(prev => ({ ...prev, language: e.target.value }))}
                                                className="input-field w-full md:w-1/2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none"
                                            >
                                                <option value="pt-BR">Português (Brasil)</option>
                                                <option value="en-US">English (US)</option>
                                                <option value="es-ES">Español</option>
                                                <option value="fr-FR">Français</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 card-hover">
                                        <div className="flex items-center gap-4 mb-6">
                                            <Palette className="text-purple-500" size={24} />
                                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Aparência</h2>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-800 dark:text-white">Tema Escuro</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Alternar entre tema claro e escuro</p>
                                            </div>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={isDarkMode}
                                                    onChange={toggleTheme}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notificações */}
                            {activeTab === 'notifications' && (
                                <div className="animate-slide-in space-y-6">
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 card-hover">
                                        <div className="flex items-center gap-4 mb-6">
                                            <Bell className="text-green-500" size={24} />
                                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Notificações</h2>
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                { key: 'daily', label: 'Lembretes Diários', desc: 'Receba lembretes para suas sessões' },
                                                { key: 'meditation', label: 'Notificações de Meditação', desc: 'Alertas sobre novas meditações' },
                                                { key: 'progress', label: 'Progresso Semanal', desc: 'Relatório do seu progresso' },
                                                { key: 'email', label: 'Notificações por Email', desc: 'Receba updates por email' },
                                                { key: 'push', label: 'Notificações Push', desc: 'Notificações no dispositivo' }
                                            ].map((item) => (
                                                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800 dark:text-white">{item.label}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                                    </div>
                                                    <label className="switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={user.notifications[item.key]}
                                                            onChange={(e) => handleInputChange('notifications', item.key, e.target.checked)}
                                                        />
                                                        <span className="slider"></span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Preferências */}
                            {activeTab === 'preferences' && (
                                <div className="animate-slide-in space-y-6">
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 card-hover">
                                        <div className="flex items-center gap-4 mb-6">
                                            <Zap className="text-purple-500" size={24} />
                                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Preferências de Meditação</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    <Target className="inline mr-2" size={16} />
                                                    Meta de Sessão (minutos)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={user.preferences.sessionGoal}
                                                    onChange={(e) => handleInputChange('preferences', 'sessionGoal', parseInt(e.target.value))}
                                                    className="input-field w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none"
                                                    min="5"
                                                    max="120"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    <Clock className="inline mr-2" size={16} />
                                                    Horário do Lembrete
                                                </label>
                                                <input
                                                    type="time"
                                                    value={user.preferences.reminderTime}
                                                    onChange={(e) => handleInputChange('preferences', 'reminderTime', e.target.value)}
                                                    className="input-field w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    <Calendar className="inline mr-2" size={16} />
                                                    Meta Semanal (sessões)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={user.preferences.weeklyGoal}
                                                    onChange={(e) => handleInputChange('preferences', 'weeklyGoal', parseInt(e.target.value))}
                                                    className="input-field w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none"
                                                    min="1"
                                                    max="21"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700">
                                                <div className="flex items-center gap-3">
                                                    <Volume2 className="text-blue-500" size={20} />
                                                    <div>
                                                        <h3 className="font-medium text-gray-800 dark:text-white">Sons Habilitados</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Reproduzir sons durante a meditação</p>
                                                    </div>
                                                </div>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.preferences.soundEnabled}
                                                        onChange={(e) => handleInputChange('preferences', 'soundEnabled', e.target.checked)}
                                                    />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>

                                            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700">
                                                <div className="flex items-center gap-3">
                                                    <Zap className="text-green-500" size={20} />
                                                    <div>
                                                        <h3 className="font-medium text-gray-800 dark:text-white">Reprodução Automática</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Iniciar próxima sessão automaticamente</p>
                                                    </div>
                                                </div>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.preferences.autoPlay}
                                                        onChange={(e) => handleInputChange('preferences', 'autoPlay', e.target.checked)}
                                                    />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Privacidade */}
                            {activeTab === 'privacy' && (
                                <div className="animate-slide-in space-y-6">
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 card-hover">
                                        <div className="flex items-center gap-4 mb-6">
                                            <Shield className="text-red-500" size={24} />
                                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Privacidade e Segurança</h2>
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                {
                                                    key: 'dataSharing',
                                                    label: 'Compartilhamento de Dados',
                                                    desc: 'Compartilhar dados para melhorar a experiência',
                                                    icon: Upload,
                                                    color: 'blue'
                                                },
                                                {
                                                    key: 'analytics',
                                                    label: 'Analytics',
                                                    desc: 'Permitir coleta de dados de uso anônimos',
                                                    icon: BarChart3,
                                                    color: 'green'
                                                },
                                                {
                                                    key: 'publicProfile',
                                                    label: 'Perfil Público',
                                                    desc: 'Tornar seu perfil visível para outros usuários',
                                                    icon: Eye,
                                                    color: 'purple'
                                                }
                                            ].map((item) => (
                                                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700">
                                                    <div className="flex items-center gap-3">
                                                        <item.icon className={`text-${item.color}-500`} size={20} />
                                                        <div>
                                                            <h3 className="font-medium text-gray-800 dark:text-white">{item.label}</h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                    <label className="switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={user.privacy[item.key]}
                                                            onChange={(e) => handleInputChange('privacy', item.key, e.target.checked)}
                                                        />
                                                        <span className="slider"></span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                                            <div className="flex items-start gap-3">
                                                <Info className="text-yellow-600 dark:text-yellow-400 mt-0.5" size={20} />
                                                <div>
                                                    <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Sobre seus dados</h3>
                                                    <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                                                        Seus dados são criptografados e nunca compartilhados sem seu consentimento explícito.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Conta */}
                            {activeTab === 'account' && (
                                <div className="animate-slide-in space-y-6">
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 card-hover">
                                        <div className="flex items-center gap-4 mb-6">
                                            <Crown className="text-yellow-500" size={24} />
                                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Gerenciar Conta</h2>
                                        </div>

                                        <div className="space-y-4">
                                            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors text-left">
                                                <Download className="text-blue-500" size={20} />
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Exportar Dados</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Baixar uma cópia dos seus dados</p>
                                                </div>
                                                <ChevronRight className="ml-auto text-gray-400" size={16} />
                                            </button>

                                            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors text-left">
                                                <RefreshCw className="text-green-500" size={20} />
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Sincronizar Dados</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Sincronizar com outros dispositivos</p>
                                                </div>
                                                <ChevronRight className="ml-auto text-gray-400" size={16} />
                                            </button>

                                            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-left border border-red-200 dark:border-red-700">
                                                <Trash2 className="text-red-500" size={20} />
                                                <div>
                                                    <h3 className="font-medium text-red-600 dark:text-red-400">Excluir Conta</h3>
                                                    <p className="text-sm text-red-500 dark:text-red-400">Remover permanentemente sua conta</p>
                                                </div>
                                                <ChevronRight className="ml-auto text-red-400" size={16} />
                                            </button>
                                        </div>

                                        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="text-red-600 dark:text-red-400 mt-0.5" size={20} />
                                                <div>
                                                    <h3 className="font-medium text-red-800 dark:text-red-300">Atenção</h3>
                                                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                                                        A exclusão da conta é irreversível e todos os seus dados serão perdidos permanentemente.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Botão de salvar */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl animate-pulse-custom"
                                >
                                    {isLoading ? (
                                        <>
                                            <RefreshCw className="animate-spin" size={20} />
                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            Salvar Configurações
                                        </>
                                    )}
                                </button>

                                <button className="px-6 py-4 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Toast de sucesso */}
            {showSuccess && (
                <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
                    <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
                        <Check size={20} className="text-white" />
                        <span>Configurações salvas com sucesso!</span>
                        <button
                            className="ml-4"
                            onClick={() => setShowSuccess(false)}
                            aria-label="Fechar"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Config;