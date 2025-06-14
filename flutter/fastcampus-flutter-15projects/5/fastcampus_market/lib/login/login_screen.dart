import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_sign_in/google_sign_in.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController emailTextController = TextEditingController();
  TextEditingController passwordTextController = TextEditingController();

  Future<UserCredential?> login(String email, String password) async {
    try {
      final credential = await FirebaseAuth.instance
          .signInWithEmailAndPassword(email: email, password: password);
      return credential;
    } on FirebaseAuthException catch (e) {
      if (e.code == 'user-not-found') {
        print(e.toString());
      } else if (e.code == 'wrong-password') {
        print(e.toString());
      }
    } catch (e) {
      print(e.toString());
    }
    return null;
  }

  Future<UserCredential?> signInWithGoogle() async {
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
    final GoogleSignInAuthentication? googleAuth =
        await googleUser?.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,
    );
    return await FirebaseAuth.instance.signInWithCredential(credential);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(48),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset('assets/fastcampus_logo.png'),
              const Text(
                '패캠 마트',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 42,
                ),
              ),
              const SizedBox(height: 64),
              Form(
                key: _formKey,
                child: Column(
                  children: [
                    TextFormField(
                      controller: emailTextController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: '이메일',
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return '이메일 주소를 입력하세요.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 24),
                    TextFormField(
                      controller: passwordTextController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: '비밀번호',
                      ),
                      obscureText: true,
                      keyboardType: TextInputType.visiblePassword,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return '비밀번호를 입력하세요.';
                        }
                        return null;
                      },
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 16),
                child: MaterialButton(
                  onPressed: () async {
                    if (_formKey.currentState!.validate()) {
                      _formKey.currentState!.save();
                      final result = await login(
                        emailTextController.text.trim(),
                        passwordTextController.text.trim(),
                      );
                      if (result == null) {
                        if (context.mounted) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('로그인 실패')),
                          );
                        }
                        return;
                      }
                      if (context.mounted) {
                        context.go('/');
                      }
                    }
                  },
                  height: 48,
                  minWidth: double.infinity,
                  color: Colors.red,
                  child: const Text(
                    '로그인',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                    ),
                  ),
                ),
              ),
              TextButton(
                onPressed: () => context.push('/sign_up'),
                child: const Text('계정이 없나요? 회원가입'),
              ),
              const Divider(),
              InkWell(
                onTap: () async {
                  final userCredit = await signInWithGoogle();
                },
                child: Image.asset('assets/btn_google_signin.png'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
