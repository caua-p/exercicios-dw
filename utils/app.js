const express = require('express');
const app = express();
const port = 3000;

// Rota 1: Verificar se o número é primo
app.get('/is-prime/:number', (req, res) => {
  const n = Number(req.params.number);

  // Tratamento de erro: se não for um número inteiro válido
  if (!Number.isInteger(n)) {
    return res.status(400).json({ error: "O parâmetro deve ser um número inteiro válido." });
  }

  let isPrime = n > 1;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      isPrime = false;
      break;
    }
  }

  res.json({ number: n, isPrime: isPrime });
});

// Rota 2: Gerador de senhas aleatórias
app.get('/password-gen/:length', (req, res) => {
  const length = Number(req.params.length);

  // Tratamento de erro: comprimento inválido
  if (!Number.isInteger(length) || length <= 0 || length > 100) {
    return res.status(400).json({ error: "Informe um comprimento inteiro entre 1 e 100." });
  }

  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  res.json({ length: length, password: password });
});

app.listen(port, () => {
  console.log(`🚀 API Utils rodando em http://localhost:${port}`);
});