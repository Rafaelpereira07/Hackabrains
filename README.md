<h1 align="center"> 🩺 ClinIA </h1>

<p align="center">
  <i>Um aplicativo inteligente de gestão médica que conecta o histórico de saúde do paciente à tomada de decisão clínica. <br>Desenvolvido para a <b>UNISENAC Pelotas - CODE.LEAGUE &lt;2026&gt;</b>.</i>
</p>

---

## 🚨 O Problema: O Cenário Atual & A Dor

A fragmentação de dados do paciente é um problema grave no sistema de saúde atual. 

**Validação Real (Risco de Erros):** Segundo apontamento do *Portal de Notícias CNN Brasil*, o Brasil registrou quase 300 mil falhas na assistência à saúde associadas à transição de cuidado e problemas de comunicação entre equipes. A falta de uma visão unificada prejudica o diagnóstico e coloca vidas em risco.

## 💡 A Solução: Nossa Proposta de Valor

O **ClinIA** utiliza Inteligência Artificial para otimizar o tempo médico e melhorar a adesão ao tratamento por parte do paciente. 

**Diferencial Competitivo / Inovação:**
O grande diferencial da nossa solução está na integração inteligente de dados clínicos dispersos (sistemas legados como Tasy, MV e registros manuais) em uma única visão unificada do paciente. Tudo isso potencializado por uma **camada de IA contextual** que auxilia médicos na tomada de decisão rápida e assertiva.

---

## ⚙️ Stack Tecnológica

O projeto foi construído separando as responsabilidades entre uma API robusta e uma interface de alta performance, ambas tipadas estaticamente:

### 🖥️ Frontend
* **Biblioteca:** React
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS

### 🗄️ Backend
* **Servidor:** Node.js com Express
* **Linguagem:** TypeScript
* **ORM:** Prisma
* **Banco de Dados:** MySQL

---

## ✨ Funcionalidades Principais

* **👨‍⚕️ Dashboard do Médico:** Visão geral de pacientes atendidos, emissão rápida de laudos com suporte contextual e acesso unificado ao histórico do paciente.
* **🤒 Área do Paciente:** Acesso em tempo real à timeline de laudos, diagnósticos e exames, promovendo maior engajamento no tratamento.
* **🛡️ Painel Admin:** Gestão de usuários (ativação/inativação) e controle de permissões de acesso (Role-based access control).

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado.
* Instância do [MySQL](https://www.mysql.com/) rodando localmente ou em nuvem.

### 1. Rodando o Backend (API)
```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente no arquivo .env
# Ex: DATABASE_URL="mysql://usuario:senha@localhost:3306/hackabrains"
# Ex: JWT_SECRET="sua_chave_secreta"

# Rode as migrações do Prisma para criar as tabelas
npx prisma db push

# Inicie o servidor
npm run dev
