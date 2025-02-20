import 'package:flutter/material.dart';
import 'login_screen.dart';

class CadastroScreen extends StatelessWidget {
  const CadastroScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold( // Cria a estrutura básica da tela
      body: Center( // Centraliza o conteúdo na tela
        child: Container( // Container para agrupar o conteúdo
          padding: const EdgeInsets.all(20), // Define o padding interno do container
          width: 350, // Define a largura do container
          decoration: BoxDecoration( // Define a decoração do container
            color: Colors.white, // Cor de fundo do container
            borderRadius: BorderRadius.circular(10), // Bordas arredondadas
            boxShadow: [ // Sombra para dar um efeito de profundidade
              BoxShadow(
                color: Colors.black.withOpacity(0.1), // Cor da sombra com opacidade
                blurRadius: 10, // Raio de desfoque da sombra
                spreadRadius: 4, // Espalhamento da sombra
              ),
            ],
          ),
          child: Column( // Organiza os filhos verticalmente
            mainAxisSize: MainAxisSize.min, // Tamanho mínimo para a coluna
            children: [
              const Text( // Título da tela
                'Crie sua conta',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 20), // Espaçamento entre o título e o próximo campo
              _buildInputField('Nome Completo', Icons.person), // Campo para o nome
              _buildInputField('Usuário', Icons.person), // Campo para o usuário
              _buildInputField('E-mail', Icons.email), // Campo para o e-mail
              _buildInputField('Criar senha', Icons.lock, obscureText: true), // Campo para senha
              _buildInputField('Confirmar senha', Icons.lock, obscureText: true), // Campo para confirmar senha
              const SizedBox(height: 10), // Espaçamento entre os campos e o checkbox
              Row( // Organiza o checkbox e o texto horizontalmente
                children: [
                  Checkbox(value: false, onChanged: (value) {}), // Checkbox para aceitar os termos
                  const Expanded( // Expande o texto para o restante da linha
                    child: Text(
                      'Estou de acordo com os termos do aplicativo',
                      style: TextStyle(fontSize: 12),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10), // Espaçamento entre o checkbox e o botão
              ElevatedButton( // Botão para criar a conta
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.yellow, // Cor do fundo do botão
                  shape: RoundedRectangleBorder( // Formato arredondado do botão
                    borderRadius: BorderRadius.circular(5),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 50), // Padding do botão
                ),
                onPressed: () {}, // Função a ser chamada quando o botão for pressionado
                child: const Text( // Texto do botão
                  'Criar conta',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 10), // Espaçamento entre o botão e o link
              TextButton( // Botão de texto para já ter uma conta
                onPressed: () {
                  Navigator.pop(context); // Volta para a tela de login
                },
                child: const Text(
                  'Já possuo uma conta',
                  style: TextStyle(color: Colors.blue, fontSize: 14),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInputField(String label, IconData icon, {bool obscureText = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15), // Espaçamento inferior entre os campos
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, // Alinha os itens à esquerda
        children: [
          Text( // Exibe o rótulo do campo
            label,
            style: const TextStyle(fontSize: 14),
          ),
          const SizedBox(height: 5), // Espaçamento entre o rótulo e o campo
          TextField( // Campo de entrada de texto
            obscureText: obscureText, // Define se o texto será oculto (para senhas)
            decoration: InputDecoration( // Decoração do campo de texto
              prefixIcon: Icon(icon, color: Colors.grey), // Ícone dentro do campo
              border: OutlineInputBorder( // Borda arredondada do campo
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
