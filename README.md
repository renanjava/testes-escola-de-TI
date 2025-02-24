![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

<h2>📌 Visão Geral</h2>
<p>Este é o back-end de um sistema de delivery para padarias, desenvolvido em TypeScript utilizando o framework NestJS.</p>

<h2>🔥 Stack Utilizada</h2>
<ul>
    <li>node: v20.12.2</li>
    <li>@nestjs/jwt: v11.0.0</li>
    <li>bcrypt: v5.1.1</li>
    <li>class-transformer: v0.5.1</li>
    <li>class-validator: v0.14.1</li>
    <li>jest: v29.7.0</li>
    <li>prettier: v3.4.2</li>
    <li>prisma: v6.4.0</li>
    <li>@prisma/client: v6.4.0</li>
    <li>eslint: v9.20.1</li>
    <li>@faker-js/faker: v9.5.0</li>
</ul>

<h2>🚀 Tecnologias Utilizadas</h2>
<ul>
    <li><strong>Linguagem:</strong> TypeScript</li>
    <li><strong>Framework:</strong> NestJS</li>
    <li><strong>Autenticação:</strong> JWT e Bcrypt</li>
    <li><strong>Transformação de Dados:</strong> Class Transformer</li>
    <li><strong>Validação de Dados:</strong> Class Validator</li>
    <li><strong>Testes:</strong> Jest</li>
    <li><strong>Padronização de Código:</strong> Prettier e ESLint</li>
    <li><strong>ORM:</strong> Prisma</li>
    <li><strong>Fakes e Mocking:</strong> Faker.js</li>
    <li><strong>CI/CD:</strong> Validação automática de linter e testes unitários</li>
</ul>


<h2>📂 Estrutura do Projeto - Arquitetura MVC</h2>
<pre>
  /src
  |-- modules/            # Módulos da aplicação
  |-- controllers/        # Controladores das rotas
  |-- services/           # Serviços e regras de negócio
  |-- entities/           # Modelagem das entidades
  |-- config/             # Configuração do sistema
  |-- main.ts             # Arquivo principal
</pre>

<h2>🔀 Git Flow</h2>
<ul>
    <li>Apenas a branch <code>main</code> representa o ambiente de produção.</li>
    <li><strong>Ninguém pode fazer push direto para <code>main</code></strong>, apenas via <strong>Pull Request</strong>.</li>
    <li>Cada desenvolvedor deve criar sua branch no formato:<br><code>dev/nome</code></li>
    <li>Após finalizar a implementação, deve abrir um Pull Request para <code>main</code>.</li>
    <li>O PR <strong>só será aceito se passar na pipeline de CI/CD</strong> (validação de linter e testes unitários).</li>
</ul>

<h2>🛠️ Instalação do projeto</h2>
<ol>
    <li>Clone o repositório:<br><code>git clone https://github.com/renanjava/testes-escola-de-ti</code></li>
    <li>Acesse o diretório do projeto:<br><code>cd testes-escola-de-ti</code></li>
    <li>Instale as dependências:<br><code>npm install</code></li>
    <li>Configure as variáveis de ambiente:<br><code>cp .env.example .env</code></li>
</ol>

<h2>🖥️ Como rodar a API</h2>
<ol>
    <li>Inicie a aplicação em ambiente de desenvolvimento:<br><code>npm run start:dev</code></li>
</ol>

<h2>⚙️ Testes</h2>
<ul>
    <li>Para rodar os testes unitários:<br><code>npm run test:unit</code></li>
    <li>Para rodar os testes de integração:<br><code>npm run test:int</code></li>
    <li>Para rodar os testes de ponta a ponta (E2E):<br><code>npm run test:e2e</code></li>
    <li>Para rodar os testes unitários com cobertura de código:<br><code>npm run test:cov</code></li>
    <li>Para rodar os testes unitários em modo watch:<br><code>npm run test:watch</code></li>
</ul>
