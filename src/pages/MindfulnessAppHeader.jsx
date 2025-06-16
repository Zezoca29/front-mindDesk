import React, { useState, useEffect } from 'react';
import {
  Leaf,
  Bell,
  Menu,
  X,
  BookOpen,
  User,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Heart,
  Share2,
  Sun,
  Moon,
  Sparkles,
  Award
} from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { Link } from 'react-router-dom';
import './MindfulnessAppHeader.css'; // Importar o CSS para estilos adicionais

const MindfulnessHeader = ({ onPremiumToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streak, setStreak] = useState(12);
  const { user: userInfo, isAuthenticated, logout } = useAuth();

  const [isPremium, setIsPremium] = useState(() => {
    const saved = localStorage.getItem('isPremium');
    return saved === 'true';
  });

  // Se quiser atualizar o estado caso o localStorage mude em outro lugar:
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('isPremium');
      setIsPremium(saved === 'true');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // dailyProgress pode estar em userInfo.user.dailyProgress ou userInfo.dailyProgress
  const dailyProgress =
    (userInfo && userInfo.user && userInfo.user.dailyProgress) ||
    (userInfo && userInfo.dailyProgress) ||
    {};

  // totalMindfulnessMinutes pode estar em userInfo.user.totalMindfulnessMinutes ou userInfo.totalMindfulnessMinutes
  const totalMindfulnessMinutes =
    (userInfo && userInfo.user && userInfo.user.totalMindfulnessMinutes) ||
    (userInfo && userInfo.totalMindfulnessMinutes) ||
    0;

  // Para drag do menu
  const menuRef = React.useRef(null);
  const [menuOffset, setMenuOffset] = useState(0);
  const [dragStartY, setDragStartY] = useState(null);

  // Funções para drag
  const handleDragStart = (e) => {
    setDragStartY(e.touches ? e.touches[0].clientY : e.clientY);
  };

  const handleDragMove = (e) => {
    if (dragStartY !== null) {
      const currentY = e.touches ? e.touches[0].clientY : e.clientY;
      const offset = currentY - dragStartY;
      if (offset > 0) setMenuOffset(offset);
    }
  };

  const handleDragEnd = () => {
    if (menuOffset > 120) {
      setIsMenuOpen(false);
    }
    setMenuOffset(0);
    setDragStartY(null);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getUserDisplayName = () => {
    console.log('userInfo atual:', userInfo);

    if (userInfo) {
      // Verifica se os dados estão no formato { success: true, user: {...} }
      if (userInfo.success && userInfo.user) {
        if (userInfo.user.nome) {
          return userInfo.user.nome;
        }
        if (userInfo.user.email) {
          return userInfo.user.email.split('@')[0];
        }
      }
      // Verifica se os dados estão diretamente no userInfo
      else if (userInfo.nome) {
        return userInfo.nome;
      }
      else if (userInfo.email) {
        return userInfo.email.split('@')[0];
      }
    }
    return 'Usuário';
  };

  const getUserInitials = () => {
    const displayName = getUserDisplayName();
    return displayName && displayName !== 'Usuário' ? displayName.charAt(0).toUpperCase() : 'U';
  };

  const getSubscriptionStatus = () => {
    if (userInfo) {
      // Verifica formato { success: true, user: {...} }
      if (userInfo.success && userInfo.user && userInfo.user.subscriptionStatus) {
        return userInfo.user.subscriptionStatus;
      }
      // Verifica formato direto
      else if (userInfo.subscriptionStatus) {
        return userInfo.subscriptionStatus;
      }
    }
    return 'free';
  };

  const getUserEmail = () => {
    if (userInfo) {
      // Verifica formato { success: true, user: {...} }
      if (userInfo.success && userInfo.user && userInfo.user.email) {
        return userInfo.user.email;
      }
      // Verifica formato direto
      else if (userInfo.email) {
        return userInfo.email;
      }
    }
    return '';
  };

  const getUserPoints = () => {
    if (userInfo) {
      // Verifica formato { success: true, user: {...} }
      if (userInfo.success && userInfo.user && userInfo.user.points) {
        return userInfo.user.points;
      }
      // Verifica formato direto
      else if (userInfo.points) {
        return userInfo.points;
      }
    }
    return 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getSubscriptionLabel = () => {
    const status = getSubscriptionStatus();
    switch (status) {
      case 'premium_plus':
        return 'Plano Premium Plus';
      case 'premium':
        return 'Plano Premium';
      case 'pro':
        return 'Plano Pro';
      case 'free':
      default:
        return 'Plano Gratuito';
    }
  };

  const getSubscriptionColor = () => {
    const status = getSubscriptionStatus();
    switch (status) {
      case 'premium_plus':
        return 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300';
      case 'premium':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      case 'pro':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'free':
      default:
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
    }
  };

  const [toggleParticles, setToggleParticles] = useState([]);
  const handleToggle = (e) => {
    setIsPremium((prev) => !prev);

    // Efeito partículas
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const velocity = 50;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      newParticles.push({
        id: Math.random() + Date.now() + i,
        x,
        y,
        vx,
        vy,
        color: !isPremium ? '#22d3ee' : '#a855f7'
      });
    }
    setToggleParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    if (toggleParticles.length === 0) return;
    const timeout = setTimeout(() => {
      setToggleParticles([]);
    }, 600);
    return () => clearTimeout(timeout);
  }, [toggleParticles]);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <style>{`
        /* Variáveis CSS para cores e efeitos */
        :root {
          --mindfulness-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --mindfulness-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --mindfulness-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --mindfulness-success: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          --glass-bg: rgba(255, 255, 255, 0.1);
          --glass-border: rgba(255, 255, 255, 0.2);
          --shadow-glow: 0 8px 32px rgba(0, 0, 0, 0.12);
          --shadow-intense: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        /* Animações customizadas */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(167, 139, 250, 0.3); }
          50% { box-shadow: 0 0 30px rgba(167, 139, 250, 0.6); }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Efeitos para o header */
        .mindfulness-header {
          position: relative;
          overflow: hidden;
        }

        .mindfulness-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 3s infinite;
          z-index: 1;
        }

        /* Logo aprimorado */
        .mindfulness-logo {
          position: relative;
          animation: float 6s ease-in-out infinite;
        }

        .mindfulness-logo::before {
          content: '';
          position: absolute;
          inset: -4px;
          background: var(--mindfulness-accent);
          border-radius: 20px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mindfulness-logo:hover::before {
          opacity: 0.3;
          animation: glow-pulse 2s infinite;
        }

        /* Efeito glassmorphism aprimorado */
        .glass-effect {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: var(--shadow-glow);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-effect:hover {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: var(--shadow-intense);
          transform: translateY(-2px);
        }

        /* Botões interativos */
        .interactive-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .interactive-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .interactive-button:active::before {
          width: 300px;
          height: 300px;
          animation: ripple 0.6s ease-out;
        }

        /* Barra de progresso animada */
        .progress-bar {
          position: relative;
          overflow: hidden;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        /* Menu lateral responsivo e melhorado */
        .side-menu {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 9999 !important;
        }

        .side-menu-mobile {
          animation: slideInDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-item {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0;
          background: var(--mindfulness-primary);
          transition: width 0.3s ease;
          z-index: -1;
        }

        .menu-item:hover::before {
          width: 100%;
        }

        .menu-item:hover {
          color: white;
          transform: translateX(8px);
        }

        /* Partículas flutuantes */
        .particle-1 {
          animation: float 8s ease-in-out infinite;
        }

        .particle-2 {
          animation: float 12s ease-in-out infinite reverse;
        }

        .particle-3 {
          animation: sparkle 4s ease-in-out infinite;
        }

        /* Efeito de hover para cards */
        .stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: var(--mindfulness-accent);
          opacity: 0;
          transform: rotate(45deg);
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .stat-card:hover {
          transform: scale(1.05) rotateX(5deg);
          box-shadow: var(--shadow-intense);
        }

        .stat-card:hover::before {
          opacity: 0.1;
        }

        /* Animação para notificação */
        .notification-badge {
          animation: glow-pulse 2s infinite;
        }

        /* Transições suaves para o tema escuro */
        .dark-transition {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        /* Overlay com blur aprimorado */
        .overlay-blur {
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          transition: all 0.3s ease;
          animation: fadeIn 0.3s ease;
          z-index: 9998 !important;
        }

        /* Efeito de digitação para o tempo */
        .time-display {
          font-family: 'Courier New', monospace;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.05em;
        }

        /* Scroll customizado */
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background: var(--mindfulness-primary);
          border-radius: 3px;
        }

        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--mindfulness-secondary);
        }

        /* Responsividade aprimorada */
        @media (max-width: 640px) {
          .mindfulness-header {
            padding: 0.5rem;
          }
          
          .side-menu {
            width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh;
          }
          
          .menu-item {
            padding: 1rem 1.5rem;
          }
          
          .stat-card {
            padding: 1rem;
          }
        }

        @media (min-width: 641px) {
          .side-menu {
            width: 400px !important;
            max-width: 90vw;
            height: 100vh !important;
            right: 0 !important;
            left: auto !important;
          }
        }

        @media (min-width: 1024px) {
          .side-menu {
            width: 420px !important;
            max-width: 30vw;
          }
        }

        /* Menu container com posicionamento fixo */
        .menu-container {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 9999 !important;
          pointer-events: none;
        }

        .menu-container.active {
          pointer-events: all;
        }

        .menu-backdrop {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          animation: fadeIn 0.3s ease;
        }

        .menu-panel {
          position: absolute !important;
          top: 0 !important;
          right: 0 !important;
          height: 100vh !important;
          background: white;
          box-shadow: -20px 0 60px rgba(0, 0, 0, 0.3);
          animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .dark .menu-panel {
          background: rgb(15, 23, 42);
        }

        @media (max-width: 640px) {
          .menu-panel {
            width: 100vw !important;
            animation: slideInDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }

        @media (min-width: 641px) {
          .menu-panel {
            width: 400px !important;
            max-width: 90vw;
          }
        }

        @media (min-width: 1024px) {
          .menu-panel {
            width: 420px !important;
            max-width: 30vw;
          }
        }
          @keyframes explode {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--vx), var(--vy)) scale(0);
    opacity: 0;
  }
}
      `}</style>

      <header className="mindfulness-header relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 shadow-xl">
        {/* Efeito de partículas de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="particle-1 absolute -top-4 -left-4 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-xl"></div>
          <div className="particle-2 absolute top-1/2 right-8 w-16 h-16 bg-pink-300 bg-opacity-20 rounded-full blur-lg"></div>
          <div className="particle-3 absolute bottom-4 left-1/3 w-12 h-12 bg-yellow-300 bg-opacity-15 rounded-full blur-md"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Header principal */}
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              {/* Logo animado */}
              <div className="mindfulness-logo relative group">
                <div className="glass-effect w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                  <Leaf size={28} className="text-white drop-shadow-lg group-hover:animate-pulse" />
                </div>
                <div className="notification-badge absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-md"></div>
                <Sparkles size={12} className="particle-3 absolute -bottom-1 -left-1 text-yellow-300" />
              </div>

              {/* Brand info */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md tracking-tight">
                  Mind Desk
                </h1>
                <div className="flex items-center gap-2 text-sm">
                  <p className="text-blue-100 font-medium drop-shadow">
                    {getGreeting()}, sua jornada continua
                  </p>
                  <div className="hidden sm:flex items-center gap-1 px-2 py-1 glass-effect rounded-full">
                    <Award size={12} className="text-yellow-300" />
                    <span className="text-xs text-white font-semibold">{streak} dias</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-white text-sm time-display glass-effect px-3 py-2 rounded-lg">
                {formatTime(currentTime)}
              </div>

              {/* Toggle Glowing Premium Button */}
              {getSubscriptionStatus() !== 'free' && (
                <div className="flex items-center space-x-2">
                  <div className="toggle-container relative">
                    <span
                      className={`toggle-label free${isPremium ? ' inactive' : ''}`}
                      id="freeLabel"
                    >
                      Free
                    </span>
                    <button
                      className={`toggle-button ${isPremium ? 'premium' : 'free'}`}
                      aria-label={
                        isPremium ? 'Alternar para Free' : 'Alternar para Premium'
                      }
                      type="button"
                      onClick={(e) => {
                        handleToggle(e);
                        if (typeof onPremiumToggle === 'function') {
                          onPremiumToggle();
                        }
                      }}
                      style={{ position: 'relative', overflow: 'visible' }}
                    >
                      <div
                        className={`toggle-slider ${isPremium ? 'premium' : 'free'}`}
                        id="toggleSlider"
                      ></div>
                      {/* Partículas */}
                      {toggleParticles.map((p) => (
                        <div
                          key={p.id}
                          style={{
                            position: 'absolute',
                            left: p.x,
                            top: p.y,
                            width: 4,
                            height: 4,
                            background: p.color,
                            borderRadius: '50%',
                            pointerEvents: 'none',
                            animation: 'explode 0.6s ease-out forwards',
                            '--vx': `${p.vx}px`,
                            '--vy': `${p.vy}px`
                          }}
                        />
                      ))}
                    </button>
                    <span
                      className={`toggle-label premium${!isPremium ? ' inactive' : ''}`}
                      id="premiumLabel"
                    >
                      Premium
                    </span>
                  </div>
                </div>
              )}

              {/* Notificações */}
              <div className="relative">
                <button className="interactive-button glass-effect p-2.5 rounded-xl text-white hover:scale-105 focus-ring">
                  <Bell size={20} />
                </button>
                <div className="notification-badge absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Menu toggle */}
              <button
                onClick={toggleMenu}
                className="interactive-button glass-effect p-3 rounded-xl text-white hover:scale-105 shadow-lg focus-ring"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                <div className="relative">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
              </button>
            </div>
          </div>

          {/* Barra de progresso diário */}
          <div className="pb-4">
            <div className="glass-effect rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Meta diária de mindfulness</span>
                <span className="text-sm font-bold text-white glass-effect px-2 py-1 rounded-full">
                  {`${dailyProgress.percentage ?? 0}%`}
                </span>
              </div>
              <div className="progress-bar w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: `${dailyProgress.percentage ?? 0}%` }}
                >
                  <div className="h-full w-full bg-white bg-opacity-30 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay para fechar menu */}
        {isMenuOpen && (
          <div
            className="overlay-blur fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300"
            onClick={toggleMenu}
          />
        )}

        {/* Menu lateral arrastável */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="side-menu fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto h-full w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
            style={{
              transform: menuOffset ? `translateY(${menuOffset}px)` : 'none',
              transition: menuOffset ? 'none' : 'transform 0.3s cubic-bezier(0.4,0,0.2,1)'
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {/* Header do menu */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 cursor-grab active:cursor-grabbing select-none">
              <div className="flex items-center gap-3">
                <Leaf size={24} className="text-white" />
                <h2 className="text-xl font-bold text-white">Menu</h2>
              </div>
              <button
                onClick={toggleMenu}
                className="interactive-button p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-20"
              >
                <X size={24} />
              </button>
            </div>

            {/* Perfil do usuário */}
            <div className="p-6 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-b border-gray-200 dark:border-slate-600">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white dark:border-slate-700">
                  <span>
                    {getUserInitials()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {getUserDisplayName()}
                  </div>
                  {userInfo && userInfo.user && userInfo.user.email && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {userInfo.user.email}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 ${getSubscriptionColor()} text-sm rounded-full font-medium`}>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {getSubscriptionLabel()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estatísticas rápidas */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="stat-card bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {(userInfo && userInfo.user && userInfo.user.streakCount) ||
                    (userInfo && userInfo.streakCount) ||
                    0}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Dias seguidos
                </div>
              </div>
              <div className="stat-card bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {totalMindfulnessMinutes}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Min. totais
                </div>
              </div>
            </div>

            {/* Menu items */}
            <nav className="custom-scroll flex-1 py-2 overflow-y-auto">
              {[
                {
                  icon: BookOpen,
                  label: 'Recomendações',
                  subtitle: 'Livros e conteúdos',
                  color: 'blue',
                  href: '/recomendacao'
                },
                {
                  icon: User,
                  label: 'Perfil',
                  subtitle: 'Suas informações',
                  color: 'gray',
                  href: '/perfil'
                }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="menu-item flex items-center px-6 py-4 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 border-l-4 border-transparent hover:border-indigo-500 group"
                  onClick={() => setIsMenuOpen(false)} // Fecha o menu ao navegar
                >
                  <item.icon
                    size={22}
                    className={`mr-4 text-${item.color}-500 group-hover:text-indigo-500 group-hover:scale-110 transition-all duration-200`}
                  />
                  <div className="flex-1">
                    <span className="font-medium block">{item.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.subtitle}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                </Link>
              ))}

              <hr className="my-4 border-gray-200 dark:border-slate-600 mx-6" />

              {/* Botão de logout funcional */}{'}'}
              <button
                onClick={logout}
                className="menu-item flex items-center w-full px-6 py-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 hover:text-red-700 dark:hover:text-red-300 group border-l-4 border-transparent hover:border-red-500"
              >
                <LogOut size={22} className="mr-4 group-hover:scale-110 transition-transform" />
                <div className="flex-1 text-left">
                  <span className="font-medium block">Sair</span>
                  <span className="text-xs text-red-400">Encerrar sessão</span>
                </div>
              </button>
            </nav>

            {/* Footer do menu */}
            <div className="p-6 border-t border-gray-200 dark:border-slate-600 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Leaf size={16} className="text-indigo-500" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Mindfulness App
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  v2.0 - Sua jornada de bem-estar
                </p>
                <div className="flex justify-center gap-3 mt-3">
                  <button className="interactive-button stat-card p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:shadow-md">
                    <Heart size={16} className="text-red-500" />
                  </button>
                  <button className="interactive-button stat-card p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:shadow-md">
                    <Share2 size={16} className="text-indigo-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </header >
    </div >
  );
};

export default MindfulnessHeader;