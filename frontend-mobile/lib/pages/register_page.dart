import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../constants/app_constants.dart' hide AppColors;
import '../widgets/responsive_widgets.dart';
import '../utils/responsive_utils.dart';
import '../utils/app_theme.dart';
import 'dashboard_page.dart';

/// Halaman Register - 100% Responsif
class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _authService = AuthService();
  bool _isLoading = false;
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;

  @override
  void dispose() {
    _usernameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    final result = await _authService.register(
      _usernameController.text.trim(),
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
              constraints: BoxConstraints(minHeight: constraints.maxHeight),
              child: IntrinsicHeight(
                child: ResponsiveContainer(
                  child: Column(
                    children: [
                      _buildBackButton(responsive),
                      const Spacer(flex: 1),
                      _buildHeader(responsive),
                      SizedBox(height: responsive.spacing(24)),
                      _buildForm(responsive),
                      const Spacer(flex: 2),
                      _buildLoginLink(responsive),
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

  Widget _buildBackButton(ResponsiveUtils responsive) {
    return Align(
      alignment: Alignment.centerLeft,
      child: IconButton(
        onPressed: () => Navigator.pop(context),
        icon: Icon(
          Icons.arrow_back_ios,
          color: Colors.white,
          size: responsive.iconSize(20),
        ),
      ),
    );
  }

  Widget _buildHeader(ResponsiveUtils responsive) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.person_add,
            size: responsive.iconSize(60), color: Colors.white),
        SizedBox(height: responsive.spacing(12)),
        FittedBox(
          fit: BoxFit.scaleDown,
          child: Text(
            'Daftar Akun Baru',
            style: AppTextStyles.heading1(context, color: Colors.white),
          ),
        ),
        SizedBox(height: responsive.spacing(6)),
        Text(
          'Buat akun untuk mulai menggunakan',
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
        children: [
          ResponsiveTextField(
            controller: _usernameController,
            labelText: 'Username',
            prefixIcon: Icons.person,
            validator: (v) => v!.isEmpty
                ? 'Username harus diisi'
                : (v.length < 3 ? 'Minimal 3 karakter' : null),
          ),
          SizedBox(height: responsive.spacing(12)),
          ResponsiveTextField(
            controller: _emailController,
            labelText: 'Email',
            prefixIcon: Icons.email,
            keyboardType: TextInputType.emailAddress,
            validator: (v) => v!.isEmpty
                ? 'Email harus diisi'
                : (!v.contains('@') ? 'Format email tidak valid' : null),
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
                  size: responsive.iconSize(20)),
              onPressed: () =>
                  setState(() => _obscurePassword = !_obscurePassword),
            ),
            validator: (v) => v!.isEmpty
                ? 'Password harus diisi'
                : (v.length < 6 ? 'Minimal 6 karakter' : null),
          ),
          SizedBox(height: responsive.spacing(12)),
          ResponsiveTextField(
            controller: _confirmPasswordController,
            labelText: 'Konfirmasi Password',
            prefixIcon: Icons.lock_outline,
            obscureText: _obscureConfirmPassword,
            suffixIcon: IconButton(
              icon: Icon(
                  _obscureConfirmPassword
                      ? Icons.visibility_off
                      : Icons.visibility,
                  color: Colors.white70,
                  size: responsive.iconSize(20)),
              onPressed: () => setState(
                  () => _obscureConfirmPassword = !_obscureConfirmPassword),
            ),
            validator: (v) =>
                v != _passwordController.text ? 'Password tidak cocok' : null,
          ),
          SizedBox(height: responsive.spacing(24)),
          ResponsiveButton(
              onPressed: _register, text: 'Daftar', isLoading: _isLoading),
        ],
      ),
    );
  }

  Widget _buildLoginLink(ResponsiveUtils responsive) {
    return Wrap(
      alignment: WrapAlignment.center,
      children: [
        Text('Sudah punya akun? ',
            style: AppTextStyles.bodySmall(context, color: Colors.white70)),
        TextButton(
          onPressed: () => Navigator.pop(context),
          style: TextButton.styleFrom(
              padding: EdgeInsets.symmetric(
                  horizontal: responsive.spacing(8),
                  vertical: responsive.spacing(4)),
              minimumSize: Size.zero),
          child: Text('Login',
              style: AppTextStyles.body(context, color: Colors.white)
                  .copyWith(fontWeight: FontWeight.bold)),
        ),
      ],
    );
  }
}
