![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

<h1>Sistema de Delivery para Padarias</h1>

<h2>📌 Visão Geral</h2>
<p>Este é o back-end de um sistema de delivery para padarias, desenvolvido em TypeScript utilizando o framework NestJS. O projeto inclui diversas funcionalidades essenciais para um sistema de delivery moderno, tais como:</p>
<ul>
    <li><strong>Autenticação com JWT Tokens:</strong> Utiliza JSON Web Tokens para autenticação segura e eficiente.</li>
    <li><strong>Controle de Acesso Baseado em Papéis:</strong> Implementa controle de acesso granular com base em papéis de usuário, permitindo a criação de rotas específicas para administradores, gerentes e usuários comuns.</li>
    <li><strong>Rotas Privadas e Públicas:</strong> Diferencia rotas que requerem autenticação de rotas acessíveis publicamente.</li>
    <li><strong>Administração de Padarias:</strong> Administradores podem criar padarias e designar gerentes responsáveis.</li>
    <li><strong>Gerenciamento de Produtos:</strong> Gerentes podem adicionar produtos apenas às padarias que possuem permissão.</li>
    <li><strong>Relacionamentos entre Entidades:</strong> Relacionamentos bem definidos entre usuários, padarias e produtos.</li>
    <li><strong>Envio de E-mails:</strong> Integração com serviços de envio de e-mails para notificações e recuperação de senha.</li>
    <li><strong>Clean Architecture:</strong> Arquitetura desacoplada com princípios de Clean Architecture e Hexagonal Architecture (adapters).</li>
    <li><strong>Funcionalidades de Login e Registro:</strong> Permite que novos usuários se registrem e usuários existentes façam login para acessar funcionalidades protegidas.</li>
    <li><strong>Integração com Docker:</strong> A aplicação está disponível no DockerHub, facilitando a implantação e execução em ambientes de produção.</li>
    <li><strong>Manipulação de Banco de Dados com Prisma:</strong> Utiliza Prisma como ORM para interações eficientes e seguras com o banco de dados PostgreSQL.</li>
    <li><strong>Testes Automatizados:</strong> Inclui testes unitários, de integração e E2E para garantir a qualidade e a estabilidade do código.</li>
</ul>

<h2>🔥 Stack Utilizada</h2>
<ul>
    <li><strong>Node.js</strong>: v20.12.2</li>
    <li><strong>NestJS</strong>: v11.0.10</li>
    <li><strong>JWT</strong>: @nestjs/jwt v11.0.0</li>
    <li><strong>Bcrypt</strong>: v5.1.1</li>
    <li><strong>Class Transformer</strong>: v0.5.1</li>
    <li><strong>Class Validator</strong>: v0.14.1</li>
    <li><strong>Jest</strong>: v29.7.0</li>
    <li><strong>Prettier</strong>: v3.4.2</li>
    <li><strong>Prisma</strong>: v6.4.0</li>
    <li><strong>ESLint</strong>: v9.20.1</li>
    <li><strong>Faker.js</strong>: v9.5.0</li>
    <li><strong>Supertest</strong>: v6.3.3</li>
    <li><strong>UUID</strong>: v9.0.0</li>
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
    <li><strong>UUID</strong> 
        <ul>
            <li><small>Usado para gerar e armazenar UUIDs, garantindo que não haverá repetição e que não serão fáceis de descobrir.</small></li>
        </ul>
    </li>
</ul>

<h2>📂 Estrutura do Projeto</h2>
<pre>
  /src
  |-- application/        # Camada de aplicação (use cases, DTOs, errors)
  |-- domain/             # Camada de domínio (entidades e interfaces)
  |-- infrastructure/     # Camada de infraestrutura (controllers, adapters, pipes, repositories)
  |-- main.ts             # Arquivo principal da aplicação
</pre>

<h2>🌀 Design Patterns</h2>
<ul>
    <li><strong>Singleton:</strong> Usando a injeção de dependências do Nest.js, por padrão, ele já aplica o Singleton, as dependências que ele gerencia são únicas. Tenho o PrismaService localizado em <code>src/infrastructure/services/orm/prisma.service.ts</code> onde eu passo a responsabilidade para o framework instanciar e através dos módulos (o núcleo da aplicação), eu uso a mesma instância gerenciada pelo Nest.js, portanto, tenho apenas uma conexão com o banco de dados, a função <code>onModuleInit()</code></li>
    <li><strong>Factory Method:</strong>
    Na classe UserService localizada em <code>src/infrastructure/services/user/user.service.ts</code>, eu instanciava os UseCases diretamente em cada método. No entanto, apliquei o padrão de design Factory para centralizar a criação das instâncias. Agora, todos os UseCases são instanciados na própria classe, e um único método é responsável por retornar as instâncias já criadas. Portanto, a Controller deixa de utilizar uma service e usa apenas uma Factory, a UserService foi deletada.
    </li>
    <li><strong>Strategy:</strong> Na rota de login, a AuthService localizada em <code>src/infrastructure/services/auth/auth.service.ts</code> utiliza o padrão Strategy para encapsular a lógica de autenticação. Definimos uma interface <code>AuthStrategy</code> com um método abstrato <code>authenticate</code>. Duas implementações foram criadas: <code>BasicAuth</code>, que executa o caso de uso para buscar o usuário, valida a senha e gera um token JWT; e <code>GoogleAuth</code>, que implementa a autenticação via Google e retorna um token. A AuthService depende apenas da interface <code>AuthStrategy</code>, permitindo a utilização de <code>BasicAuth</code>, <code>GoogleAuth</code> ou outras estratégias sem modificar o código.</li>
</ul>

<h2>🔀 Git Flow</h2>
<ul>
    <li>Apenas a branch <code>main</code> representa o ambiente de produção.</li>
    <li><strong>Ninguém pode fazer push direto para <code>main</code></strong>, apenas via <strong>Pull Request</strong>.</li>
    <li>Cada desenvolvedor deve criar sua branch no formato:<br><code>dev/nome</code></li>
    <li>Após finalizar a implementação, deve abrir um Pull Request para <code>main</code>.</li>
    <li>O PR <strong>só será aceito se passar na pipeline de CI/CD</strong></li>
</ul>

<h2>🚀 Workflows e Jobs de CI/CD</h2>
<ul>
    <li><strong>basic-check:</strong> Verificação básica de código (testes unitários, linter e testes de integração). Acionado em todo push para qualquer branch, exceto <code>main</code>.</li>
    <li><strong>advanced-check:</strong> Verificação avançada de código (testes E2E). Acionado em PRs para a branch <code>main</code>.</li>
    <li><strong>push-dockerhub:</strong> Geração e push de imagens Docker. Acionado em PRs para <code>main</code> (gera artefato) e em push para <code>main</code> (push para DockerHub).</li>
</ul>

<h2>🛠️ Instalação do Projeto</h2>
<ol>
    <li>Clone o repositório:<br><code>git clone https://github.com/renanjava/testes-escola-de-ti</code></li>
    <li>Acesse o diretório do projeto:<br><code>cd testes-escola-de-ti</code></li>
    <li>Instale as dependências:<br><code>npm install</code></li>
    <li>Configure as variáveis de ambiente:<br><code>cp .env.example .env</code></li>
</ol>

<h2>🖥️ Como Rodar a API</h2>
<ol>
    <li>Certifique-se de ter o Docker instalado e em execução.</li>
    <li>Faça o pull da imagem Docker:<br><code>docker pull renancesu/cafe-com-type:latest</code></li>
    <li>Suba os contêineres:<br><code>npm run docker:up</code></li>
</ol>

<h2>📚 Rotas da API</h2>
<h3>Autenticação</h3>
<ul>
    <li><code>POST /auth/login</code>: Autentica um usuário e retorna um token JWT.</li>
    <li><code>POST /auth/register</code>: Registra um novo usuário.</li>
</ul>

<h3>Admin</h3>
<ul>
    <li><code>POST /admin/bakery</code>: Cria uma nova padaria.</li>
    <li><code>PATCH /admin/bakery/:id/manager</code>: Define um gerente para uma padaria.</li>
    <li><code>GET /admin/users</code>: Lista todos os usuários.</li>
</ul>

<h3>Gerente</h3>
<ul>
    <li><code>POST /manager/product</code>: Adiciona um produto à padaria gerenciada.</li>
    <li><code>GET /manager/products</code>: Lista produtos da padaria gerenciada.</li>
</ul>

<h3>Usuário</h3>
<ul>
    <li><code>GET /user</code>: Retorna o perfil do usuário autenticado.</li>
    <li><code>PATCH /user</code>: Atualiza o perfil do usuário autenticado.</li>
</ul>

<h3>Produtos</h3>
<ul>
    <li><code>GET /products</code>: Lista todos os produtos disponíveis.</li>
    <li><code>GET /products/:id</code>: Retorna detalhes de um produto específico.</li>
</ul>

<h2>⚙️ Testes</h2>
<ul>
    <li>Para rodar os testes unitários:<br><code>npm run test:unit</code></li>
    <li>Para rodar os testes de integração:<br><code>npm run test:int</code></li>
    <li>Para rodar os testes de ponta a ponta (E2E):<br><code>npm run test:e2e</code></li>
    <li>Para rodar os testes com cobertura de código:<br><code>npm run test:cov</code></li>
</ul>

<h2>📄 Licença</h2>
<p>Este projeto está licenciado sob a Licença MIT. Veja o arquivo <a href="LICENSE">LICENSE</a> para mais detalhes.</p>
