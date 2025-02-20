import 'package:flutter/material.dart';
import 'cadastro_screen.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold( // Cria a estrutura básica da tela
      body: Center( // Centraliza o conteúdo da tela
        child: Container( // Contêiner para organizar os elementos de forma estilizada
          padding: const EdgeInsets.all(20), // Define o padding interno do container
          width: 350, // Define a largura do container
          decoration: BoxDecoration( // Define o estilo de fundo e bordas do container
            color: Colors.white, // Cor de fundo do container
            borderRadius: BorderRadius.circular(10), // Bordas arredondadas
            boxShadow: [ // Efeito de sombra para dar profundidade
              BoxShadow(
                color: Colors.black.withOpacity(0.1), // Cor e opacidade da sombra
                blurRadius: 10, // Raio de desfocagem da sombra
                spreadRadius: 4, // Quanto a sombra vai se espalhar
              ),
            ],
          ),
          child: Column( // Organiza os elementos de forma vertical
            mainAxisSize: MainAxisSize.min, // Utiliza o mínimo necessário de espaço
            children: [
              const Text( // Exibe o título da tela
                'Café com Type',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold), // Estilo do título
              ),
              const SizedBox(height: 10), // Espaçamento entre título e subtítulo
              const Text( // Exibe o subtítulo "Acesse sua conta"
                'Acesse sua conta',
                style: TextStyle(fontSize: 18), // Estilo do subtítulo
              ),
              const SizedBox(height: 20), // Espaçamento entre o subtítulo e os campos de entrada
              _buildInputField('Usuário', Icons.person), // Campo de entrada para o nome de usuário
              _buildInputField('Senha', Icons.lock, obscureText: true), // Campo de entrada para senha com texto oculto
              const SizedBox(height: 10), // Espaçamento entre os campos de entrada e o link
              TextButton( // Link "Esqueci minha senha"
                onPressed: () {}, // Ação do botão (ainda não implementada)
                child: const Text(
                  'Esqueci minha senha',
                  style: TextStyle(color: Colors.blue, fontSize: 14), // Estilo do texto
                ),
              ),
              const SizedBox(height: 10), // Espaçamento entre o link e o botão de login
              ElevatedButton( // Botão "Entrar"
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.yellow, // Cor de fundo do botão
                  shape: RoundedRectangleBorder( // Bordas arredondadas do botão
                    borderRadius: BorderRadius.circular(5),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 50), // Padding interno do botão
                ),
                onPressed: () {}, // Ação do botão (ainda não implementada)
                child: const Text( // Texto dentro do botão
                  'Entrar',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold), // Estilo do texto
                ),
              ),
              const SizedBox(height: 10), // Espaçamento entre o botão de login e o link para cadastro
              TextButton( // Link "Não possuo cadastro"
                onPressed: () { // Ao clicar, navega para a tela de cadastro
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const CadastroScreen()), // Navega para a tela de cadastro
                  );
                },
                child: const Text(
                  'Não possuo cadastro',
                  style: TextStyle(color: Colors.blue, fontSize: 14), // Estilo do texto
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Função que cria o campo de entrada
  Widget _buildInputField(String label, IconData icon, {bool obscureText = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15), // Espaçamento inferior entre os campos
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, // Alinha os itens à esquerda
        children: [
          Text( // Rótulo do campo
            label,
            style: const TextStyle(fontSize: 14), // Estilo do rótulo
          ),
          const SizedBox(height: 5), // Espaçamento entre o rótulo e o campo de entrada
          TextField( // Campo de entrada de texto
            obscureText: obscureText, // Define se o texto será oculto (para senhas)
            decoration: InputDecoration( // Decoração do campo de texto
              prefixIcon: Icon(icon, color: Colors.grey), // Ícone dentro do campo de texto
              border: OutlineInputBorder( // Borda arredondada para o campo
                borderRadius: BorderRadius.circular(5),
              ),
              contentPadding: const EdgeInsets.all(10), // Padding dentro do campo de texto
            ),
          ),
        ],
      ),
    );
  }
}
