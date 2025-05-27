import { useState } from 'react';
import {
  Instagram,
  MessageCircle,
  Check,
  X,
  BookOpen,
  Clock,
  Pencil,
  Zap,
  Shield,
  Menu,
  X as CloseIcon,
  CheckCircle,
} from 'lucide-react';
import './styles.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import MindfulnessApp from './pages/MindfulnessApp';
import CadastroPremium from './pages/CadastroPremium';

// Componente Navbar separado
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="navbar-logo">
              <Link to="/" className="logo">Mind Desk</Link>
            </div>
            <div className="navbar-links">
              <a href="/#features" className="nav-link">Recursos</a>
              <a href="/#pricing" className="nav-link">Preços</a>
              <a href="/#about" className="nav-link">Sobre</a>
              <Link to="/login" className="btn btn-outline">Entrar</Link>
              <Link to="/cadastro" className="btn btn-primary">Cadastrar</Link>
            </div>
            <div className="navbar-mobile-toggle">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mobile-menu-button"
              >
                {mobileMenuOpen ? <CloseIcon /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-items">
              <a href="/#features" className="mobile-menu-link">Recursos</a>
              <a href="/#pricing" className="mobile-menu-link">Preços</a>
              <a href="/#about" className="mobile-menu-link">Sobre</a>
              <Link to="/login" className="btn btn-outline mobile-btn">Entrar</Link>
              <Link to="/cadastro" className="btn btn-primary mobile-btn">Cadastrar</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// Componente da página inicial
function HomePage() {
  const plans = [
    {
      name: "Gratuito",
      price: "R$0",
      period: "para sempre",
      description: "Ferramentas essenciais para bem-estar mental",
      features: [
        "Técnica de Respiração de 4 segundos",
        "Frases Motivacionais Diárias",
        "Recomendações de Livros",
      ],
      unavailable: [
        "Biblioteca de Meditação",
        "Temporizador de Pausas Inteligente",
        "Diário de Trabalho",
        "Sistema de Acompanhamento Gamificado",
        "Acesso à Comunidade",
      ],
      buttonText: "Cadastre-se Grátis",
      buttonLink: "/cadastro",
      highlight: false,
    },
    {
      name: "Premium",
      price: "R$59,90",
      period: "por mês",
      description: "Kit completo de bem-estar mental",
      features: [
        "Tudo do plano Gratuito",
        "Biblioteca de Meditação",
        "Temporizador de Pausas Inteligente",
        "Diário de Trabalho com Análise de IA",
        "Sistema de Acompanhamento Gamificado",
        "Acesso à Comunidade",
        "Integração com Instagram",
      ],
      unavailable: [],
      buttonText: "Obter Premium",
      buttonLink: "/cadastro-premium",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Personalizado",
      description: "Soluções personalizadas para sua equipe",
      features: [
        "Tudo do Premium",
        "Painel Analítico da Equipe",
        "Controles de Administrador",
        "Personalização de Marca",
        "Suporte Prioritário",
        "Treinamento para Funcionários",
        "Integração com Sistemas de RH",
      ],
      unavailable: [],
      buttonText: "Contatar Vendas",
      buttonLink: "https://wa.me/5511932214535",
      highlight: false,
    }
  ];

  const features = [
    {
      icon: <CheckCircle />,
      title: "Técnica de Respiração de 4 segundos",
      description: "Acesse técnicas imediatas de alívio para ansiedade ou raiva com nosso botão de estresse de modo duplo."
    },
    {
      icon: <BookOpen />,
      title: "Meditações Guiadas",
      description: "Escolha entre meditações adequadas para o escritório, com duração de 3 a 10 minutos, projetadas para seu ambiente de trabalho."
    },
    {
      icon: <Clock />,
      title: "Temporizador de Pausas Inteligente",
      description: "Otimize a produtividade com temporizadores personalizáveis que sugerem micro-exercícios durante as pausas."
    },
    {
      icon: <Pencil />,
      title: "Diário de Trabalho",
      description: "Processe emoções do ambiente de trabalho com orientações desenvolvidas para desafios profissionais e crescimento."
    }
  ];

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span>Controle Sua Mente</span>
              <span className="hero-subtitle">Domine Seu Ambiente de Trabalho</span>
            </h1>
            <p className="hero-description">
              Mind Desk ajuda você a gerenciar estresse, ansiedade e emoções no trabalho com técnicas baseadas em ciência ao seu alcance.
            </p>
            <div className="hero-buttons">
              <Link to="/cadastro" className="btn btn-light">Comece Grátis</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Como o Mind Desk Funciona</span>
            <h2 className="section-title">Seu companheiro de bem-estar mental no trabalho</h2>
            <p className="section-description">
              Mind Desk ajuda você a navegar pelo estresse no ambiente de trabalho com ferramentas projetadas para o profissional moderno.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Recursos</span>
            <h2 className="section-title">Tudo que você precisa para o bem-estar no trabalho</h2>
          </div>

          <div className="cards-grid">
            <div className="card">
              <div className="card-icon">
                <Zap />
              </div>
              <h3 className="card-title">Motivação Diária</h3>
              <p className="card-text">
                Comece cada dia com inspiração através de frases selecionadas focadas em resiliência e desafios do ambiente de trabalho.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <BookOpen />
              </div>
              <h3 className="card-title">Recomendações de Livros</h3>
              <p className="card-text">
                Descubra livros selecionados sobre inteligência emocional e bem-estar no trabalho, com resumos concisos.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <MessageCircle />
              </div>
              <h3 className="card-title">Suporte da Comunidade</h3>
              <p className="card-text">
                Conecte-se com outros através de fóruns moderados e sessões semanais de perguntas e respostas com profissionais de saúde mental.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <Zap />
              </div>
              <h3 className="card-title">Acompanhamento Gamificado</h3>
              <p className="card-text">
                Mantenha-se motivado com "Pontos de Calma" ganhos através do uso do aplicativo, desbloqueando recompensas e reconhecimento.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <Instagram />
              </div>
              <h3 className="card-title">Integração com Instagram</h3>
              <p className="card-text">
                Compartilhe sua jornada de bem-estar com conteúdo personalizado para suas plataformas de mídia social.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <Shield />
              </div>
              <h3 className="card-title">Privacidade e Segurança</h3>
              <p className="card-text">
                Fique tranquilo sabendo que seus dados estão criptografados e protegidos, com controle total sobre suas informações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Preços</span>
            <h2 className="section-title">Preços simples e transparentes</h2>
            <p className="section-description">
              Escolha o plano que é certo para você e sua jornada de bem-estar mental
            </p>
          </div>

          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`pricing-card ${plan.highlight ? 'pricing-card-highlight' : ''}`}
              >
                {plan.highlight && (
                  <div className="pricing-card-badge">
                    MAIS POPULAR
                  </div>
                )}
                <div className="pricing-card-content">
                  <h3 className="pricing-card-title">{plan.name}</h3>
                  <div className="pricing-card-price">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                  <p className="pricing-card-description">{plan.description}</p>

                  <ul className="pricing-features">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="pricing-feature-item">
                        <Check className="feature-icon-check" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.unavailable.map((feature, featureIndex) => (
                      <li key={featureIndex} className="pricing-feature-item disabled">
                        <X className="feature-icon-x" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {plan.buttonLink.startsWith('http') ? (
                  <a 
                    href={plan.buttonLink}
                    className={`btn ${plan.highlight ? 'btn-primary' : 'btn-outline'} pricing-button`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.buttonText}
                  </a>
                ) : (
                  <Link 
                    to={plan.buttonLink}
                    className={`btn ${plan.highlight ? 'btn-primary' : 'btn-outline'} pricing-button`}
                  >
                    {plan.buttonText}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              <span>Pronto para assumir o controle?</span>
              <span>Comece a usar o Mind Desk hoje.</span>
            </h2>
            <p className="cta-description">
              Junte-se a milhares de profissionais que estão dominando suas emoções e prosperando no trabalho.
            </p>
            <div className="cta-buttons">
              <Link to="/cadastro" className="btn btn-light">Cadastre-se</Link>
              <Link to="/login" className="btn btn-secondary">Entrar</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-logo">
              Mind Desk
            </div>
            <div className="footer-social">
              <a href="https://instagram.com/pirandoins" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="sr-only">Instagram</span>
                <Instagram />
              </a>
              <a href="https://wa.me/11932214535" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="sr-only">WhatsApp</span>
                <MessageCircle />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-links">
              <a href="#" className="footer-link">Privacidade</a>
              <a href="#" className="footer-link">Termos</a>
              <a href="#" className="footer-link">Contato</a>
            </div>
            <p className="footer-copyright">
              &copy; 2025 Mind Desk. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-premium" element={<CadastroPremium />} />
          <Route path="/mind-desk" element={<MindfulnessApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;