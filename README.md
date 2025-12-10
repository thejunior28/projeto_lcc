# 🎓 Sistema de Emissão de Diplomas em Blockchain (SBT)

[cite_start]Este projeto é uma Aplicação Descentralizada (DApp) para emissão, registro e validação de diplomas acadêmicos, desenvolvida em conformidade com a **Portaria MEC nº 70 de 24 de janeiro de 2025**[cite: 4].

## 🔗 Links do Projeto
- **Painel do Emissor (Secretaria):** [Insira seu Link CodeSandbox Aqui]
- **Portal de Validação Pública:** [Insira seu Link Aqui]/validar.html
- **Smart Contract (Sepolia):** [Link para o Etherscan do seu contrato]

## 🛠 Tecnologias Utilizadas
- **Blockchain:** Ethereum (Rede Sepolia)
- **Padrão de Token:** ERC-721 Soulbound (Intransferível)
- [cite_start]**Armazenamento:** IPFS (via Pinata) para preservação assegurada de dados [cite: 24]
- **Frontend:** HTML5, CSS3, Ethers.js v6

## 📜 Conformidade com a Portaria MEC nº 70/2025

Este sistema foi projetado para atender aos requisitos técnicos exigidos pelo Ministério da Educação:

1.  **Intransferibilidade:** O diploma é um token *Soulbound*, impedindo a comercialização ou transferência do título.
2.  [cite_start]**Validade Jurídica e Integridade:** O Hash do XML do diploma é gravado na Blockchain, garantindo integridade, confiabilidade e irretratabilidade (Art. 4º)[cite: 24].
3.  [cite_start]**URL Única:** Cada diploma possui metadados com link para validação pública (Art. 6º, §2º)[cite: 32].
4.  [cite_start]**Representação Visual:** Interface de validação que exibe a imagem do diploma e os dados do registro (Art. 7º)[cite: 42].
5.  [cite_start]**Ambiente Virtual:** Portal para consulta pública do status do documento (Art. 9º)[cite: 63].

## 🚀 Como Usar

### 1. Emissão (Instituição)
Acesse o arquivo `index.html`. Conecte a carteira autorizada (Owner) e preencha os dados do aluno. O sistema irá:
1. Gerar o JSON de metadados.
2. Fazer upload para o IPFS.
3. Mintar o token na rede Sepolia.

### 2. Validação (Público/Empregador)
Acesse o arquivo `validar.html`. Digite o ID do diploma. O sistema irá:
1. Consultar a Blockchain para verificar a autenticidade.
2. Exibir os dados oficiais e a representação visual.