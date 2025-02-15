<h2>🔧 Instalação e Configuração</h2>
<ol>
    <li>Clone o repositório:<br>
        <code>git clone https://github.com/renanjava/testes-escola-de-ti</code>
    </li>
    <li>Acesse o diretório:<br>
        <code>cd testes-escola-de-ti</code>
    </li>
    <li>Instale as dependências:<br>
      <code>npm install</code>
    </li>
    <li>Crie as variáveis de ambiente:<br>
        <code>cp .env.example .env</code>
    </li>
    <li>Configure as variáveis de ambiente:<br>
    </li>
    <li>Inicie a aplicação em ambiente de desenvolvimento:<br>
        <code>npm run start:dev</code>
    </li>
</ol>

<h2>🛠️ Git Flow</h2>
<ul>
    <li>Apenas a branch <code>main</code> representa o ambiente de produção.</li>
    <li><strong>Ninguém pode fazer push direto para <code>main</code></strong>, apenas via <strong>Pull Request</strong>.</li>
    <li>Cada desenvolvedor deve criar sua branch no formato:<br>
        <code>dev/nome</code>
    </li>
    <li>Após finalizar a implementação, deve abrir um Pull Request para <code>main</code>.</li>
    <li>O PR <strong>só será aceito se passar na pipeline de CI/CD</strong> (validação de linter e testes unitários).</li>
</ul>

<h2>🧪 Testes</h2>
<ul>
    <li>Para rodar os testes unitários:<br>
        <code>npm run test:unit</code>
    </li>
    <li>Para rodar os testes de integração:<br>
        <code>npm run test:int</code>
    </li>
    <li>Para rodar os testes de ponta a ponta (E2E):<br>
        <code>npm run test:e2e</code>
    </li>
    <li>Para rodar os testes com cobertura de código:<br>
        <code>npm run test:cov</code>
    </li>
    <li>Para rodar os testes em modo watch:<br>
        <code>npm run test:watch</code>
    </li>
</ul>
