import React, { useState, useEffect } from 'react';
import {
    User,
    Crown,
    TrendingUp,
    Calendar,
    Award,
    Settings,
    Star,
    Zap,
    Heart,
    Brain,
    Target,
    Clock,
    CheckCircle,
    ArrowUp,
    Sparkles,
    Gift,
    BarChart3,
    Activity,
    Moon,
    Sun,
    Coffee,
    Smile,
    Meh,
    Frown,
    ChevronRight
} from 'lucide-react';

import './Perfil.css'

// Simulando dados do contexto de autenticação
const mockUserData = {
    success: true,
    user: {
        nome: 'Kaique Zêza',
        email: 'kaiquezeza@email.com',
        cargo: 'Engenheiro de Software',
        telefone: '(11) 93221-4535',
        empresa: 'Zez Technology',
        subscriptionStatus: 'free',
        points: 1247,
        joinDate: '2024-01-15',
        streak: 12,
        totalSessions: 89,
        totalMinutes: 1420,
        level: 'Iniciante Avançado',
        avatar: null
    }
};

const Perfil = () => {
    const [userInfo] = useState(mockUserData);
    const [moodData, setMoodData] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState('premium');
    const [showUpgrade, setShowUpgrade] = useState(false);

    // Gerar dados de humor dos últimos 30 dias
    useEffect(() => {
        const generateMoodData = () => {
            const data = [];
            const today = new Date();
            const moods = ['happy', 'neutral', 'sad', 'excited', 'calm'];
            const moodColors = {
                happy: '#10b981',
                excited: '#f59e0b',
                calm: '#3b82f6',
                neutral: '#6b7280',
                sad: '#ef4444'
            };

            for (let i = 29; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const mood = moods[Math.floor(Math.random() * moods.length)];
                const intensity = Math.floor(Math.random() * 5) + 1;

                data.push({
                    date: date.getDate(),
                    mood,
                    intensity,
                    color: moodColors[mood],
                    sessions: Math.floor(Math.random() * 3) + 1
                });
            }
            return data;
        };

        setMoodData(generateMoodData());
    }, []);

    // Funções de utilidade baseadas no Header
    const getUserDisplayName = () => {
        if (userInfo?.success && userInfo?.user) {
            return userInfo.user.nome || userInfo.user.email?.split('@')[0] || 'Usuário';
        }
        return 'Usuário';
    };

    const getUserInitials = () => {
        const displayName = getUserDisplayName();
        return displayName && displayName !== 'Usuário'
            ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            : 'U';
    };

    const getSubscriptionStatus = () => {
        return userInfo?.user?.subscriptionStatus || 'free';
    };

    const getSubscriptionLabel = () => {
        const status = getSubscriptionStatus();
        const labels = {
            'premium_plus': 'Premium Plus',
            'premium': 'Premium',
            'pro': 'Pro',
            'free': 'Gratuito'
        };
        return labels[status] || 'Gratuito';
    };

    const getSubscriptionColor = () => {
        const status = getSubscriptionStatus();
        const colors = {
            'premium_plus': 'from-purple-500 to-pink-500',
            'premium': 'from-purple-500 to-blue-500',
            'pro': 'from-blue-500 to-cyan-500',
            'free': 'from-gray-400 to-gray-500'
        };
        return colors[status] || 'from-gray-400 to-gray-500';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long'
        });
    };

    const getMoodIcon = (mood) => {
        const icons = {
            happy: Smile,
            excited: Zap,
            calm: Heart,
            neutral: Meh,
            sad: Frown
        };
        return icons[mood] || Meh;
    };

    const plans = [
        {
            name: 'Premium',
            price: 'R$ 19,90',
            period: '/mês',
            features: [
                'Meditações ilimitadas',
                'Conteúdo exclusivo',
                'Relatórios detalhados',
                'Suporte prioritário'
            ],
            popular: true,
            gradient: 'from-purple-500 to-blue-500'
        },
        {
            name: 'Premium Plus',
            price: 'R$ 29,90',
            period: '/mês',
            features: [
                'Tudo do Premium',
                'Coach pessoal IA',
                'Sessões personalizadas',
                'Acesso antecipado'
            ],
            popular: false,
            gradient: 'from-purple-500 to-pink-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.6); }
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .dark .glass-card {
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .mood-cell {
          transition: all 0.2s ease;
        }
        
        .mood-cell:hover {
          transform: scale(1.2);
          z-index: 10;
        }
          .space-y-1 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 0.25rem;
            margin-left: 1rem;
        }
         .text-3xl {
            font-size: 1.875rem;
            margin: 1rem;
        }
      `}</style>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header do Perfil */}
                <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-center gap-6 text-black">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-black font-bold text-2xl shadow-xl">
                                        {getUserInitials()}
                                    </div>
                                </div>

                                <div className="space-y-1 ml-2">
                                    <h1 className="text-3xl font-bold text-gray-800 dark:text-black">
                                        {getUserDisplayName()}
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {userInfo?.user?.email}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${getSubscriptionColor()} text-black text-sm rounded-full font-medium border border-black`}>
                                            <Crown size={14} />
                                            {getSubscriptionLabel()}
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-sm rounded-full font-medium border border-black">
                                            <Award size={14} />
                                            {userInfo?.user?.level}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6 lg:mt-0">
                                <button className="glass-card px-4 py-2 rounded-xl hover:scale-105 transition-transform flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <Settings size={18} />
                                    Editar
                                </button>
                                {getSubscriptionStatus() === 'free' && (
                                    <button
                                        onClick={() => setShowUpgrade(true)}
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-black px-6 py-2 rounded-xl hover:scale-105 transition-transform flex items-center gap-2 font-medium"
                                    >
                                        <Sparkles size={18} />
                                        Upgrade
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Grid de Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        {
                            title: 'Sequência',
                            value: userInfo?.user?.streak || 0,
                            unit: 'dias',
                            icon: Target,
                            color: 'from-orange-500 to-red-500',
                            growth: '+2 hoje'
                        },
                        {
                            title: 'Sessões',
                            value: userInfo?.user?.totalSessions || 0,
                            unit: 'total',
                            icon: Activity,
                            color: 'from-blue-500 to-cyan-500',
                            growth: '+5 esta semana'
                        },
                        {
                            title: 'Minutos',
                            value: userInfo?.user?.totalMinutes || 0,
                            unit: 'totais',
                            icon: Clock,
                            color: 'from-green-500 to-emerald-500',
                            growth: '+45 hoje'
                        },
                        {
                            title: 'Pontos',
                            value: userInfo?.user?.points || 0,
                            unit: 'XP',
                            icon: Star,
                            color: 'from-purple-500 to-pink-500',
                            growth: '+120 hoje'
                        }
                    ].map((stat, index) => (
                        <div key={index} className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4 text-black">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-black shadow-lg`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                        <ArrowUp size={12} />
                                        {stat.growth}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-black">
                                    {stat.value.toLocaleString()}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 capitalize">
                                    {stat.unit} • {stat.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Gráfico de Humor Mensal */}
                    <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-black mb-1">
                                    Humor dos Últimos 30 Dias
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Acompanhe sua jornada emocional
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {[
                                    { mood: 'happy', label: 'Feliz', color: '#10b981' },
                                    { mood: 'excited', label: 'Animado', color: '#f59e0b' },
                                    { mood: 'calm', label: 'Calmo', color: '#3b82f6' },
                                    { mood: 'neutral', label: 'Neutro', color: '#6b7280' },
                                    { mood: 'sad', label: 'Triste', color: '#ef4444' }
                                ].map((item) => (
                                    <div key={item.mood} className="flex items-center gap-1 text-xs">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Grid de Humor */}
                        <div className="grid grid-cols-10 gap-1 mb-4">
                            {moodData.map((day, index) => {
                                const MoodIcon = getMoodIcon(day.mood);
                                return (
                                    <div
                                        key={index}
                                        className="mood-cell aspect-square rounded-lg flex items-center justify-center relative group cursor-pointer"
                                        style={{ backgroundColor: day.color + '20', border: `2px solid ${day.color}40` }}
                                        title={`Dia ${day.date}: ${day.mood} (${day.sessions} sessões)`}
                                    >
                                        <MoodIcon
                                            size={16}
                                            style={{ color: day.color }}
                                            className="opacity-70 group-hover:opacity-100"
                                        />
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                                            Dia {day.date}: {day.sessions} sessões
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Estatísticas do Humor */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-500 mb-1">18</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Dias positivos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-500 mb-1">8</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Dias neutros</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-500 mb-1">4</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Dias desafiadores</div>
                            </div>
                        </div>
                    </div>

                    {/* Painel de Upgrade */}
                    <div className="space-y-6">
                        {getSubscriptionStatus() === 'free' && (
                            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-white"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-black">
                                            <Crown size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-black">
                                                Desbloqueie o Potencial
                                            </h3>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Acesso completo ao Mind Desk
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {[
                                            'Meditações ilimitadas',
                                            'Relatórios detalhados',
                                            'Coach pessoal IA',
                                            'Conteúdo exclusivo'
                                        ].map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm">
                                                <CheckCircle size={16} className="text-green-500" />
                                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setShowUpgrade(true)}
                                        className="w-fit px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-black text-lg rounded-xl font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                    >
                                        <Sparkles size={18} />
                                        Fazer Upgrade
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Informações Adicionais */}
                        <div className="glass-card rounded-2xl p-6">
                            <h3 className="font-bold text-gray-800 dark:text-black mb-4">
                                Informações da Conta
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">Membro desde</span>
                                    <span className="font-medium text-gray-800 dark:text-black text-sm">
                                        {formatDate(userInfo?.user?.joinDate)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">Empresa</span>
                                    <span className="font-medium text-gray-800 dark:text-white text-sm">
                                        {userInfo?.user?.empresa}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">Cargo</span>
                                    <span className="font-medium text-gray-800 dark:text-white text-sm">
                                        {userInfo?.user?.cargo}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">Telefone</span>
                                    <span className="font-medium text-gray-800 dark:text-white text-sm">
                                        {userInfo?.user?.telefone}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Próximas Metas */}
                        <div className="glass-card rounded-2xl p-6">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <Target size={20} />
                                Próximas Metas
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { goal: 'Sequência de 15 dias', progress: 80, reward: '50 XP' },
                                    { goal: '100 sessões totais', progress: 89, reward: 'Badge Dedicado' },
                                    { goal: '2000 minutos', progress: 71, reward: 'Unlock Premium Trial' }
                                ].map((item, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                                                {item.goal}
                                            </span>
                                            <span className="text-xs text-purple-600 dark:text-purple-400">
                                                {item.reward}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${item.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                            {item.progress}% completo
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Upgrade */}
            {showUpgrade && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="glass-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 sm:p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-black mx-auto mb-4">
                                    <Crown size={32} />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                                    Desbloqueie Seu Potencial
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Escolha o plano perfeito para sua jornada de mindfulness
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {plans.map((plan, index) => (
                                    <div
                                        key={index}
                                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedPlan === plan.name.toLowerCase()
                                            ? 'border-purple-500 scale-105'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                                            } ${plan.popular ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}`}
                                        onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-medium">
                                                    Mais Popular
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-center mb-6">
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                                {plan.name}
                                            </h3>
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-3xl font-bold text-gray-800 dark:text-white">
                                                    {plan.price}
                                                </span>
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    {plan.period}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {plan.features.map((feature, fIndex) => (
                                                <div key={fIndex} className="flex items-center gap-3">
                                                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                                                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => setShowUpgrade(false)}
                                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Talvez depois
                                </button>
                                <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:scale-105 transition-transform flex items-center gap-2">
                                    <Crown size={18} />
                                    Fazer Upgrade Agora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Perfil;