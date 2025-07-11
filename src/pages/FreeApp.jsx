// Renderizar diferentes conteúdos com base na aba ativa
const RenderContent = () => {
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
                    {/* Grade de Recursos */}
                    {!showPremiumScreen && (
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
                </div>
            );

        default:
            return <div>Selecione um recurso do menu</div>;
    }

};

export default RenderContent;