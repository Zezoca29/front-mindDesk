import { useState, useEffect, useRef } from 'react';
import { Leaf, BookOpen, Heart, Wind, Activity, Menu, Clock, Moon, Sun, Cloud, VolumeX } from 'lucide-react';
import './mindfulnessApp.css';
import MindfulnessHeader from './MindfulnessAppHeader';
import { LogOut, Settings, User, X, Bell, ChevronRight, BarChart3, Share2, Sparkles, Award} from 'lucide-react';

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
  const [streak, setStreak] = useState(12);

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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

  return (
    <div className="app-container">
      {/* Cabeçalho do Aplicativo */}
      <MindfulnessHeader />
      {/* Conteúdo Principal */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Grade de Recursos */}
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
    </div>
  );
}