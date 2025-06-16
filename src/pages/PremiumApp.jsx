import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Brain, 
  Target, 
  Users, 
  Play, 
  Pause, 
  BarChart3, 
  BookOpen, 
  Zap, 
  Award, 
  Calendar,
  Timer,
  TrendingUp,
  MessageCircle,
  Video,
  Trophy,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const PremiumScreen = () => {
  const [activeModule, setActiveModule] = useState('productivity');
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutos
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [weeklyFocus, setWeeklyFocus] = useState(847); // minutos
  const [studyProgress, setStudyProgress] = useState(68);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Meditar 10 min', streak: 12, completed: true },
    { id: 2, name: 'Ler 30 páginas', streak: 8, completed: false },
    { id: 3, name: 'Exercitar-se', streak: 5, completed: true }
  ]);
  const [mindCoins, setMindCoins] = useState(342);
  
  const pomodoroIntervalRef = useRef(null);

  useEffect(() => {
    if (isPomodoroActive && pomodoroTime > 0) {
      pomodoroIntervalRef.current = setInterval(() => {
        setPomodoroTime(prev => {
          if (prev <= 1) {
            setIsPomodoroActive(false);
            // Aqui seria tocado um som de finalização
            return 25 * 60; // Reset para 25 minutos
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (pomodoroIntervalRef.current) {
        clearInterval(pomodoroIntervalRef.current);
      }
    };
  }, [isPomodoroActive, pomodoroTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePomodoro = () => {
    setIsPomodoroActive(!isPomodoroActive);
  };

  const toggleHabit = (habitId) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
  };

  const renderProductivityModule = () => (
    <div className="premium-module-content">
      <div className="module-header">
        <div className="module-icon">
          <Clock size={32} />
        </div>
        <div>
          <h2>Produtividade Avançada</h2>
          <p>Transforme seu foco em resultados</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{currentStreak}</div>
          <div className="stat-label">Dias de Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{Math.floor(weeklyFocus / 60)}h {weeklyFocus % 60}m</div>
          <div className="stat-label">Foco Semanal</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">89%</div>
          <div className="stat-label">Eficiência</div>
        </div>
      </div>

      <div className="pomodoro-section">
        <div className="pomodoro-timer">
          <div className="timer-circle">
            <div className="timer-display">{formatTime(pomodoroTime)}</div>
            <div className="timer-label">Pomodoro</div>
          </div>
        </div>
        
        <div className="pomodoro-controls">
          <button 
            className={`pomodoro-btn ${isPomodoroActive ? 'active' : ''}`}
            onClick={togglePomodoro}
          >
            {isPomodoroActive ? <Pause size={20} /> : <Play size={20} />}
            {isPomodoroActive ? 'Pausar' : 'Iniciar'}
          </button>
        </div>

        <div className="preset-options">
          <button onClick={() => setPomodoroTime(25 * 60)}>25 min</button>
          <button onClick={() => setPomodoroTime(52 * 60)}>52 min</button>
          <button onClick={() => setPomodoroTime(90 * 60)}>90 min</button>
        </div>
      </div>

      <div className="feature-list">
        <div className="feature-item">
          <BarChart3 size={24} />
          <div>
            <h4>Relatórios Semanais</h4>
            <p>Insights detalhados sobre sua produtividade</p>
          </div>
          <ChevronRight size={20} />
        </div>
        <div className="feature-item">
          <Zap size={24} />
          <div>
            <h4>Modo Foco</h4>
            <p>Bloqueie distrações durante o trabalho</p>
          </div>
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );

  const renderLearningModule = () => (
    <div className="premium-module-content">
      <div className="module-header">
        <div className="module-icon">
          <Brain size={32} />
        </div>
        <div>
          <h2>Learning Lab</h2>
          <p>Estudo inteligente e eficiente</p>
        </div>
      </div>

      <div className="progress-card">
        <div className="progress-header">
          <h3>Progresso Atual</h3>
          <span className="progress-percentage">{studyProgress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${studyProgress}%` }}
          ></div>
        </div>
        <p>Curso: Desenvolvimento Pessoal</p>
      </div>

      <div className="study-stats">
        <div className="study-stat">
          <div className="stat-icon">
            <BookOpen size={24} />
          </div>
          <div>
            <div className="stat-number">127</div>
            <div className="stat-label">Cards Revisados</div>
          </div>
        </div>
        <div className="study-stat">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-number">92%</div>
            <div className="stat-label">Taxa de Acerto</div>
          </div>
        </div>
      </div>

      <div className="feature-list">
        <div className="feature-item">
          <Zap size={24} />
          <div>
            <h4>Flashcards SRS</h4>
            <p>Repetição espaçada para melhor retenção</p>
          </div>
          <ChevronRight size={20} />
        </div>
        <div className="feature-item">
          <Calendar size={24} />
          <div>
            <h4>Planejador de Estudos</h4>
            <p>Organize seu cronograma de aprendizado</p>
          </div>
          <ChevronRight size={20} />
        </div>
        <div className="feature-item">
          <Target size={24} />
          <div>
            <h4>Quizzes Inteligentes</h4>
            <p>Testes adaptativos baseados em suas notas</p>
          </div>
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );

  const renderHabitsModule = () => (
    <div className="premium-module-content">
      <div className="module-header">
        <div className="module-icon">
          <Target size={32} />
        </div>
        <div>
          <h2>Construtor de Hábitos</h2>
          <p>Transforme pequenas ações em grandes mudanças</p>
        </div>
      </div>

      <div className="coins-display">
        <div className="coins-icon">
          <Sparkles size={24} />
        </div>
        <div className="coins-amount">{mindCoins} MindCoins</div>
      </div>

      <div className="habits-list">
        {habits.map(habit => (
          <div key={habit.id} className="habit-item">
            <div className="habit-info">
              <h4>{habit.name}</h4>
              <div className="habit-streak">
                <Award size={16} />
                {habit.streak} dias consecutivos
              </div>
            </div>
            <button 
              className={`habit-toggle ${habit.completed ? 'completed' : ''}`}
              onClick={() => toggleHabit(habit.id)}
            >
              {habit.completed ? '✓' : '○'}
            </button>
          </div>
        ))}
      </div>

      <button className="add-habit-btn">
        + Adicionar Novo Hábito
      </button>

      <div className="feature-list">
        <div className="feature-item">
          <Calendar size={24} />
          <div>
            <h4>Calendário de Streaks</h4>
            <p>Visualize seu progresso diário</p>
          </div>
          <ChevronRight size={20} />
        </div>
        <div className="feature-item">
          <Trophy size={24} />
          <div>
            <h4>Recompensas</h4>
            <p>Ganhe MindCoins e desbloqueie conquistas</p>
          </div>
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );

  const renderCommunityModule = () => (
    <div className="premium-module-content">
      <div className="module-header">
        <div className="module-icon">
          <Users size={32} />
        </div>
        <div>
          <h2>Clube Mind Desk</h2>
          <p>Conecte-se, aprenda e cresça junto</p>
        </div>
      </div>

      <div className="community-stats">
        <div className="community-stat">
          <div className="stat-number">1,247</div>
          <div className="stat-label">Membros Ativos</div>
        </div>
        <div className="community-stat">
          <div className="stat-number">23</div>
          <div className="stat-label">Salas de Chat</div>
        </div>
        <div className="community-stat">
          <div className="stat-number">8</div>
          <div className="stat-label">Lives Mensais</div>
        </div>
      </div>

      <div className="current-challenge">
        <div className="challenge-header">
          <h3>Desafio Atual</h3>
          <div className="challenge-badge">30 Dias Pomodoro</div>
        </div>
        <div className="challenge-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '40%' }}></div>
          </div>
          <p>12 de 30 dias completados</p>
        </div>
      </div>

      <div className="feature-list">
        <div className="feature-item">
          <MessageCircle size={24} />
          <div>
            <h4>Salas Temáticas</h4>
            <p>Produtividade, Estudo, Relaxamento</p>
          </div>
          <ChevronRight size={20} />
        </div>
        <div className="feature-item">
          <Video size={24} />
          <div>
            <h4>Lives e Workshops</h4>
            <p>Sessões ao vivo com especialistas</p>
          </div>
          <ChevronRight size={20} />
        </div>
        <div className="feature-item">
          <Target size={24} />
          <div>
            <h4>Desafios Gamificados</h4>
            <p>Compete e ganhe badges exclusivos</p>
          </div>
          <ChevronRight size={20} />
        </div>
        <div className="feature-item">
          <Users size={24} />
          <div>
            <h4>Mentoria em Grupo</h4>
            <p>Sprints quinzenais com coaches</p>
          </div>
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'productivity':
        return renderProductivityModule();
      case 'learning':
        return renderLearningModule();
      case 'habits':
        return renderHabitsModule();
      case 'community':
        return renderCommunityModule();
      default:
        return renderProductivityModule();
    }
  };

  return (
    <div className="premium-container">
      <div className="premium-header">
        <div className="premium-badge">
          <Sparkles size={20} />
          <span>PREMIUM</span>
        </div>
        <h1>Mind Desk Pro</h1>
        <p>Desbloqueie todo seu potencial</p>
      </div>

      <main className="premium-main">
        {renderModuleContent()}
      </main>

      <div className="premium-nav">
        <div
          className={`nav-item ${activeModule === 'productivity' ? 'active' : ''}`}
          onClick={() => setActiveModule('productivity')}
        >
          <Clock size={24} />
          <span>Produtividade</span>
        </div>
        <div
          className={`nav-item ${activeModule === 'learning' ? 'active' : ''}`}
          onClick={() => setActiveModule('learning')}
        >
          <Brain size={24} />
          <span>Learning</span>
        </div>
        <div
          className={`nav-item ${activeModule === 'habits' ? 'active' : ''}`}
          onClick={() => setActiveModule('habits')}
        >
          <Target size={24} />
          <span>Hábitos</span>
        </div>
        <div
          className={`nav-item ${activeModule === 'community' ? 'active' : ''}`}
          onClick={() => setActiveModule('community')}
        >
          <Users size={24} />
          <span>Comunidade</span>
        </div>
      </div>

      <style jsx>{`
        .premium-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .premium-header {
          text-align: center;
          padding: 2rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .premium-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .premium-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0.5rem 0;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .premium-header p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0;
        }

        .premium-main {
          padding: 2rem 1rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .premium-module-content {
          background: rgba(255, 255, 255, 0.95);
          color: #333;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .module-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .module-icon {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 1rem;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .module-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
        }

        .module-header p {
          margin: 0;
          opacity: 0.7;
          font-size: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 1.5rem 1rem;
          border-radius: 15px;
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .pomodoro-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .pomodoro-timer {
          margin-bottom: 1.5rem;
        }

        .timer-circle {
          width: 200px;
          height: 200px;
          border: 8px solid #667eea;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
        }

        .timer-display {
          font-size: 2.5rem;
          font-weight: 700;
          color: #667eea;
        }

        .timer-label {
          font-size: 1rem;
          color: #666;
          margin-top: 0.5rem;
        }

        .pomodoro-controls {
          margin-bottom: 1rem;
        }

        .pomodoro-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pomodoro-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .pomodoro-btn.active {
          background: linear-gradient(135deg, #ff6b6b, #ee5a24);
        }

        .preset-options {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .preset-options button {
          background: rgba(102, 126, 234, 0.1);
          border: 2px solid #667eea;
          color: #667eea;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .preset-options button:hover {
          background: #667eea;
          color: white;
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(102, 126, 234, 0.2);
          transform: translateX(5px);
        }

        .feature-item h4 {
          margin: 0 0 0.25rem 0;
          font-weight: 600;
        }

        .feature-item p {
          margin: 0;
          opacity: 0.7;
          font-size: 0.9rem;
        }

        .progress-card {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 1.5rem;
          border-radius: 15px;
          margin-bottom: 2rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .progress-header h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .progress-percentage {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .progress-bar {
          background: rgba(255, 255, 255, 0.2);
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-fill {
          background: linear-gradient(90deg, #ffd700, #ffed4e);
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .study-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .study-stat {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 15px;
        }

        .stat-icon {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 0.75rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coins-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #333;
          padding: 1rem;
          border-radius: 15px;
          margin-bottom: 2rem;
          font-weight: 600;
          font-size: 1.2rem;
        }

        .coins-icon {
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .habits-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .habit-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 15px;
        }

        .habit-info h4 {
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .habit-streak {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.7;
        }

        .habit-toggle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #667eea;
          background: transparent;
          color: #667eea;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .habit-toggle.completed {
          background: #667eea;
          color: white;
        }

        .add-habit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .add-habit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .community-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .community-stat {
          text-align: center;
          padding: 1rem;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 15px;
        }

        .current-challenge {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 1.5rem;
          border-radius: 15px;
          margin-bottom: 2rem;
        }

        .challenge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .challenge-header h3 {
          margin: 0;
        }

        .challenge-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .challenge-progress {
          margin-top: 1rem;
        }

        .premium-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding: 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.5rem;
        }

        .nav-item.active {
          color: #667eea;
          transform: translateY(-2px);
        }

        .nav-item span {
          font-size: 0.8rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .premium-header h1 {
            font-size: 2rem;
          }
          
          .premium-main {
            padding: 1rem;
            margin-bottom: 100px;
          }
          
          .premium-module-content {
            padding: 1.5rem;
          }
          
          .timer-circle {
            width: 150px;
            height: 150px;
          }
          
          .timer-display {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PremiumScreen;