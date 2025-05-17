import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, AlertCircle } from 'lucide-react';
import './CadastroPremium.css';

function CadastroPremium() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mpReady, setMpReady] = useState(false);
  const [cardForm, setCardForm] = useState(null);
  
  // Estados para os dados do usuário
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  
  // Estados para controlar erros
  const [errors, setErrors] = useState({});
  
  // Estados para confirmação
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  // Inicializa o SDK do Mercado Pago
  useEffect(() => {
    // Carrega o script do Mercado Pago
    const script = document.createElement('script');
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => {
      // Inicializa o Mercado Pago com a chave pública
      // Em ambiente de produção, essa chave deve vir do backend por questões de segurança
      const mp = new window.MercadoPago("TEST-fb3994de-05a6-4f3b-9189-e37d1428f9e9", {
        locale: 'pt-BR'
      });
      
      // Configura o formulário após o componente ser montado
      setTimeout(() => {
        if (document.getElementById('form-checkout__cardNumber')) {
          initCardForm(mp);
        }
      }, 100);
      
      setMpReady(true);
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  // Inicializa o formulário de cartão quando o step for 2 e o MP estiver carregado
  useEffect(() => {
    if (step === 2 && mpReady && window.MercadoPago && !cardForm) {
      // Verifica se o Mercado Pago está carregado e se os elementos do formulário existem
      setTimeout(() => {
        if (document.getElementById('form-checkout__cardNumber')) {
          const mp = new window.MercadoPago("TEST-fb3994de-05a6-4f3b-9189-e37d1428f9e9", {
            locale: 'pt-BR'
          });
          initCardForm(mp);
        }
      }, 100);
    }
  }, [step, mpReady]);
  
  // Inicializa o formulário de cartão
  const initCardForm = (mp) => {
    const cardFormInstance = mp.cardForm({
      amount: "59.90",
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de segurança",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular do cartão",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emissor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },        
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número do documento",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
      },
      callbacks: {
        onFormMounted: error => {
          if (error) return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: event => {
          event.preventDefault();
          setIsProcessing(true);
          
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardFormInstance.getCardFormData();
          
          // Em um ambiente real, você enviaria isso para seu backend
          console.log("Payment data:", {
            token,
            issuer_id,
            payment_method_id,
            transaction_amount: Number(amount),
            installments: Number(installments),
            description: "Assinatura Mind Desk Premium",
            payer: {
              email,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
          });
          
          // Simulando uma chamada para o backend
          setTimeout(() => {
            processPaymentResponse({ status: 'approved', id: 'MP' + Math.floor(Math.random() * 1000000) });
          }, 2000);
        },
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource);
          // Anima a barra de progresso
          const progressBar = document.querySelector(".progress-bar");
          if (progressBar) {
            progressBar.removeAttribute("value");
            return () => {
              progressBar.setAttribute("value", "0");
            };
          }
          return () => {};
        }
      },
    });
    
    setCardForm(cardFormInstance);
  };

  // Manipuladores de mudança de campos
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Validação do primeiro passo
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!userData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!userData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!userData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (userData.senha.length < 8) {
      newErrors.senha = 'A senha deve ter pelo menos 8 caracteres';
    }
    
    if (userData.senha !== userData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Avançar para o próximo passo
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  // Voltar para o passo anterior
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Processa a resposta do pagamento
  const processPaymentResponse = (response) => {
    setIsProcessing(false);
    
    if (response.status === 'approved' || response.status === 'in_process') {
      // Pagamento aprovado ou em análise
      setTransactionId(response.id);
      setIsSuccess(true);
      setStep(3);
    } else {
      // Erro no pagamento
      setErrors({ payment: 'Erro ao processar pagamento. Tente novamente.' });
    }
  };

  // Função para finalizar o cadastro e redirecionar para o app
  const finishSignup = () => {
    navigate('/mind-desk');
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-md">
      <div className="mb-8 flex items-center">
        <button 
          onClick={() => step === 1 ? navigate('/') : prevStep()}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" /> 
          {step === 1 ? 'Voltar para o site' : 'Etapa anterior'}
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span className="step-label">Conta</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span className="step-label">Pagamento</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span className="step-label">Confirmação</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="section-content">
          <h2 className="text-2xl font-bold mb-6">Informações da Conta</h2>
          
          <div className="plan-summary mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-lg">Plano Premium</h3>
            <p className="text-xl font-bold">R$59,90 <span className="text-sm font-normal">por mês</span></p>
            <ul className="mt-2">
              <li className="flex items-center text-sm">
                <CheckCircle size={16} className="text-green-500 mr-2" />
                Acesso a todas as ferramentas premium
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle size={16} className="text-green-500 mr-2" />
                Biblioteca de Meditação completa
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle size={16} className="text-green-500 mr-2" />
                Diário de Trabalho com Análise de IA
              </li>
            </ul>
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="nome" className="block mb-1">Nome completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={userData.nome}
              onChange={handleUserDataChange}
              className={`form-input ${errors.nome ? 'error' : ''}`}
              placeholder="Seu nome completo"
            />
            {errors.nome && <p className="error-message">{errors.nome}</p>}
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleUserDataChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="seu.email@exemplo.com"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="senha" className="block mb-1">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={userData.senha}
              onChange={handleUserDataChange}
              className={`form-input ${errors.senha ? 'error' : ''}`}
              placeholder="••••••••"
            />
            {errors.senha && <p className="error-message">{errors.senha}</p>}
          </div>
          
          <div className="form-group mb-6">
            <label htmlFor="confirmarSenha" className="block mb-1">Confirmar senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={userData.confirmarSenha}
              onChange={handleUserDataChange}
              className={`form-input ${errors.confirmarSenha ? 'error' : ''}`}
              placeholder="••••••••"
            />
            {errors.confirmarSenha && <p className="error-message">{errors.confirmarSenha}</p>}
          </div>
          
          <button 
            onClick={nextStep}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Continuar para pagamento
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="section-content">
          <h2 className="text-2xl font-bold mb-6">Informações de Pagamento</h2>
          
          <div className="plan-summary mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-lg">Plano Premium</h3>
            <p className="text-xl font-bold">R$59,90 <span className="text-sm font-normal">por mês</span></p>
          </div>
          
          <div className="payment-methods mb-6">
            <p className="mb-2 font-medium">Método de pagamento</p>
            <div className="flex items-center">
              <div className="payment-method-option active">
                <CreditCard size={20} />
                <span>Cartão</span>
              </div>
              <span className="text-sm text-gray-500 ml-3">
                Processado por Mercado Pago
              </span>
            </div>
          </div>
          
          <form id="form-checkout" className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Número do cartão</label>
              <div id="form-checkout__cardNumber" className="payment-form-field"></div>
              {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Data de validade</label>
                <div id="form-checkout__expirationDate" className="payment-form-field"></div>
                {errors.expirationDate && <p className="error-message">{errors.expirationDate}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">CVV</label>
                <div id="form-checkout__securityCode" className="payment-form-field"></div>
                {errors.securityCode && <p className="error-message">{errors.securityCode}</p>}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="form-checkout__cardholderName" className="block text-sm font-medium mb-1">Nome no cartão</label>
              <input 
                type="text" 
                id="form-checkout__cardholderName" 
                className="form-input"
                defaultValue={userData.nome}
              />
              {errors.cardholderName && <p className="error-message">{errors.cardholderName}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="form-checkout__cardholderEmail" className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                id="form-checkout__cardholderEmail" 
                className="form-input"
                defaultValue={userData.email}
              />
              {errors.cardholderEmail && <p className="error-message">{errors.cardholderEmail}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="form-checkout__identificationType" className="block text-sm font-medium mb-1">Tipo de documento</label>
                <select id="form-checkout__identificationType" className="form-input"></select>
                {errors.identificationType && <p className="error-message">{errors.identificationType}</p>}
              </div>
              
              <div>
                <label htmlFor="form-checkout__identificationNumber" className="block text-sm font-medium mb-1">Número do documento</label>
                <input type="text" id="form-checkout__identificationNumber" className="form-input" />
                {errors.identificationNumber && <p className="error-message">{errors.identificationNumber}</p>}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="form-checkout__issuer" className="block text-sm font-medium mb-1">Banco emissor</label>
              <select id="form-checkout__issuer" className="form-input"></select>
              {errors.issuer && <p className="error-message">{errors.issuer}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="form-checkout__installments" className="block text-sm font-medium mb-1">Parcelas</label>
              <select id="form-checkout__installments" className="form-input"></select>
              {errors.installments && <p className="error-message">{errors.installments}</p>}
            </div>

            {errors.payment && (
              <div className="error-box mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle size={18} className="text-red-500 mr-2 mt-0.5" />
                <p className="text-red-700 text-sm">{errors.payment}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              id="form-checkout__submit"
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              {isProcessing ? 'Processando...' : 'Finalizar pagamento'}
            </button>
            
            <progress value="0" className="progress-bar w-full mt-4" style={{ display: isProcessing ? 'block' : 'none' }}>Carregando...</progress>
          </form>
          
          <p className="text-center text-sm mt-4 text-gray-600">
            Seus dados de pagamento são processados de forma segura e criptografada pelo Mercado Pago.
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="section-content">
          {isSuccess ? (
            <div className="confirmation-success text-center">
              <div className="success-icon mb-4 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Pagamento Confirmado!</h2>
              
              <p className="mb-6">
                Parabéns! Seu pagamento foi processado com sucesso e sua conta premium foi ativada.
              </p>
              
              <div className="transaction-details mb-6 p-4 bg-gray-50 rounded-lg text-left">
                <p className="flex justify-between mb-2">
                  <span className="text-gray-600">ID da transação:</span>
                  <span className="font-medium">{transactionId}</span>
                </p>
                <p className="flex justify-between mb-2">
                  <span className="text-gray-600">Plano:</span>
                  <span className="font-medium">Premium</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Valor:</span>
                  <span className="font-medium">R$59,90/mês</span>
                </p>
              </div>
              
              <button 
                onClick={finishSignup}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Acessar Mind Desk Premium
              </button>
              
              <p className="text-center text-sm mt-4 text-gray-600">
                Um comprovante foi enviado para {userData.email}
              </p>
            </div>
          ) : (
            <div className="confirmation-error text-center">
              <div className="error-icon mb-4 mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle size={32} className="text-red-500" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Ocorreu um erro</h2>
              
              <p className="mb-6">
                Não foi possível processar seu pagamento. Por favor, tente novamente ou escolha outro método de pagamento.
              </p>
              
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CadastroPremium;