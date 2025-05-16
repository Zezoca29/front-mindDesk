import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, AlertCircle } from 'lucide-react';
import './CadastroPremium.css';

function CadastroPremium() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Estados para os dados do usuário
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  
  // Estados para os dados de pagamento
  const [paymentData, setPaymentData] = useState({
    numeroCartao: '',
    nomeCartao: '',
    validade: '',
    cvv: '',
    cpf: '',
    metodoPagamento: 'cartao', // cartao, pix, boleto
  });
  
  // Estado para controlar erros
  const [errors, setErrors] = useState({});
  
  // Estados para confirmação
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  // Manipuladores de mudança de campos
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentDataChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
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

  // Validação do segundo passo
  const validateStep2 = () => {
    const newErrors = {};
    
    if (paymentData.metodoPagamento === 'cartao') {
      if (!paymentData.numeroCartao.trim() || paymentData.numeroCartao.replace(/\s/g, '').length !== 16) {
        newErrors.numeroCartao = 'Número de cartão inválido';
      }
      if (!paymentData.nomeCartao.trim()) newErrors.nomeCartao = 'Nome no cartão é obrigatório';
      if (!paymentData.validade.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.validade)) {
        newErrors.validade = 'Validade inválida (MM/AA)';
      }
      if (!paymentData.cvv.trim() || !/^\d{3,4}$/.test(paymentData.cvv)) {
        newErrors.cvv = 'CVV inválido';
      }
    }
    
    if (!paymentData.cpf.trim() || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(paymentData.cpf)) {
      newErrors.cpf = 'CPF inválido (000.000.000-00)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Avançar para o próximo passo
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      processPayment();
    }
  };

  // Voltar para o passo anterior
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Processar o pagamento
  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulação de chamada à API de pagamento
      // Na implementação real, você faria uma chamada à API do seu gateway de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulando uma resposta de sucesso
      setTransactionId('TX' + Math.floor(Math.random() * 1000000));
      setIsSuccess(true);
      setStep(3);
      
      // Aqui você faria a requisição para o backend criar o usuário com status premium
      // createPremiumUser({ ...userData, paymentInfo: { transactionId } });
      
    } catch (error) {
      setErrors({ payment: 'Erro ao processar pagamento. Tente novamente.' });
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para finalizar o cadastro e redirecionar para o app
  const finishSignup = () => {
    navigate('/mind-desk');
  };

  // Formatar número do cartão com espaços a cada 4 dígitos
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Formatar CPF
  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };
  
  // Formatar validade do cartão
  const formatValidade = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 5);
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
            className="btn btn-primary w-full"
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
            <div className="flex space-x-4">
              <label className={`payment-method-option ${paymentData.metodoPagamento === 'cartao' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="metodoPagamento"
                  value="cartao"
                  checked={paymentData.metodoPagamento === 'cartao'}
                  onChange={handlePaymentDataChange}
                  className="sr-only"
                />
                <CreditCard size={20} />
                <span>Cartão</span>
              </label>
              
              <label className={`payment-method-option ${paymentData.metodoPagamento === 'pix' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="metodoPagamento"
                  value="pix"
                  checked={paymentData.metodoPagamento === 'pix'}
                  onChange={handlePaymentDataChange}
                  className="sr-only"
                />
                <span className="text-xl">PIX</span>
              </label>
              
              <label className={`payment-method-option ${paymentData.metodoPagamento === 'boleto' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="metodoPagamento"
                  value="boleto"
                  checked={paymentData.metodoPagamento === 'boleto'}
                  onChange={handlePaymentDataChange}
                  className="sr-only"
                />
                <span>Boleto</span>
              </label>
            </div>
          </div>
          
          {paymentData.metodoPagamento === 'cartao' && (
            <>
              <div className="form-group mb-4">
                <label htmlFor="numeroCartao" className="block mb-1">Número do cartão</label>
                <input
                  type="text"
                  id="numeroCartao"
                  name="numeroCartao"
                  value={paymentData.numeroCartao}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    setPaymentData((prev) => ({ ...prev, numeroCartao: formatted }));
                  }}
                  className={`form-input ${errors.numeroCartao ? 'error' : ''}`}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                />
                {errors.numeroCartao && <p className="error-message">{errors.numeroCartao}</p>}
              </div>
              
              <div className="form-group mb-4">
                <label htmlFor="nomeCartao" className="block mb-1">Nome no cartão</label>
                <input
                  type="text"
                  id="nomeCartao"
                  name="nomeCartao"
                  value={paymentData.nomeCartao}
                  onChange={handlePaymentDataChange}
                  className={`form-input ${errors.nomeCartao ? 'error' : ''}`}
                  placeholder="Como aparece no cartão"
                />
                {errors.nomeCartao && <p className="error-message">{errors.nomeCartao}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label htmlFor="validade" className="block mb-1">Validade</label>
                  <input
                    type="text"
                    id="validade"
                    name="validade"
                    value={paymentData.validade}
                    onChange={(e) => {
                      const formatted = formatValidade(e.target.value);
                      setPaymentData((prev) => ({ ...prev, validade: formatted }));
                    }}
                    className={`form-input ${errors.validade ? 'error' : ''}`}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                  {errors.validade && <p className="error-message">{errors.validade}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="cvv" className="block mb-1">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setPaymentData((prev) => ({ ...prev, cvv: value }));
                    }}
                    className={`form-input ${errors.cvv ? 'error' : ''}`}
                    placeholder="000"
                    maxLength={4}
                  />
                  {errors.cvv && <p className="error-message">{errors.cvv}</p>}
                </div>
              </div>
            </>
          )}
          
          {paymentData.metodoPagamento === 'pix' && (
            <div className="pix-instructions p-4 bg-gray-50 rounded-lg mb-4">
              <p className="mb-2">Após confirmar, você receberá um QR code para pagamento via PIX.</p>
              <div className="pix-placeholder flex justify-center items-center border-2 border-dashed border-gray-300 h-40 rounded-lg mb-4">
                QR Code do PIX será gerado após confirmação
              </div>
            </div>
          )}
          
          {paymentData.metodoPagamento === 'boleto' && (
            <div className="boleto-instructions p-4 bg-gray-50 rounded-lg mb-4">
              <p className="mb-2">O boleto será gerado após a confirmação e enviado para seu email.</p>
              <p className="text-sm text-gray-600">Processamento leva até 3 dias úteis após o pagamento.</p>
            </div>
          )}
          
          <div className="form-group mb-6">
            <label htmlFor="cpf" className="block mb-1">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={paymentData.cpf}
              onChange={(e) => {
                const formatted = formatCPF(e.target.value);
                setPaymentData((prev) => ({ ...prev, cpf: formatted }));
              }}
              className={`form-input ${errors.cpf ? 'error' : ''}`}
              placeholder="000.000.000-00"
              maxLength={14}
            />
            {errors.cpf && <p className="error-message">{errors.cpf}</p>}
          </div>

          {errors.payment && (
            <div className="error-box mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle size={18} className="text-red-500 mr-2 mt-0.5" />
              <p className="text-red-700 text-sm">{errors.payment}</p>
            </div>
          )}
          
          <button 
            onClick={nextStep}
            disabled={isProcessing}
            className="btn btn-primary w-full"
          >
            {isProcessing ? 'Processando...' : 'Finalizar pagamento'}
          </button>
          
          <p className="text-center text-sm mt-4 text-gray-600">
            Seus dados de pagamento são processados de forma segura e criptografada.
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
                className="btn btn-primary w-full"
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
                className="btn btn-primary w-full"
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