import { useState, useEffect } from 'react';
import { Zap, Wind, Heart, BookOpen, Share, Award, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import './stressApp.css';
export default function StressApp() {
  const [activeTab, setActiveTab] = useState('stress');
  const [animateRay, setAnimateRay] = useState(false);
  const [mode, setMode] = useState('ansiedade'); // 'ansiedade' ou 'raiva'
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [usageData, setUsageData] = useState([]);
  const [showUsageStats, setShowUsageStats] = useState(false);
  
  const quotes = [
    "A resiliência não é sobre nunca cair, mas se levantar a cada vez.",
    "Respire fundo. Este momento vai passar.",
    "Transforme desafios em oportunidades de crescimento.",
    "Você já superou 100% dos seus dias ruins até agora.",
    "A confiança vem da superação dos momentos difíceis.",
    "Cuide da sua mente como cuida do seu corpo.",
    "O estresse é passageiro, mas suas conquistas são permanentes."
  ];
  
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  // Animação do raio quando o botão é pressionado
  const triggerAnimation = () => {
    setAnimateRay(true);
    
    // Registra uso do botão
    const newUsage = {
      date: new Date().toISOString(),
      mode: mode,
      timestamp: Date.now()
    };
    
    setUsageData([...usageData, newUsage]);
    
    // Encerra a animação após 2 segundos
    setTimeout(() => {
      setAnimateRay(false);
    }, 2000);
  };
  
  // Mudar citação
  const changeQuote = (direction) => {
    if (direction === 'next') {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    } else {
      setQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
    }
  };
  
  // Atualizar citação atual quando o índice muda
  useEffect(() => {
    setCurrentQuote(quotes[quoteIndex]);
  }, [quoteIndex]);
  
  // Salvar citação favorita
  const saveQuote = () => {
    if (!savedQuotes.includes(currentQuote)) {
      setSavedQuotes([...savedQuotes, currentQuote]);
    }
  };
  
  // Compartilhar citação
  const shareQuote = () => {
    alert(`Compartilhando no Instagram: "${currentQuote}"`);
    // Aqui seria implementada a integração real com a API do Instagram
  };
  
  // Renderiza o conteúdo com base na aba ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'stress':
        return (
          <div className="relative flex flex-col items-center w-full p-4">
            {/* Animação do raio */}
            {animateRay && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <Zap 
                  size={100} 
                  className="text-yellow-400 animate-pulse" 
                  strokeWidth={2}
                />
              </div>
            )}
            
            <h2 className="text-2xl font-bold mb-6 text-center">Alívio de Estresse</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-6">
              <button 
                className={`flex-1 p-4 rounded-lg flex items-center justify-center gap-2 transition-all ${mode === 'ansiedade' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setMode('ansiedade')}
              >
                <Wind size={20} />
                <span>Calmar Ansiedade</span>
              </button>
              
              <button 
                className={`flex-1 p-4 rounded-lg flex items-center justify-center gap-2 transition-all ${mode === 'raiva' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setMode('raiva')}
              >
                <Heart size={20} />
                <span>Controlar Raiva</span>
              </button>
            </div>
            
            <button 
              className="w-full max-w-md p-6 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center justify-center space-x-3 text-xl font-bold transition-transform transform hover:scale-105"
              onClick={triggerAnimation}
            >
              {mode === 'ansiedade' ? 'Iniciar Exercício de Respiração' : 'Iniciar Exercício de Desescalada'}
            </button>
            
            <div className="mt-8 w-full max-w-md bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Dica para o ambiente de trabalho:</h3>
              <p>
                {mode === 'ansiedade' 
                  ? "Frustrado após uma reunião? Tente a técnica 5-5-5: Respire por 5 segundos, segure por 5 segundos, e expire por 5 segundos. Repita 5 vezes." 
                  : "Sentindo raiva durante uma discussão? Peça um momento para si mesmo, conte mentalmente até 10 e visualize um local calmo."
                }
              </p>
            </div>
            
            {usageData.length > 0 && (
              <div className="mt-4 w-full max-w-md">
                <button 
                  className="text-sm text-blue-500 underline"
                  onClick={() => setShowUsageStats(!showUsageStats)}
                >
                  {showUsageStats ? 'Ocultar estatísticas' : 'Ver estatísticas de uso'}
                </button>
                
                {showUsageStats && (
                  <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                    <p className="font-bold">Total de usos: {usageData.length}</p>
                    <p>Ansiedade: {usageData.filter(d => d.mode === 'ansiedade').length}</p>
                    <p>Raiva: {usageData.filter(d => d.mode === 'raiva').length}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      
      case 'quotes':
        return (
          <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Frases Motivacionais</h2>
            
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-8">
              <div className="flex justify-between mb-2">
                <button onClick={() => changeQuote('prev')} className="text-white">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={() => changeQuote('next')} className="text-white">
                  <ChevronRight size={24} />
                </button>
              </div>
              <p className="text-xl font-bold text-center">"{currentQuote}"</p>
              <div className="flex justify-center mt-4 space-x-4">
                <button 
                  className="bg-white text-blue-500 p-2 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={saveQuote}
                >
                  <Save size={20} />
                </button>
                <button 
                  className="bg-white text-blue-500 p-2 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={shareQuote}
                >
                  <Share size={20} />
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Frases Salvas</h3>
              {savedQuotes.length > 0 ? (
                <div className="space-y-2">
                  {savedQuotes.map((quote, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded-lg">
                      "{quote}"
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Nenhuma frase salva ainda. Salve suas frases favoritas!</p>
              )}
            </div>
          </div>
        );
        
      default:
        return <div>Selecione uma opção do menu</div>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-center text-blue-600">Mind Desk</h1>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-4">
        {renderContent()}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="bg-white shadow-lg p-2 mt-auto">
        <div className="flex justify-around">
          <button 
            className={`flex flex-col items-center p-2 ${activeTab === 'stress' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('stress')}
          >
            <Zap size={24} />
            <span className="text-xs mt-1">Estresse</span>
          </button>
          
          <button 
            className={`flex flex-col items-center p-2 ${activeTab === 'quotes' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('quotes')}
          >
            <BookOpen size={24} />
            <span className="text-xs mt-1">Frases</span>
          </button>
          
          <button 
            className={`flex flex-col items-center p-2 ${activeTab === 'progress' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('progress')}
          >
            <Award size={24} />
            <span className="text-xs mt-1">Progresso</span>
          </button>
        </div>
      </nav>
    </div>
  );
}