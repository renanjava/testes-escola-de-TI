import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class AuthService {
  final String _baseUrl = 'http://localhost:3000/auth'; // URL backend
  final FlutterSecureStorage _storage = FlutterSecureStorage(); // Armazenar token JWT

    Future<String?> login(String username, String password) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );


  // print('Status Code: ${response.statusCode}'); // Log do status code
  print('Response Body: ${response.body}'); // Log do corpo da resposta

    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = jsonDecode(response.body);
      final String token = responseData['access_token'];
      await _storage.write(key: 'jwt_token', value: token);
      return token;
    } else {
      throw Exception('Falha no login: ${response.body}');
    }
  }

  Future<void> register(String realname, String username, String email, String password) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'realname': realname,
        'username': username,
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Falha no registro');
    }
  }

  Future<String?> getToken() async {
    return await _storage.read(key: 'jwt_token');
  }

  Future<void> logout() async {
    await _storage.delete(key: 'jwt_token');
  }
}