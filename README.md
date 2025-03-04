![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

<h1>Sistema de Delivery para Padarias</h1>

<h2>📌 Visão Geral</h2>
<p>Este é o back-end de um sistema de delivery para padarias, desenvolvido em TypeScript utilizando o framework NestJS. O projeto inclui funcionalidades de autenticação, hash de senhas, validação de dados, manipulação de banco de dados, testes automatizados, e uma interface de usuário desenvolvida com React e Vite.</p>

<h2>🔥 Stack Utilizada</h2>
<ul>
    <li><strong>Node.js</strong>: v20.12.2 - Plataforma de execução JavaScript para back-end.</li>
    <li><strong>NestJS</strong>: Framework modular baseado em Node.js, inspirado em arquitetura Angular.</li>
    <li><strong>JWT</strong>: @nestjs/jwt v11.0.0 - Gerenciamento e autenticação via tokens JWT.</li>
    <li><strong>Bcrypt</strong>: v5.1.1 - Hash e verificação segura de senhas.</li>
    <li><strong>Class Transformer</strong>: v0.5.1 - Conversão automática entre objetos e DTOs.</li>
    <li><strong>Class Validator</strong>: v0.14.1 - Validação automática de dados recebidos.</li>
    <li><strong>Jest</strong>: v29.7.0 - Framework de testes unitários e de integração.</li>
    <li><strong>Prettier</strong>: v3.4.2 - Formatação automática e padronização do código.</li>
    <li><strong>Prisma</strong>: v6.4.0 - ORM moderno para facilitar manipulação do banco.</li>
    <li><strong>ESLint</strong>: v9.20.1 - Análise estática para garantir qualidade e boas práticas.</li>
    <li><strong>Faker.js</strong>: @faker-js/faker v9.5.0 - Geração de dados fictícios para testes e mocks.</li>
</ul>

<h2>🚀 Tecnologias Utilizadas</h2>
<ul>
    <li><strong>Linguagem: TypeScript</strong>
        <ul>
            <li><small>Adiciona tipagem estática e melhora a segurança e produtividade no desenvolvimento.</small></li>
        </ul>
    </li>
    <li><strong>Framework: NestJS</strong> 
        <ul>
            <li><small>Framework modular baseado em Node.js, inspirado em arquitetura Angular, ideal para aplicações escaláveis.</small></li>
        </ul>
    </li>
    <li><strong>Autenticação: JWT e Bcrypt</strong> 
        <ul>
            <li><small>JWT para autenticação baseada em tokens e Bcrypt para hash seguro de senhas.</small></li>
        </ul>
    </li>
    <li><strong>Transformação de Dados: Class Transformer</strong> 
        <ul>
            <li><small>Facilita a conversão de objetos entre classes e DTOs automaticamente.</small></li>
        </ul>
    </li>
    <li><strong>Validação de Dados: Class Validator</strong> 
        <ul>
            <li><small>Permite validar dados de entrada usando decorators simples e intuitivos.</small></li>
        </ul>
    </li>
    <li><strong>Testes: Jest</strong> 
        <ul>
            <li><small>Framework de testes abrangente para testes unitários, integração e E2E.</small></li>
        </ul>
    </li>
    <li><strong>Padronização de Código: Prettier e ESLint</strong> 
        <ul>
            <li><small>Prettier para formatação automática e ESLint para análise de boas práticas.</small></li>
        </ul>
    </li>
    <li><strong>ORM: Prisma</strong> 
        <ul>
            <li><small>Facilita o mapeamento de entidades e operações com banco de dados de forma intuitiva.</small></li>
        </ul>
    </li>
    <li><strong>Fakes e Mocking: Faker.js</strong> 
        <ul>
            <li><small>Gera dados fictícios realistas para criação de cenários de testes.</small></li>
        </ul>
    </li>
    <li><strong>CI/CD: Validação automática de linter e testes unitários</strong> 
        <ul>
            <li><small>Pipeline automatizado garante qualidade e integridade do código antes do merge.</small></li>
        </ul>
    </li>
</ul>

<h2>📂 Estrutura do Projeto</h2>
<pre>
  /src
  |-- controller/         # Controladores das rotas
  |-- model/              # Modelos, serviços, repositórios e DTOs
  |   |-- common/         # Utilitários, pipes, interceptors
  |   |-- entities/       # Modelagem das entidades e DTOs
  |   |-- repositories/   # Repositórios para acesso ao banco de dados
  |   |-- services/       # Serviços e regras de negócio
  |-- view/               # Interface de usuário desenvolvida com React e Vite
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
<h3>Ambiente de Desenvolvimento</h3>
<ol>
    <li>Execute as migrações do Prisma:<br><code>npx prisma migrate dev</code></li>
    <li>Inicie a aplicação em ambiente de desenvolvimento:<br><code>npm run start:dev</code></li>
    <li>Acesse a documentação da API:<br><code>http://localhost:3000/api</code></li>
</ol>

<h3>Ambiente de Produção (com Docker)</h3>
<ol>
    <li>Certifique-se de ter o Docker instalado e em execução.</li>
    <li>Construa a imagem Docker:<br><code>docker build -t padaria-delivery .</code></li>
    <li>Execute o contêiner Docker:<br><code>docker run -d -p 3000:3000 --env-file .env padaria-delivery</code></li>
    <li>Acesse a documentação da API:<br><code>http://localhost:3000/api</code></li>
</ol>

<h2>⚙️ Testes</h2>
<ul>
    <li>Para rodar os testes unitários:<br><code>npm run test:unit</code></li>
    <li>Para rodar os testes de integração:<br><code>npm run test:int</code></li>
    <li>Para rodar os testes de ponta a ponta (E2E):<br><code>npm run test:e2e</code></li>
    <li>Para rodar os testes unitários com cobertura de código:<br><code>npm run test:cov</code></li>
    <li>Para rodar os testes unitários em modo watch:<br><code>npm run test:watch</code></li>
</ul>

<h2>📄 Licença</h2>
<p>Este projeto está licenciado sob a Licença MIT. Veja o arquivo <a href="LICENSE">LICENSE</a> para mais detalhes.</p>