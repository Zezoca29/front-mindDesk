import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle, CreditCard, AlertCircle, Clock, RefreshCw } from 'lucide-react';

function CadastroPremium() {
  const navigate = (path) => console.log(`Navegando para: ${path}`);
  const [step, setStep] = useState(1);
  const [mpReady, setMpReady] = useState(false);
  const [cardForm, setCardForm] = useState(null);
  const pollIntervalRef = useRef(null);

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
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [isPendingPayment, setIsPendingPayment] = useState(false);
  const [pollAttempts, setPollAttempts] = useState(0);

  // Constantes para polling
  const MAX_POLL_ATTEMPTS = 20; // 10 minutos (30s * 20)
  const POLL_INTERVAL = 30000; // 30 segundos

  // Inicializa o SDK do Mercado Pago
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => {
      const mp = new window.MercadoPago("TEST-fb3994de-05a6-4f3b-9189-e37d1428f9e9", {
        locale: 'pt-BR'
      });

      setTimeout(() => {
        if (document.getElementById('form-checkout__cardNumber')) {
          initCardForm(mp);
        }
      }, 100);

      setMpReady(true);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      // Limpar polling se existir
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  // Inicializa o formulário de cartão quando o step for 2 e o MP estiver carregado
  useEffect(() => {
    if (step === 2 && mpReady && window.MercadoPago && !cardForm) {
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

  // Função para verificar status do pagamento no backend
  const checkPaymentStatus = async (paymentId) => {
    try {
      const response = await fetch(`https://65dc-2804-7f0-7d80-293a-59b7-a4a8-d7f6-8e11.ngrok-free.app/api/payments/check/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na verificação: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      return null;
    }
  };

  // Inicia o polling para pagamentos pendentes
  const startPaymentPolling = (paymentId) => {
    setIsPendingPayment(true);
    setPollAttempts(0);

    pollIntervalRef.current = setInterval(async () => {
      const currentAttempts = pollAttempts + 1;
      setPollAttempts(currentAttempts);

      console.log(`Verificando pagamento ${paymentId} - Tentativa ${currentAttempts}/${MAX_POLL_ATTEMPTS}`);

      const paymentData = await checkPaymentStatus(paymentId);

      if (paymentData && paymentData.success) {
        const status = paymentData.mercadoPago.status;

        if (status === 'approved') {
          // Pagamento aprovado
          clearInterval(pollIntervalRef.current);
          setIsPendingPayment(false);
          setPaymentStatus('approved');
          setPaymentMessage('Pagamento aprovado! Sua conta premium foi ativada automaticamente.');
          setIsSuccess(true);
        } else if (status === 'rejected' || status === 'cancelled') {
          // Pagamento rejeitado
          clearInterval(pollIntervalRef.current);
          setIsPendingPayment(false);
          setPaymentStatus(status);
          setPaymentMessage(getPaymentStatusMessage(status, paymentData.mercadoPago.status_detail));
          setIsSuccess(false);
        } else if (currentAttempts >= MAX_POLL_ATTEMPTS) {
          // Timeout - parar de verificar
          clearInterval(pollIntervalRef.current);
          setIsPendingPayment(false);
          setPaymentMessage('O pagamento ainda está sendo processado. Você receberá uma confirmação por email quando for aprovado.');
        }
      } else if (currentAttempts >= MAX_POLL_ATTEMPTS) {
        // Erro ou timeout
        clearInterval(pollIntervalRef.current);
        setIsPendingPayment(false);
        setPaymentMessage('Não foi possível verificar o status do pagamento automaticamente. Você receberá uma confirmação por email.');
      }
    }, POLL_INTERVAL);
  };

  // Para o polling manualmente
  const stopPaymentPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    setIsPendingPayment(false);
  };

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
          setErrors({});
          setPaymentMessage('');

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

          const paymentData = {
            userData: {
              nome: userData.nome,
              email: userData.email,
              senha: userData.senha
            },
            paymentData: {
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
            }
          };

          fetch('https://65dc-2804-7f0-7d80-293a-59b7-a4a8-d7f6-8e11.ngrok-free.app/api/payments/create-with-signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`Erro na comunicação com o servidor: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('API response:', data);
              processPaymentResponse(data);
            })
            .catch(error => {
              console.error('Error:', error);
              setErrors({ payment: `Erro na comunicação com o servidor: ${error.message}` });
              setIsProcessing(false);
              setPaymentStatus('error');
              setPaymentMessage('Falha na comunicação com o servidor de pagamentos. Por favor, tente novamente mais tarde.');
            });
        },
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource);
          const progressBar = document.querySelector(".progress-bar");
          if (progressBar) {
            progressBar.removeAttribute("value");
            return () => {
              progressBar.setAttribute("value", "0");
            };
          }
          return () => { };
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
    if (step > 1) {
      // Parar polling se estiver ativo
      stopPaymentPolling();
      setStep(step - 1);
    }
  };

  // Mapeia status do Mercado Pago para mensagens amigáveis
  const getPaymentStatusMessage = (status, statusDetail) => {
    const statusMessages = {
      'approved': 'Pagamento aprovado! Sua conta premium foi ativada.',
      'in_process': 'Pagamento em análise. Assim que for aprovado, sua conta será ativada automaticamente.',
      'pending': 'Pagamento pendente. Assim que for aprovado, sua conta será ativada automaticamente.',
      'rejected': {
        'cc_rejected_bad_filled_card_number': 'Verifique o número do cartão.',
        'cc_rejected_bad_filled_date': 'Verifique a data de validade do cartão.',
        'cc_rejected_bad_filled_other': 'Verifique os dados do cartão.',
        'cc_rejected_bad_filled_security_code': 'Verifique o código de segurança do cartão.',
        'cc_rejected_blacklist': 'Não pudemos processar seu pagamento. Use outro cartão ou contate seu banco.',
        'cc_rejected_call_for_authorize': 'Você deve autorizar o pagamento com o valor para seu banco.',
        'cc_rejected_card_disabled': 'Ligue para o banco para ativar seu cartão ou use outro meio de pagamento.',
        'cc_rejected_duplicated_payment': 'Você já efetuou um pagamento com esse valor. Se precisar pagar novamente, use outro cartão ou outra forma de pagamento.',
        'cc_rejected_high_risk': 'Seu pagamento foi recusado. Escolha outra forma de pagamento.',
        'cc_rejected_insufficient_amount': 'O cartão possui saldo insuficiente.',
        'cc_rejected_invalid_installments': 'O cartão não processa pagamentos com essa quantidade de parcelas.',
        'cc_rejected_max_attempts': 'Você atingiu o limite de tentativas permitidas. Escolha outro cartão ou outra forma de pagamento.',
        'cc_rejected_other_reason': 'O banco não processou o pagamento.',
        'default': 'O pagamento foi recusado. Tente utilizar outro cartão ou entre em contato com o banco emissor.'
      },
      'cancelled': 'O pagamento foi cancelado.',
      'refunded': 'O pagamento foi devolvido.',
      'charged_back': 'Pagamento estornado no seu cartão de crédito.',
      'default': 'Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.'
    };

    if (status === 'rejected' && statusDetail) {
      return statusMessages[status][statusDetail] || statusMessages[status]['default'];
    }

    return statusMessages[status] || statusMessages['default'];
  };

  // Processa a resposta do pagamento
  const processPaymentResponse = (response) => {
    setIsProcessing(false);

    const status = response.status || 'error';
    const statusDetail = response.status_detail || '';
    const paymentId = response.payment_id || ('MP' + Math.floor(Math.random() * 1000000));
    const responseUserId = response.user_id;

    console.log(`Processando pagamento: Status ${status}, Detalhe ${statusDetail}, ID ${paymentId}`);

    setPaymentStatus(status);
    setTransactionId(paymentId);
    setUserId(responseUserId);

    const message = getPaymentStatusMessage(status, statusDetail);
    setPaymentMessage(message);

    if (status === 'approved') {
      setIsSuccess(true);
      setStep(3);
    } else if (status === 'in_process' || status === 'pending') {
      setIsSuccess(false);
      setStep(3);
      // Iniciar polling para verificar mudanças de status
      startPaymentPolling(paymentId);
    } else {
      setIsSuccess(false);
      if (status !== 'error') {
        setStep(3);
      } else {
        setErrors({ payment: message });
      }
    }
  };

  // Função para verificar manualmente o status do pagamento
  const manualCheckPayment = async () => {
    if (!transactionId) return;

    setIsProcessing(true);
    const paymentData = await checkPaymentStatus(transactionId);
    setIsProcessing(false);

    if (paymentData && paymentData.success) {
      const status = paymentData.mercadoPago.status;
      setPaymentStatus(status);

      if (status === 'approved') {
        setPaymentMessage('Pagamento aprovado! Sua conta premium foi ativada.');
        setIsSuccess(true);
        stopPaymentPolling();
      } else if (status === 'rejected' || status === 'cancelled') {
        setPaymentMessage(getPaymentStatusMessage(status, paymentData.mercadoPago.status_detail));
        setIsSuccess(false);
        stopPaymentPolling();
      } else {
        setPaymentMessage(getPaymentStatusMessage(status));
      }
    }
  };

  // Função para finalizar o cadastro e redirecionar para o app
  const finishSignup = () => {
    stopPaymentPolling();
    navigate('/login');
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-md bg-white min-h-screen">
      <div className="mb-8 flex items-center">
        <button
          onClick={() => step === 1 ? navigate('/') : prevStep()}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          {step === 1 ? 'Voltar para o site' : 'Etapa anterior'}
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="text-xs mt-1">Conta</span>
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="text-xs mt-1">Pagamento</span>
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span className="text-xs mt-1">Confirmação</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Informações da Conta</h2>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg text-blue-900">Plano Premium</h3>
            <p className="text-2xl font-bold text-blue-800">R$59,90 <span className="text-sm font-normal">por mês</span></p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center text-sm text-blue-700">
                <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                Acesso a todas as ferramentas premium
              </li>
              <li className="flex items-center text-sm text-blue-700">
                <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                Biblioteca de Meditação completa
              </li>
              <li className="flex items-center text-sm text-blue-700">
                <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                Diário de Trabalho com Análise de IA
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium mb-1 text-gray-700">Nome completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={userData.nome}
                onChange={handleUserDataChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Seu nome completo"
              />
              {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleUserDataChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="seu.email@exemplo.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-1 text-gray-700">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={userData.senha}
                onChange={handleUserDataChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.senha ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="••••••••"
              />
              {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="block text-sm font-medium mb-1 text-gray-700">Confirmar senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={userData.confirmarSenha}
                onChange={handleUserDataChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="••••••••"
              />
              {errors.confirmarSenha && <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>}
            </div>
          </div>

          <button
            onClick={nextStep}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            Continuar para pagamento
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Informações de Pagamento</h2>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg text-blue-900">Plano Premium</h3>
            <p className="text-2xl font-bold text-blue-800">R$59,90 <span className="text-sm font-normal">por mês</span></p>
          </div>

          <div>
            <p className="mb-3 font-medium text-gray-700">Método de pagamento</p>
            <div className="flex items-center p-3 border border-blue-200 rounded-lg bg-blue-50">
              <CreditCard size={20} className="text-blue-600 mr-2" />
              <span className="font-medium text-blue-800">Cartão de Crédito</span>
              <span className="text-sm text-gray-600 ml-3">
                Processado por Mercado Pago
              </span>
            </div>
          </div>

          <form id="form-checkout" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Número do cartão</label>
              <div id="form-checkout__cardNumber" className="border border-gray-300 rounded-md p-2 min-h-[40px]"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Data de validade</label>
                <div id="form-checkout__expirationDate" className="border border-gray-300 rounded-md p-2 min-h-[40px]"></div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">CVV</label>
                <div id="form-checkout__securityCode" className="border border-gray-300 rounded-md p-2 min-h-[40px]"></div>
              </div>
            </div>

            <div>
              <label htmlFor="form-checkout__cardholderName" className="block text-sm font-medium mb-1 text-gray-700">Nome no cartão</label>
              <input
                type="text"
                id="form-checkout__cardholderName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={userData.nome}
              />
            </div>

            <div>
              <label htmlFor="form-checkout__cardholderEmail" className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <input
                type="email"
                id="form-checkout__cardholderEmail"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={userData.email}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="form-checkout__identificationType" className="block text-sm font-medium mb-1 text-gray-700">Tipo de documento</label>
                <select id="form-checkout__identificationType" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></select>
              </div>
              <div>
                <label htmlFor="form-checkout__identificationNumber" className="block text-sm font-medium mb-1 text-gray-700">Número do documento</label>
                <input type="text" id="form-checkout__identificationNumber" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label htmlFor="form-checkout__issuer" className="block text-sm font-medium mb-1 text-gray-700">Banco emissor</label>
              <select id="form-checkout__issuer" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></select>
            </div>

            <div>
              <label htmlFor="form-checkout__installments" className="block text-sm font-medium mb-1 text-gray-700">Parcelas</label>
              <select id="form-checkout__installments" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></select>
            </div>

            {errors.payment && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle size={18} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
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
                {paymentMessage || "Seu pagamento foi processado com sucesso e sua conta premium foi ativada."}
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
                {paymentStatus === 'in_process' ? 'Voltar ao site' : 'Acessar Mind Desk Premium'}
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

              <h2 className="text-2xl font-bold mb-4">Pagamento Não Aprovado</h2>

              <p className="mb-6">
                {paymentMessage || "Não foi possível processar seu pagamento. Por favor, tente novamente ou escolha outro método de pagamento."}
              </p>

              {transactionId && (
                <div className="transaction-details mb-6 p-4 bg-gray-50 rounded-lg text-left">
                  <p className="flex justify-between mb-2">
                    <span className="text-gray-600">ID da transação:</span>
                    <span className="font-medium">{transactionId}</span>
                  </p>
                  <p className="flex justify-between mb-2">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-red-500">{paymentStatus}</span>
                  </p>
                </div>
              )}

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