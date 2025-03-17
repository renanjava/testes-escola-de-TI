![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

<h1>Sistema de Delivery para Padarias</h1>

<h2>📌 Visão Geral</h2>
<p>Este é o back-end de um sistema de delivery para padarias, desenvolvido em TypeScript utilizando o framework NestJS. O projeto inclui diversas funcionalidades essenciais para um sistema de delivery moderno, tais como:</p>
<ul>
    <li><strong>Autenticação com JWT Tokens:</strong> Utiliza JSON Web Tokens para autenticação segura e eficiente.</li>
    <li><strong>Controle de Acesso Baseado em Papéis:</strong> Implementa controle de acesso granular com base em papéis de usuário, permitindo a criação de rotas específicas para administradores e usuários comuns.</li>
    <li><strong>Rotas Privadas e Públicas:</strong> Diferencia rotas que requerem autenticação de rotas acessíveis publicamente.</li>
    <li><strong>Rotas de Administrador:</strong> Inclui rotas específicas para administradores, como gerenciamento de usuários.</li>
    <li><strong>Rotas de Usuário:</strong> Inclui rotas específicas para usuários autenticados, como visualização e atualização de perfil.</li>
    <li><strong>Funcionalidades de Login e Registro:</strong> Permite que novos usuários se registrem e usuários existentes façam login para acessar funcionalidades protegidas.</li>
    <li><strong>Integração com Docker:</strong> A aplicação está disponível no DockerHub, facilitando a implantação e execução em ambientes de produção.</li>
    <li><strong>Manipulação de Banco de Dados com Prisma:</strong> Utiliza Prisma como ORM para interações eficientes e seguras com o banco de dados PostgreSQL.</li>
    <li><strong>Testes Automatizados:</strong> Inclui testes unitários e de integração para garantir a qualidade e a estabilidade do código.</li>
</ul>

<h2>🔥 Stack Utilizada</h2>
<ul>
    <li><strong>Node.js</strong>: v20.12.2 - Plataforma de execução JavaScript para back-end.</li>
    <li><strong>NestJS</strong>: Framework modular baseado em Node.js, inspirado em arquitetura Angular.</li>
    <li><strong>JWT</strong>: @nestjs/jwt v11.0.0 - Gerenciamento e autenticação via tokens JWT.</li>
    <li><strong>Bcrypt</strong>: v5.1.1 - Hash e verificação segura de senhas.</li>
    <li><strong>Class Transformer</strong>: v0.5.1 - Conversão automática entre objetos e DTOs.</li>
    <li><strong>Class Validator</strong>: v0.14.1 - Validação automática de dados de entrada.</li>
    <li><strong>Jest</strong>: v29.7.0 - Framework de testes unitários e de integração.</li>
    <li><strong>Prettier</strong>: v3.4.2 - Formatação automática e padronização do código.</li>
    <li><strong>Prisma</strong>: v6.4.0 - ORM moderno para facilitar manipulação do banco.</li>
    <li><strong>ESLint</strong>: v9.20.1 - Análise estática para garantir qualidade e boas práticas.</li>
    <li><strong>Faker.js</strong>: v9.5.0 - Geração de dados fictícios para testes e mocks.</li>
    <li><strong>Supertest</strong>: v6.3.3 - Biblioteca para testes de integração de APIs.</li>
    <li><strong>React</strong>: v18.2.0 - Biblioteca para construção de interfaces de usuário.</li>
    <li><strong>Vite</strong>: v3.2.3 - Ferramenta de build rápida para desenvolvimento de front-end.</li>
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
            <li><small>Framework modular baseado em Node.js, ideal para aplicações escaláveis.</small></li>
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
    <li><strong>Testes: Jest e Supertest</strong> 
        <ul>
            <li><small>Jest para testes unitários e de integração, e Supertest para testes de integração de APIs.</small></li>
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
    <li><strong>CI/CD: GitHub Actions</strong> 
        <ul>
            <li><small>Pipeline automatizado garante qualidade e integridade do código antes do merge.</small></li>
            <li><small>Geração de artefatos Docker e push para Docker Hub.</small></li>
        </ul>
    </li>
    <li><strong>Documentação: Swagger</strong> 
        <ul>
            <li><small>Gera documentação interativa da API automaticamente.</small></li>
        </ul>
    </li>
    <li><strong>Containerização: Docker e DockerHub</strong> 
        <ul>
            <li><small>Docker para criar contêineres e DockerHub para armazenar e distribuir imagens Docker.</small></li>
        </ul>
    </li>
    <li><strong>Controle de Versão: Git e GitHub</strong> 
        <ul>
            <li><small>Git para controle de versão e GitHub para hospedagem de repositórios e integração contínua.</small></li>
        </ul>
    </li>
    <li><strong>Controle de Acesso: RBAC</strong> 
        <ul>
            <li><small>Implementa controle de acesso baseado em papéis (Role-Based Access Control).</small></li>
        </ul>
    </li>
    <li><strong>Front-end: React e Vite</strong> 
        <ul>
            <li><small>React para construção de interfaces de usuário e Vite para build rápida e eficiente.</small></li>
        </ul>
    </li>
</ul>

<h2>📂 Estrutura do Projeto</h2>
<pre>
  /src
  |-- config/             # Arquivos de configuração
  |   |-- modules/        # Módulos de configuração
  |-- controller/         # Intermediário entre view e model
  |   |-- controllers/    # Controladores das rotas
  |   |-- auth/           # Gerenciador de Autenticação JWT
  |   |-- rbac/           # Gerenciador do Role-Based Acess Control
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
    <li>O PR <strong>só será aceito se passar na pipeline de CI/CD</strong></li>
    <li>Cada PR deve ter um título com as principais alterações e uma descrição listando todas as alterações feitas.</li>
    <li>O autor da PR deve solicitar a revisão de pelo menos um outro desenvolvedor.</li>
</ul>

<h2>🚀 Workflows e Jobs de CI/CD</h2>
<p>O projeto utiliza GitHub Actions para automação de CI/CD. Abaixo estão descritos os workflows e jobs configurados:</p>

<h3>📦 Geração de Artefato</h3>
<p>Este workflow é acionado em pull requests para a branch <code>main</code> e é responsável por construir a imagem Docker e salvar como um artefato.</p>
<ul>
    <li><strong>Nome:</strong> Geração de Artefato</li>
    <li><strong>Evento:</strong> pull_request (branch: main)</li>
    <li><strong>Jobs:</strong></li>
    <ul>
        <li><strong>artifact:</strong>
            <ul>
                <li>Configura o Docker Buildx</li>
                <li>Instala o Docker Compose</li>
                <li>Constrói a imagem Docker</li>
                <li>Salva a imagem Docker como um artefato</li>
                <li>Faz o upload do artefato</li>
            </ul>
        </li>
    </ul>
</ul>

<h3>🚀 Push para o Docker Hub</h3>
<p>Este workflow é acionado em pushs para a branch <code>main</code> e é responsável por baixar o artefato gerado e fazer o push da imagem Docker para o Docker Hub.</p>
<ul>
    <li><strong>Nome:</strong> Push para o Docker Hub</li>
    <li><strong>Evento:</strong> pull_request (branch: main)</li>
    <li><strong>Jobs:</strong></li>
    <ul>
        <li><strong>dockerhub:</strong>
            <ul>
                <li>Faz o checkout do código</li>
                <li>Configura o Docker Buildx</li>
                <li>Baixa o artefato gerado</li>
                <li>Faz login no Docker Hub</li>
                <li>Constrói as imagem Docker</li>
                <li>Dá um push da imagem Docker com tag dinâmica para o DockerHub</li>
                <li>Dá um push da imagem Docker com tag latest para o DockerHub</li>
            </ul>
        </li>
    </ul>
</ul>

<h3>✅ Check</h3>
<p>Este workflow é acionado em pushes para as branches e é responsável por verificar a qualidade do código e rodar os testes unitários e de integração.</p>
<ul>
    <li><strong>Nome:</strong> Check</li>
    <li><strong>Evento:</strong> push (branch: todas, exceto main)</li>
    <li><strong>Jobs:</strong></li>
    <ul>
        <li><strong>check:</strong>
            <ul>
                <li>Faz o checkout do código</li>
                <li>Instala as dependências</li>
                <li>Roda o linter</li>
                <li>Roda os testes unitários</li>
                <li>Sobe um banco de dados</li>
                <li>Roda os testes de integração</li>
            </ul>
        </li>
    </ul>
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
    <li>Inicie o serviço PostgreSQL do <code>docker-compose.yml</code>:<br><code>docker-compose up -d postgres</code></li>
    <li>Execute as migrações do Prisma:<br><code>npx prisma migrate dev</code></li>
    <li>Inicie a aplicação em ambiente de desenvolvimento:<br><code>npm run start:dev</code></li>
    <li>Acesse a documentação da API:<br><code>http://localhost:3000/api</code></li>
</ol>

<h3>Ambiente de Produção (com Docker)</h3>
<ol>
    <li>Certifique-se de ter o Docker instalado e em execução.</li>
    <li>Faça o pull da imagem Docker:<br><code>docker pull renancesu/cafe-com-type:latest</code></li>
    <li>Suba o contêiner do PostgreSQL:<br><code>docker run --name postgres -e POSTGRES_DB=escola-ti_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres</code></li>
    <li>Execute o contêiner da aplicação:<br><code>docker run --name cafe-com-type --link postgres:postgres -e NODE_ENV=production -e PORT=3000 -e JWT_SECRET=your_jwt_secret -e DATABASE_NAME=escola-ti_db -e DATABASE_URL=postgres://postgres:postgres@postgres:5432/escola-ti_db -p 3000:3000 -d renancesu/cafe-com-type:latest</code></li>
    <li>Acesse a documentação da API:<br><code>http://localhost:3000/api</code></li>
</ol>

<h2>📚 Rotas da API</h2>
<h3>Autenticação</h3>
<ul>
    <li><code>POST /auth/login</code>: Autentica um usuário e retorna um token JWT.</li>
    <li><code>POST /auth/register</code>: Registra um novo usuário.</li>
</ul>

<h3>User Controller</h3>
<ul>
    <li><code>GET /user/admin</code>: Retorna todos os usuários (apenas para administradores).</li>
    <li><code>GET /user</code>: Retorna o usuário autenticado.</li>
    <li><code>PATCH /user</code>: Atualiza o usuário autenticado.</li>
    <li><code>DELETE /user/admin/:id</code>: Remove um usuário (apenas para administradores).</li>
</ul>

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
