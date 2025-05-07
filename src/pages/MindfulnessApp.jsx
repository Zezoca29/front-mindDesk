import { useState, useEffect, useRef } from 'react';
import { Leaf, BookOpen, Heart, Wind, Activity, Menu } from 'lucide-react';
import './mindfulnessApp.css';

export default function MindfulnessApp() {
  const [breathCount, setBreathCount] = useState(4);
  const [breathPhase, setBreathPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [activeTab, setActiveTab] = useState('breathing');
  const [journalEntries, setJournalEntries] = useState([]);
  const [newJournalEntry, setNewJournalEntry] = useState('');
  const [currentMood, setCurrentMood] = useState('neutral');
  const breathingIntervalRef = useRef(null);

  // Breathing exercise logic
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
            return 4; // Reset to 4 for hold phase
          });
        } else if (phase === 'hold') {
          setBreathCount(prevCount => {
            if (prevCount > 1) return prevCount - 1;
            phase = 'exhale';
            setBreathPhase('exhale');
            return 6; // Reset to 6 for exhale phase
          });
        } else if (phase === 'exhale') {
          setBreathCount(prevCount => {
            if (prevCount > 1) return prevCount - 1;
            
            // Completed one full cycle
            totalCycle++;
            
            // After completing 5 cycles, stop the exercise
            if (totalCycle >= 5) {
              setIsBreathingActive(false);
              clearInterval(breathingIntervalRef.current);
              setBreathPhase('inhale');
              return 4;
            }
            
            phase = 'inhale';
            setBreathPhase('inhale');
            return 4; // Reset to 4 for inhale phase
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

  // Start breathing exercise
  const startBreathingExercise = () => {
    setBreathCount(4);
    setBreathPhase('inhale');
    setIsBreathingActive(true);
  };

  // Stop breathing exercise
  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    setBreathCount(4);
    setBreathPhase('inhale');
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
    }
  };

  // Save journal entry
  const saveJournalEntry = () => {
    if (newJournalEntry.trim() === '') return;
    
    const newEntry = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newJournalEntry,
      mood: currentMood
    };
    
    setJournalEntries([newEntry, ...journalEntries]);
    setNewJournalEntry('');
    setCurrentMood('neutral');
  };

  // Get class for the breathing circle based on phase
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

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'breathing':
        return (
          <div className="exercise-container">
            <h2 className="section-title">Breathing Exercise</h2>
            
            <div className="breathing-wrapper">
              <div className={getBreathingCircleClass()}>
                <div className="breath-text">
                  {breathPhase.toUpperCase()}
                  <div className="breath-count">{breathCount}</div>
                </div>
              </div>
            </div>
            
            <p className="instruction-text">
              Inhale for 4 seconds - Hold for 4 seconds - Exhale for 6 seconds
            </p>
            
            <button 
              className="action-button start-button"
              onClick={isBreathingActive ? stopBreathingExercise : startBreathingExercise}
            >
              {isBreathingActive ? 'Stop' : 'Start'}
            </button>
          </div>
        );

      case 'meditation':
        return (
          <div className="meditation-container">
            <div className="feature-card">
              <div className="feature-icon">
                <Wind size={32} />
              </div>
              <h3>Guided Meditation</h3>
              <button className="action-button">Start</button>
            </div>
            
            <div className="meditation-options">
              <div className="meditation-option">
                <h4>5-Minute Mindfulness</h4>
                <p>Quick meditation to center yourself</p>
              </div>
              
              <div className="meditation-option">
                <h4>15-Minute Deep Relaxation</h4>
                <p>Deeper practice for stress reduction</p>
              </div>
              
              <div className="meditation-option">
                <h4>Sleep Preparation</h4>
                <p>20-minute meditation for better sleep</p>
              </div>
            </div>
          </div>
        );

      case 'relaxation':
        return (
          <div className="relaxation-container">
            <div className="feature-card">
              <div className="feature-icon">
                <Leaf size={32} />
              </div>
              <h3>Relaxation Techniques</h3>
              <button className="action-button">View</button>
            </div>
            
            <div className="technique-list">
              <div className="technique-item">
                <h4>Progressive Muscle Relaxation</h4>
                <p>Tense and release muscles to relieve tension</p>
              </div>
              
              <div className="technique-item">
                <h4>Visualization</h4>
                <p>Mental imagery to calm the mind</p>
              </div>
              
              <div className="technique-item">
                <h4>Body Scan</h4>
                <p>Focused attention throughout your body</p>
              </div>
              
              <div className="technique-item">
                <h4>Mindful Walking</h4>
                <p>Walking meditation technique</p>
              </div>
            </div>
          </div>
        );

      case 'journal':
        return (
          <div className="journal-container">
            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen size={32} />
              </div>
              <h3>Mood Journal</h3>
              <button className="action-button">Write</button>
            </div>
            
            <div className="journal-entry-form">
              <div className="mood-selector">
                <h4>How are you feeling?</h4>
                <div className="mood-options">
                  <button 
                    className={`mood-option ${currentMood === 'great' ? 'selected' : ''}`}
                    onClick={() => setCurrentMood('great')}
                  >
                    😄 Great
                  </button>
                  <button 
                    className={`mood-option ${currentMood === 'good' ? 'selected' : ''}`}
                    onClick={() => setCurrentMood('good')}
                  >
                    🙂 Good
                  </button>
                  <button 
                    className={`mood-option ${currentMood === 'neutral' ? 'selected' : ''}`}
                    onClick={() => setCurrentMood('neutral')}
                  >
                    😐 Neutral
                  </button>
                  <button 
                    className={`mood-option ${currentMood === 'stressed' ? 'selected' : ''}`}
                    onClick={() => setCurrentMood('stressed')}
                  >
                    😓 Stressed
                  </button>
                  <button 
                    className={`mood-option ${currentMood === 'bad' ? 'selected' : ''}`}
                    onClick={() => setCurrentMood('bad')}
                  >
                    😟 Bad
                  </button>
                </div>
              </div>
              
              <textarea
                value={newJournalEntry}
                onChange={(e) => setNewJournalEntry(e.target.value)}
                placeholder="How was your day? What's on your mind?"
                rows={4}
                className="journal-textarea"
              />
              
              <button 
                className="action-button journal-save-btn"
                onClick={saveJournalEntry}
                disabled={newJournalEntry.trim() === ''}
              >
                Save Entry
              </button>
            </div>
            
            {journalEntries.length > 0 && (
              <div className="journal-entries">
                <h4>Previous Entries</h4>
                {journalEntries.map((entry, index) => (
                  <div key={index} className="journal-entry">
                    <div className="entry-header">
                      <span className="entry-date">{entry.date} at {entry.time}</span>
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
        return <div>Select a feature from the menu</div>;
    }
  };

  return (
    <div className="app-container">
      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Feature Cards Grid */}
      <div className="feature-grid">
        <div 
          className={`feature-grid-item ${activeTab === 'breathing' ? 'active' : ''}`}
          onClick={() => setActiveTab('breathing')}
        >
          <div className="feature-grid-icon">
            <Wind size={24} />
          </div>
          <span>Breathing</span>
        </div>
        
        <div 
          className={`feature-grid-item ${activeTab === 'meditation' ? 'active' : ''}`}
          onClick={() => setActiveTab('meditation')}
        >
          <div className="feature-grid-icon">
            <Activity size={24} />
          </div>
          <span>Meditation</span>
        </div>
        
        <div 
          className={`feature-grid-item ${activeTab === 'relaxation' ? 'active' : ''}`}
          onClick={() => setActiveTab('relaxation')}
        >
          <div className="feature-grid-icon">
            <Leaf size={24} />
          </div>
          <span>Relaxation</span>
        </div>
        
        <div 
          className={`feature-grid-item ${activeTab === 'journal' ? 'active' : ''}`}
          onClick={() => setActiveTab('journal')}
        >
          <div className="feature-grid-icon">
            <BookOpen size={24} />
          </div>
          <span>Journal</span>
        </div>
      </div>
    </div>
  );
}