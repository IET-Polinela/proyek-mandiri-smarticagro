import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../constants/app_constants.dart' hide AppColors;
import '../widgets/responsive_widgets.dart';
import '../utils/responsive_utils.dart';
import '../utils/app_theme.dart';
import 'register_page.dart';
import 'forgot_password_page.dart';
import 'dashboard_page.dart';

/// Halaman Login - 100% Responsif
///
/// BREAKPOINT BEHAVIOR:
/// - < 360px (Small Phone): Font lebih kecil, padding minimal, icon dikecilkan
/// - 360-480px (Medium Phone): Default styling
/// - 480-600px (Large Phone): Sedikit lebih besar
/// - >= 600px (Tablet): Max width content 500px, centered
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _authService = AuthService();
  bool _isLoading = false;
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    final result = await _authService.login(
      _emailController.text.trim(),
      _passwordController.text,
    );

    setState(() => _isLoading = false);

    if (!mounted) return;

    if (result['success']) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const DashboardPage()),
      );
    } else {
      _showSnackBar(result['message'], isError: true);
    }
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? AppColors.error : AppColors.success,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GradientScaffold(
      body: LayoutBuilder(
        builder: (context, constraints) {
          final responsive = context.responsive;

          return SingleChildScrollView(
            physics: const ClampingScrollPhysics(),
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minHeight: constraints.maxHeight,
              ),
              child: IntrinsicHeight(
                child: ResponsiveContainer(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Spacer(flex: 1),
                      _buildHeader(responsive),
                      SizedBox(height: responsive.spacing(32)),
                      _buildForm(responsive),
                      const Spacer(flex: 2),
                      _buildRegisterLink(responsive),
                      SizedBox(height: responsive.spacing(16)),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildHeader(ResponsiveUtils responsive) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(
          Icons.agriculture,
          size: responsive.iconSize(70),
          color: Colors.white,
        ),
        SizedBox(height: responsive.spacing(12)),
        FittedBox(
          fit: BoxFit.scaleDown,
          child: Text(
            'Smart Crop Prediction',
            style: AppTextStyles.heading1(context, color: Colors.white),
            textAlign: TextAlign.center,
          ),
        ),
        SizedBox(height: responsive.spacing(6)),
        Text(
          'Login untuk melanjutkan',
          style: AppTextStyles.body(context, color: Colors.white70),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildForm(ResponsiveUtils responsive) {
    return Form(
      key: _formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ResponsiveTextField(
            controller: _emailController,
            labelText: 'Email',
            prefixIcon: Icons.email,
            keyboardType: TextInputType.emailAddress,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Email harus diisi';
              }
              if (!value.contains('@')) {
                return 'Format email tidak valid';
              }
              return null;
            },
          ),
          SizedBox(height: responsive.spacing(12)),
          ResponsiveTextField(
            controller: _passwordController,
            labelText: 'Password',
            prefixIcon: Icons.lock,
            obscureText: _obscurePassword,
            suffixIcon: IconButton(
              icon: Icon(
                _obscurePassword ? Icons.visibility_off : Icons.visibility,
                color: Colors.white70,
                size: responsive.iconSize(20),
              ),
              onPressed: () {
                setState(() => _obscurePassword = !_obscurePassword);
              },
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Password harus diisi';
              }
              return null;
            },
          ),
          Align(
            alignment: Alignment.centerRight,
            child: TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const ForgotPasswordPage()),
                );
              },
              style: TextButton.styleFrom(
                padding: EdgeInsets.symmetric(
                  vertical: responsive.spacing(8),
                  horizontal: responsive.spacing(4),
                ),
              ),
              child: Text(
                'Lupa Password?',
                style: AppTextStyles.bodySmall(context, color: Colors.white),
              ),
            ),
          ),
          SizedBox(height: responsive.spacing(16)),
          ResponsiveButton(
            onPressed: _login,
            text: 'Login',
            isLoading: _isLoading,
          ),
        ],
      ),
    );
  }

  Widget _buildRegisterLink(ResponsiveUtils responsive) {
    return Wrap(
      alignment: WrapAlignment.center,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        Text(
          'Belum punya akun? ',
          style: AppTextStyles.bodySmall(context, color: Colors.white70),
        ),
        TextButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const RegisterPage()),
            );
          },
          style: TextButton.styleFrom(
            padding: EdgeInsets.symmetric(
              horizontal: responsive.spacing(8),
              vertical: responsive.spacing(4),
            ),
            minimumSize: Size.zero,
            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          ),
          child: Text(
            'Daftar',
            style: AppTextStyles.body(context, color: Colors.white)
                .copyWith(fontWeight: FontWeight.bold),
          ),
        ),
      ],
    );
  }
}
