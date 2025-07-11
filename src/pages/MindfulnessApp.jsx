import { useState, useEffect, useRef } from 'react';
import { Leaf, Heart, Wind, Activity, Menu, Moon, Sun, Cloud, VolumeX } from 'lucide-react';
import './mindfulnessApp.css';
import MindfulnessHeader from './MindfulnessAppHeader';
import { LogOut, Settings, User, X, Bell, Share2 } from 'lucide-react';
import PremiumScreen from './PremiumApp';
import { useAuth } from './contexts/AuthContext';
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
import './Premium.css'

export default function MindfulnessApp() {
  const [breathCount, setBreathCount] = useState(4);
  const [breathPhase, setBreathPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [activeTab, setActiveTab] = useState('breathing');
  const [journalEntries, setJournalEntries] = useState([]);
  const [newJournalEntry, setNewJournalEntry] = useState('');
  const [currentMood, setCurrentMood] = useState('neutral');
  const breathingIntervalRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeModule, setActiveModule] = useState('productivity');
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutos
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [weeklyFocus, setWeeklyFocus] = useState(847); // minutos
  const [studyProgress, setStudyProgress] = useState(68);
  const [newHabitName, setNewHabitName] = useState('');
  const [mindCoins, setMindCoins] = useState(342);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [newHabitTime, setNewHabitTime] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [habitsJsonData, setHabitsJsonData] = useState([]);


  const pomodoroIntervalRef = useRef(null);
  const [streak, setStreak] = useState(12);
  // Exemplo de tarefas para estatísticas de produtividade
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Estudar React', completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }, // 2 dias atrás
    { id: 2, name: 'Meditar', completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }, // 5 dias atrás
    { id: 3, name: 'Ler livro', completedAt: null }, // não concluída
    { id: 4, name: 'Fazer exercício', completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }, // 1 dia atrás
  ]);

  const weeklyTasksCompleted = getWeeklyTasksCompleted(tasks);

  // Use proxy URLs for development to avoid CORS issues
  const HABITS_API = import.meta.env.DEV ? '/api/habits' : import.meta.env.VITE_API_HABITS_LIST;
  const GET_HABITS_API = import.meta.env.DEV ? '/api/habits/get' : import.meta.env.VITE_API_HABITS_GET_LIST;

  const { user: userInfo, isAuthenticated, logout } = useAuth();

  const addHabit = async () => {
    if (!newHabitName.trim()) return;
    try {
      const habitData = {
        habitName: newHabitName,
        time: newHabitTime,
        description: newHabitDescription,
        user: userInfo?.user?.nome || userInfo?.nome || '', // Send the user's name
      };

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      };

      // Add ngrok header only when not using proxy
      if (!import.meta.env.DEV) {
        headers['ngrok-skip-browser-warning'] = 'true';
      }

      const res = await fetch(HABITS_API, {
        method: 'POST',
        headers,
        body: JSON.stringify(habitData),
      });
      const created = await res.json();
      setHabitsJsonData([created, ...habitsJsonData]); // ✅ Update habitsJsonData instead of habits
      setNewHabitName('');
      setNewHabitTime('');
      setNewHabitDescription('');
      setShowHabitForm(false);
    } catch (e) {
      // handle error
    }
  };

   // Test function to check API connectivity
  const testApiConnection = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      };

      // Add ngrok header only when not using proxy
      if (!import.meta.env.DEV) {
        headers['ngrok-skip-browser-warning'] = 'true';
      }

      const res = await fetch(GET_HABITS_API, {
        method: 'GET',
        headers,
      });
      
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('API connection failed:', error);
      throw error;
    }
  };

  const getHabitsAndLog = async () => {
  try {
    console.log('=== HABITS API DEBUG ===');
    console.log('VITE_API_HABITS_LIST:', GET_HABITS_API);
    console.log('Is ngrok URL:', GET_HABITS_API.includes('ngrok'));
    console.log('Full URL:', new URL(GET_HABITS_API, window.location.origin).href);
    console.log('Auth token:', localStorage.getItem('authToken') ? 'Present' : 'Missing');
    console.log('========================');
    
    // Teste direto no navegador
    console.log('🔗 Teste esta URL no navegador:', GET_HABITS_API);
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    };

    // Add ngrok header only when not using proxy
    if (!import.meta.env.DEV) {
      headers['ngrok-skip-browser-warning'] = 'true';
    }

    const res = await fetch(GET_HABITS_API, {
      method: 'GET',
      headers,
    });
    
    console.log('Response status:', res.status);
    console.log('Response headers:', Object.fromEntries(res.headers.entries()));
    
    // Check if response is JSON
    const contentType = res.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (!res.ok) {
      // Get the response text to see what error we're getting
      const errorText = await res.text();
      console.error('Error response body:', errorText);
      throw new Error(`HTTP error! status: ${res.status}, body: ${errorText.substring(0, 200)}`);
    }
    
    // Check if response is actually JSON
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await res.text();
      console.error('Response is not JSON:', responseText.substring(0, 500));
      throw new Error(`Expected JSON but got: ${contentType}`);
    }
    
    const data = await res.json();
    console.log('Habits JSON:', data);
    console.log('Number of habits:', Array.isArray(data) ? data.length : 'Not an array');
    
    setHabitsJsonData(data); // Salva o array direto
  } catch (e) {
    console.error('Error fetching habits:', e);
    setHabitsJsonData([]);
  }
};

  const toggleHabitAsync = async (habitId) => {
    const habit = habitsJsonData.find(h => h._id === habitId || h.id === habitId); // ✅ Use habitsJsonData
    if (!habit) return;
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      };

      // Add ngrok header only when not using proxy
      if (!import.meta.env.DEV) {
        headers['ngrok-skip-browser-warning'] = 'true';
      }

      const res = await fetch(`${HABITS_API}/${habitId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ completed: !habit.completed }),
      });
      const updated = await res.json();
      setHabitsJsonData(habitsJsonData.map(h => (h._id === habitId || h.id === habitId) ? updated : h)); // ✅ Update habitsJsonData
    } catch (e) {
      // handle error
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      };

      // Add ngrok header only when not using proxy
      if (!import.meta.env.DEV) {
        headers['ngrok-skip-browser-warning'] = 'true';
      }

      await fetch(`${HABITS_API}/${habitId}`, {
        method: 'DELETE',
        headers,
      });
      setHabitsJsonData(habitsJsonData.filter(h => (h._id || h.id) !== habitId)); // ✅ Update habitsJsonData
    } catch (e) {
      // handle error
    }
  };

  function getWeeklyTasksCompleted(tasks) {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return tasks.filter(task =>
      task.completedAt &&
      new Date(task.completedAt) >= weekAgo &&
      new Date(task.completedAt) <= now
    ).length;
  }


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

      <div className="feature-list">
        <div className="feature-item">
          <Calendar size={24} />
          <div>
            <h4>Planejador de Estudos</h4>
            <p>Organize seu cronograma de aprendizado</p>
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

      <div style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
        <button
          className="fetch-habits-btn"
          style={{ padding: '8px 16px', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          onClick={getHabitsAndLog}
        >
          Buscar Hábitos
        </button>
      </div>

      <div className="habits-list">
        {habitsJsonData.length > 0 ? (
          habitsJsonData.map((habit) => (
            <div key={habit._id || habit.id} className="habit-item">
              <div className="habit-info">
                <h4>{habit.name || habit.habitName}</h4>
                <div className="habit-streak">
                  <Award size={16} />
                  {habit.streak || 0} dias consecutivos
                </div>
              </div>
              <button
                className={`habit-toggle ${habit.completed ? 'completed' : ''}`}
                onClick={() => toggleHabitAsync(habit._id || habit.id)}
              >
                {habit.completed ? '✓' : '○'}
              </button>
              <button
                className="habit-delete-btn"
                onClick={() => deleteHabit(habit._id || habit.id)}
              >
                🗑️
              </button>
            </div>
          ))
        ) : (
          <div style={{ color: '#888', padding: 16 }}>
            Nenhum hábito encontrado. Crie um novo ou tente novamente.
          </div>
        )}
      </div>

      {!showHabitForm ? (
        <div className="add-habit-form">
          <button
            className="add-habit-btn"
            onClick={() => setShowHabitForm(true)}
          >
            + Adicionar Novo Hábito
          </button>
        </div>
      ) : (
        <div className="add-habit-form">
          <input
            type="text"
            value={newHabitName}
            onChange={e => setNewHabitName(e.target.value)}
            placeholder="Nome do hábito"
          />
          <input
            type="time"
            value={newHabitTime}
            onChange={e => setNewHabitTime(e.target.value)}
            placeholder="Horário (ex: 08:00)"
          />
          <input
            type="text"
            value={newHabitDescription}
            onChange={e => setNewHabitDescription(e.target.value)}
            placeholder="Descrição"
          />
          <button className="add-habit-btn" onClick={addHabit}>
            Salvar Hábito
          </button>
          <button
            className="cancel-habit-btn"
            onClick={() => setShowHabitForm(false)}
            style={{ marginLeft: 8 }}
          >
            Cancelar
          </button>
        </div>
      )}
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

  // Inicializa o estado lendo do localStorage
  const [isPremium, setIsPremium] = useState(() => {
    const saved = localStorage.getItem('isPremium');
    return saved === 'true';
  });

  const [showPremiumScreen, setShowPremiumScreen] = useState(() => {
    const saved = localStorage.getItem('showPremiumScreen');
    return saved === 'true';
  });

  // Sempre que isPremium mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem('isPremium', isPremium);
  }, [isPremium]);

  // Sempre que showPremiumScreen mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem('showPremiumScreen', showPremiumScreen);
  }, [showPremiumScreen]);

  const handlePremiumToggle = () => {
    setIsPremium((prev) => !prev);
    setShowPremiumScreen((prev) => !prev);
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

  const formatClockTime = (date) => {
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


  // Variáveis para a meditação
  const [activeMeditationSession, setActiveMeditationSession] = useState(null);
  const [meditationTimer, setMeditationTimer] = useState(300); // 5 minutos em segundos (padrão)
  const [backgroundSound, setBackgroundSound] = useState('nature'); // 'nature', 'rain', 'silence'
  const [isMeditationActive, setIsMeditationActive] = useState(false);
  const meditationIntervalRef = useRef(null);

  // Variáveis para as técnicas de relaxamento
  const [activeRelaxationTechnique, setActiveRelaxationTechnique] = useState(null);
  const [relaxationTimer, setRelaxationTimer] = useState(0);
  const [isRelaxationActive, setIsRelaxationActive] = useState(false);
  const relaxationIntervalRef = useRef(null);

  // Estado para controlar o carregamento do salvamento
  const [isSavingEntry, setIsSavingEntry] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Exercício de respiração
  useEffect(() => {
    if (isBreathingActive) {
      let totalCycle = 0;
      let phase = 'inhale';
      let count = 4;

      breathingIntervalRef.current = setInterval(() => {
        if (phase === 'inhale') {
          setBreathCount(prevCount => {
            if (prevCount > 1) return prevCount - 1;
            phase = 'hold';
            setBreathPhase('hold');
            return 4; // Reset para 4 na fase de segurar
          });
        } else if (phase === 'hold') {
          setBreathCount(prevCount => {
            if (prevCount > 1) return prevCount - 1;
            phase = 'exhale';
            setBreathPhase('exhale');
            return 6; // Reset para 6 na fase de exalar
          });
        } else if (phase === 'exhale') {
          setBreathCount(prevCount => {
            if (prevCount > 1) return prevCount - 1;

            // Completou um ciclo completo
            totalCycle++;

            // Após completar 5 ciclos, parar o exercício
            if (totalCycle >= 5) {
              setIsBreathingActive(false);
              clearInterval(breathingIntervalRef.current);
              setBreathPhase('inhale');
              return 4;
            }

            phase = 'inhale';
            setBreathPhase('inhale');
            return 4; // Reset para 4 na fase de inalar
          });
        }
      }, 1000);

      return () => {
        if (breathingIntervalRef.current) {
          clearInterval(breathingIntervalRef.current);
        }
      };
    }
  }, [isBreathingActive]);

  // Lógica do temporizador de meditação
  useEffect(() => {
    if (isMeditationActive && meditationTimer > 0) {
      meditationIntervalRef.current = setInterval(() => {
        setMeditationTimer(prevTime => {
          if (prevTime <= 1) {
            completeMeditation();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        if (meditationIntervalRef.current) {
          clearInterval(meditationIntervalRef.current);
        }
      };
    }
  }, [isMeditationActive, meditationTimer]);

  // Lógica do temporizador para técnicas de relaxamento
  useEffect(() => {
    if (isRelaxationActive && relaxationTimer > 0) {
      relaxationIntervalRef.current = setInterval(() => {
        setRelaxationTimer(prevTime => {
          if (prevTime <= 1) {
            completeRelaxationSession();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        if (relaxationIntervalRef.current) {
          clearInterval(relaxationIntervalRef.current);
        }
      };
    }
  }, [isRelaxationActive, relaxationTimer]);

  // Iniciar exercício de respiração
  const startBreathingExercise = () => {
    setBreathCount(4);
    setBreathPhase('inhale');
    setIsBreathingActive(true);
  };

  // Parar exercício de respiração
  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    setBreathCount(4);
    setBreathPhase('inhale');
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
    }
  };

  // Funcionalidade de meditação
  const startMeditation = (sessionType, duration) => {
    setActiveMeditationSession(sessionType);
    setMeditationTimer(duration);
    setIsMeditationActive(true);
  };

  const stopMeditation = () => {
    setIsMeditationActive(false);
    setActiveMeditationSession(null);
    if (meditationIntervalRef.current) {
      clearInterval(meditationIntervalRef.current);
    }
  };

  const completeMeditation = () => {
    stopMeditation();
    // Aqui poderíamos adicionar uma notificação ou som de finalização
  };

  // Funcionalidade de técnicas de relaxamento
  const startRelaxationTechnique = (technique, duration) => {
    setActiveRelaxationTechnique(technique);
    setRelaxationTimer(duration);
    setIsRelaxationActive(true);
  };

  const stopRelaxationTechnique = () => {
    setIsRelaxationActive(false);
    setActiveRelaxationTechnique(null);
    if (relaxationIntervalRef.current) {
      clearInterval(relaxationIntervalRef.current);
    }
  };

  const completeRelaxationSession = () => {
    stopRelaxationTechnique();
    // Aqui poderíamos adicionar uma notificação ou som de finalização
  };

  const changeMeditationSound = (sound) => {
    setBackgroundSound(sound);
    // Aqui poderíamos implementar a troca real do som de fundo
  };

  // Salvar entrada do diário
  const saveJournalEntry = async () => {
    if (newJournalEntry.trim() === '') return;

    setIsSavingEntry(true);
    setSaveError(null);

    try {
      // Preparar dados para envio
      const entryData = {
        content: newJournalEntry,
        mood: currentMood,
        emotions: {
          mood: currentMood,
          timestamp: new Date().toISOString()
        }
      };

      // Fazer requisição para a API
      const response = await fetch('/api/diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Assumindo que você tem um token de autenticação
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(entryData)
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar entrada no servidor');
      }

      const savedEntry = await response.json();

      // Criar entrada local para exibição imediata
      const newEntry = {
        id: savedEntry._id || Date.now(), // Use o ID do servidor ou timestamp como fallback
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: newJournalEntry,
        mood: currentMood,
        synced: true // Indica que foi sincronizada com o servidor
      };

      setJournalEntries([newEntry, ...journalEntries]);
      setNewJournalEntry('');
      setCurrentMood('neutral');

    } catch (error) {
      console.error('Erro ao salvar entrada:', error);
      setSaveError('Não foi possível salvar a entrada. Tente novamente.');

      // Salvar localmente como fallback
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: newJournalEntry,
        mood: currentMood,
        synced: false // Indica que não foi sincronizada
      };

      setJournalEntries([newEntry, ...journalEntries]);
      setNewJournalEntry('');
      setCurrentMood('neutral');
    } finally {
      setIsSavingEntry(false);
    }
  };

  // Obter classe para o círculo de respiração com base na fase
  const getBreathingCircleClass = () => {
    if (!isBreathingActive) return 'breathing-circle';

    if (breathPhase === 'inhale') {
      return 'breathing-circle inhale-animation';
    } else if (breathPhase === 'hold') {
      return 'breathing-circle hold-animation';
    } else {
      return 'breathing-circle exhale-animation';
    }
  };

  // Obter texto traduzido para a fase de respiração
  const getBreathPhaseText = () => {
    if (breathPhase === 'inhale') return 'INSPIRE';
    if (breathPhase === 'hold') return 'SEGURE';
    if (breathPhase === 'exhale') return 'EXPIRE';
    return '';
  };

  // Renderizar diferentes conteúdos com base na aba ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'breathing':
        return (
          <div className="exercise-container">
            <h2 className="section-title-2">Exercício de Respiração</h2>

            <div className="breathing-wrapper">
              <div className={getBreathingCircleClass()}>
                <div className="breath-text">
                  {getBreathPhaseText()}
                  <div className="breath-count">{breathCount}</div>
                </div>
              </div>
            </div>

            <p className="instruction-text">
              Inspire por 4 segundos - Segure por 4 segundos - Expire por 6 segundos
            </p>

            <button
              className="action-button start-button"
              onClick={isBreathingActive ? stopBreathingExercise : startBreathingExercise}
            >
              {isBreathingActive ? 'Parar' : 'Iniciar'}
            </button>
          </div>
        );

      case 'meditation':
        return (
          <div className="meditation-container">
            {!isMeditationActive ? (
              <>
                {/* Feature 1: Meditação Guiada */}
                <div className="feature-card">
                  <div className="feature-icon">
                    <Wind size={32} />
                  </div>
                  <h3>Meditação Guiada</h3>
                  <p>Escolha uma sessão de meditação abaixo</p>
                </div>

                <div className="meditation-options">
                  <div className="meditation-option">
                    <h4>5 Minutos de Mindfulness</h4>
                    <p>Meditação rápida para se centrar</p>
                    <button
                      className="action-button"
                      onClick={() => startMeditation('mindfulness', 5 * 60)}
                    >
                      Iniciar
                    </button>
                  </div>

                  <div className="meditation-option">
                    <h4>15 Minutos de Relaxamento Profundo</h4>
                    <p>Prática mais profunda para redução de estresse</p>
                    <button
                      className="action-button"
                      onClick={() => startMeditation('relaxation', 15 * 60)}
                    >
                      Iniciar
                    </button>
                  </div>

                  <div className="meditation-option">
                    <h4>Preparação para Dormir</h4>
                    <p>20 minutos de meditação para um sono melhor</p>
                    <button
                      className="action-button"
                      onClick={() => startMeditation('sleep', 20 * 60)}
                    >
                      Iniciar
                    </button>
                  </div>
                </div>

                {/* Feature 2: Temporizador Personalizado */}

              </>
            ) : (
              // Interface quando a meditação está ativa
              <div className="active-meditation">
                <div className="meditation-timer-display">
                  <div className="timer-circle">
                    <div className="timer-text">
                      {formatTime(meditationTimer)}
                    </div>
                    <div className="session-type">
                      {activeMeditationSession === 'mindfulness' && 'Atenção Plena'}
                      {activeMeditationSession === 'relaxation' && 'Relaxamento Profundo'}
                      {activeMeditationSession === 'sleep' && 'Preparação para Dormir'}
                      {activeMeditationSession === 'custom' && 'Meditação Personalizada'}
                    </div>
                  </div>
                </div>

                <div className="meditation-controls">
                  <button
                    className="action-button stop-button"
                    onClick={stopMeditation}
                  >
                    Encerrar Meditação
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'relaxation':
        return (
          <div className="relaxation-container">
            {!isRelaxationActive ? (
              <>
                <div className="feature-card">
                  <div className="feature-icon">
                    <Leaf size={32} />
                  </div>
                  <h3>Técnicas de Relaxamento</h3>
                  <p>Escolha uma técnica abaixo para iniciar</p>
                </div>

                <div className="technique-list">
                  <div className="technique-item">
                    <h4>Relaxamento Muscular Progressivo</h4>
                    <p>Tensione e solte os músculos para aliviar a tensão</p>
                    <button
                      className="action-button"
                      onClick={() => startRelaxationTechnique('muscle', 10 * 60)}
                    >
                      Iniciar (10 min)
                    </button>
                  </div>

                  <div className="technique-item">
                    <h4>Visualização</h4>
                    <p>Imagens mentais para acalmar a mente</p>
                    <button
                      className="action-button"
                      onClick={() => startRelaxationTechnique('visualization', 8 * 60)}
                    >
                      Iniciar (8 min)
                    </button>
                  </div>

                  <div className="technique-item">
                    <h4>Scanner Corporal</h4>
                    <p>Atenção focada por todo o seu corpo</p>
                    <button
                      className="action-button"
                      onClick={() => startRelaxationTechnique('bodyscan', 12 * 60)}
                    >
                      Iniciar (12 min)
                    </button>
                  </div>

                  <div className="technique-item">
                    <h4>Caminhada Consciente</h4>
                    <p>Técnica de meditação ao caminhar</p>
                    <button
                      className="action-button"
                      onClick={() => startRelaxationTechnique('walking', 15 * 60)}
                    >
                      Iniciar (15 min)
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Interface para a técnica de relaxamento ativa
              <div className="active-relaxation">
                <div className="relaxation-timer-display">
                  <div className="timer-circle">
                    <div className="timer-text">
                      {formatTime(relaxationTimer)}
                    </div>
                    <div className="session-type">
                      {activeRelaxationTechnique === 'muscle' && 'Relaxamento Muscular Progressivo'}
                      {activeRelaxationTechnique === 'visualization' && 'Visualização'}
                      {activeRelaxationTechnique === 'bodyscan' && 'Scanner Corporal'}
                      {activeRelaxationTechnique === 'walking' && 'Caminhada Consciente'}
                    </div>
                  </div>
                </div>

                <div className="relaxation-controls">
                  <button
                    className="action-button stop-button"
                    onClick={stopRelaxationTechnique}
                  >
                    Encerrar Sessão
                  </button>
                </div>

                <div className="relaxation-instructions-container">
                  {activeRelaxationTechnique === 'muscle' && (
                    <div className="relaxation-instructions">
                      <p>Siga as instruções abaixo:</p>
                      <ol>
                        <li>Sente-se ou deite-se em uma posição confortável</li>
                        <li>Tensione os músculos dos pés por 5 segundos</li>
                        <li>Relaxe completamente os músculos dos pés</li>
                        <li>Continue para as pernas, abdômen, peito, braços, mãos e rosto</li>
                        <li>Repita o processo se necessário</li>
                      </ol>
                    </div>
                  )}
                  {activeRelaxationTechnique === 'visualization' && (
                    <div className="relaxation-instructions">
                      <p>Siga as instruções abaixo:</p>
                      <ol>
                        <li>Feche os olhos e respire profundamente</li>
                        <li>Imagine um lugar tranquilo e seguro</li>
                        <li>Visualize os detalhes - cores, sons, texturas</li>
                        <li>Sinta-se presente neste local</li>
                        <li>Mantenha esta imagem mental durante a sessão</li>
                      </ol>
                    </div>
                  )}
                  {activeRelaxationTechnique === 'bodyscan' && (
                    <div className="relaxation-instructions">
                      <p>Siga as instruções abaixo:</p>
                      <ol>
                        <li>Deite-se em uma posição confortável</li>
                        <li>Comece a direcionar sua atenção para os dedos dos pés</li>
                        <li>Lentamente mova sua atenção para as pernas</li>
                        <li>Continue subindo por todo o corpo até chegar ao topo da cabeça</li>
                        <li>Observe sensações sem julgamento</li>
                      </ol>
                    </div>
                  )}
                  {activeRelaxationTechnique === 'walking' && (
                    <div className="relaxation-instructions">
                      <p>Siga as instruções abaixo:</p>
                      <ol>
                        <li>Escolha um espaço tranquilo para caminhar</li>
                        <li>Caminhe lentamente, prestando atenção a cada passo</li>
                        <li>Sinta o movimento dos pés tocando o chão</li>
                        <li>Observe o equilíbrio, o peso e o movimento</li>
                        <li>Se a mente divagar, suavemente traga-a de volta para o caminhar</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'journal':
        return (
          <div className="journal-container">
            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen size={32} />
              </div>
              <h3>Diário de Humor</h3>
            </div>

            <div className="journal-entry-form">
              <div className="mood-selector">
                <h4>Como você está se sentindo?</h4>
                <div className="mood-options">
                  <button
                    className={`mood-option ${currentMood === 'great' ? 'selected' : ''}`}
                    onClick={() => setCurrentMood('great')}
                  >
                    😄 Ótimo
                  </button>
                  <button
                    className={`mood-option ${currentMood === 'good' ? 'selected' : ''}`}
                    onClick={() => setCurrentMood('good')}
                  >
                    🙂 Bom
                  </button>
                  <button
                    className={`mood-option ${currentMood === 'neutral' ? 'selected' : ''}`}
                    onClick={() => setCurrentMood('neutral')}
                  >
                    😐 Neutro
                  </button>
                  <button
                    className={`mood-option ${currentMood === 'stressed' ? 'selected' : ''}`}
                    onClick={() => setCurrentMood('stressed')}
                  >
                    😓 Estressado
                  </button>
                  <button
                    className={`mood-option ${currentMood === 'bad' ? 'selected' : ''}`}
                    onClick={() => setCurrentMood('bad')}
                  >
                    😟 Mal
                  </button>
                </div>
              </div>

              <textarea
                value={newJournalEntry}
                onChange={(e) => setNewJournalEntry(e.target.value)}
                placeholder="Como foi seu dia? O que está passando pela sua cabeça?"
                rows={4}
                className="journal-textarea"
              />

              <button
                className="action-button journal-save-btn"
                onClick={saveJournalEntry}
                disabled={newJournalEntry.trim() === ''}
              >
                Salvar Entrada
              </button>
            </div>

            {journalEntries.length > 0 && (
              <div className="journal-entries">
                <h4>Entradas Anteriores</h4>
                {journalEntries.map((entry, index) => (
                  <div key={index} className="journal-entry">
                    <div className="entry-header">
                      <span className="entry-date">{entry.date} às {entry.time}</span>
                      <span className="entry-mood">
                        {entry.mood === 'great' && '😄'}
                        {entry.mood === 'good' && '🙂'}
                        {entry.mood === 'neutral' && '😐'}
                        {entry.mood === 'stressed' && '😓'}
                        {entry.mood === 'bad' && '😟'}
                      </span>
                    </div>
                    <p className="entry-text">{entry.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return <div>Selecione um recurso do menu</div>;
    }
  };

  // Renderizar o conteúdo principal do aplicativo
  return (
    <div className="app-container">
      {/* Cabeçalho do Aplicativo */}
      <MindfulnessHeader onPremiumToggle={handlePremiumToggle} />
      {/* Conteúdo Principal */}
      <main className="main-content">
        {showPremiumScreen && isPremium && getSubscriptionStatus() !== 'free' ? (
          renderModuleContent()
        ) : (
          renderContent()
        )}
      </main>

      {/* Grade de Recursos */}
      {(!showPremiumScreen || getSubscriptionStatus() === 'free') && (
        <div className="feature-grid">
          <div
            className={`feature-grid-item ${activeTab === 'breathing' ? 'active' : ''}`}
            onClick={() => setActiveTab('breathing')}
          >
            <div className="feature-grid-icon">
              <Wind size={24} />
            </div>
            <span>Respiração</span>
          </div>

          <div
            className={`feature-grid-item ${activeTab === 'meditation' ? 'active' : ''}`}
            onClick={() => setActiveTab('meditation')}
          >
            <div className="feature-grid-icon">
              <Activity size={24} />
            </div>
            <span>Meditação</span>
          </div>

          <div
            className={`feature-grid-item ${activeTab === 'relaxation' ? 'active' : ''}`}
            onClick={() => setActiveTab('relaxation')}
          >
            <div className="feature-grid-icon">
              <Leaf size={24} />
            </div>
            <span>Relaxamento</span>
          </div>

          <div
            className={`feature-grid-item ${activeTab === 'journal' ? 'active' : ''}`}
            onClick={() => setActiveTab('journal')}
          >
            <div className="feature-grid-icon">
              <BookOpen size={24} />
            </div>
            <span>Diário</span>
          </div>
        </div>
      )}
      {showPremiumScreen && isPremium && getSubscriptionStatus() !== 'free' && (
        <div className="feature-grid">
          <div
            className={`feature-grid-item ${activeModule === 'productivity' ? 'active' : ''}`}
            onClick={() => setActiveModule('productivity')}
          >
            <Clock size={24} />
            <span>Produtividade</span>
          </div>
          <div
            className={`feature-grid-item ${activeModule === 'learning' ? 'active' : ''}`}
            onClick={() => setActiveModule('learning')}
          >
            <Brain size={24} />
            <span>Learning</span>
          </div>
          <div
            className={`feature-grid-item ${activeModule === 'habits' ? 'active' : ''}`}
            onClick={() => setActiveModule('habits')}
          >
            <Target size={24} />
            <span>Hábitos</span>
          </div>
          <div
            className={`feature-grid-item ${activeModule === 'community' ? 'active' : ''}`}
            onClick={() => setActiveModule('community')}
          >
            <Users size={24} />
            <span>Comunidade</span>
          </div>
        </div>
      )}
    </div>
  );
}