# Guia de Deploy - Mind Desk Frontend

## Problema Resolvido
O erro "No open ports detected on 0.0.0.0" foi resolvido configurando o Vite para escutar em todas as interfaces de rede.

## Configurações Implementadas

### 1. Vite Config (`vite.config.js`)
- Configurado para escutar em `0.0.0.0` (todas as interfaces)
- Usa a porta do ambiente (`$PORT`) ou padrão `5173`
- Proxy configurado para desenvolvimento

### 2. Package.json
- Script de preview atualizado para usar `--host 0.0.0.0`

### 3. Render.yaml
- Configuração específica para Render
- Variáveis de ambiente definidas
- Script de build personalizado

## Deploy no Render

### Opção 1: Usando render.yaml (Recomendado)
1. Faça commit das mudanças
2. Conecte seu repositório ao Render
3. O Render detectará automaticamente o `render.yaml`
4. Configure as variáveis de ambiente se necessário

### Opção 2: Configuração Manual
1. **Build Command**: `npm install && npm run build`
2. **Start Command**: `npm run preview`
3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   VITE_API_HABITS_LIST=https://221549b67d8a.ngrok-free.app/api/habits
   VITE_API_HABITS_GET_LIST=https://221549b67d8a.ngrok-free.app/api/habits/get
   VITE_API_AUTH_LOGIN=https://221549b67d8a.ngrok-free.app/api/auth/login
   VITE_API_AUTH_REGISTER=https://221549b67d8a.ngrok-free.app/api/auth/register
   VITE_API_USER_ME=https://221549b67d8a.ngrok-free.app/api/user/me
   VITE_API_PAYMENTS_CREATE_WITH_SIGNUP=https://221549b67d8a.ngrok-free.app/api/payments/create-with-signup
   VITE_API_PAYMENTS_CHECK=https://221549b67d8a.ngrok-free.app/api/payments/check
   ```

## Deploy no Vercel (Alternativa)
1. Conecte seu repositório ao Vercel
2. O Vercel detectará automaticamente o `vercel.json`
3. As variáveis de ambiente estão configuradas no arquivo

## Teste Local
```bash
# Build
npm run build

# Preview (simula produção)
npm run preview
```

## Troubleshooting

### Se ainda houver problemas de porta:
1. Verifique se a porta 10000 está disponível
2. Tente uma porta diferente no `render.yaml`
3. Verifique os logs do Render para mais detalhes

### Se houver problemas de CORS em produção:
1. As variáveis de ambiente devem apontar para URLs completas do ngrok
2. O proxy só funciona em desenvolvimento
3. Verifique se o backend está configurado para aceitar requisições do domínio de produção

## Estrutura de Arquivos
```
├── vite.config.js          # Configuração do Vite
├── render.yaml             # Configuração do Render
├── vercel.json             # Configuração do Vercel
├── render-build.sh         # Script de build para Render
├── package.json            # Scripts atualizados
└── DEPLOY.md              # Este arquivo
``` 