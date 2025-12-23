import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../constants/app_constants.dart' hide AppColors;
import '../widgets/responsive_widgets.dart';
import '../utils/responsive_utils.dart';
import '../utils/app_theme.dart';

/// Halaman Forgot Password - 100% Responsif dengan Multi-step
class ForgotPasswordPage extends StatefulWidget {
  const ForgotPasswordPage({super.key});

  @override
  State<ForgotPasswordPage> createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final _authService = AuthService();
  final _emailController = TextEditingController();
  final _codeController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  int _currentStep = 0;
  bool _isLoading = false;
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;
  String _email = '';

  @override
  void dispose() {
    _emailController.dispose();
    _codeController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? AppColors.error : AppColors.success,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }

  Future<void> _requestCode() async {
    final email = _emailController.text.trim();
    if (email.isEmpty || !email.contains('@')) {
      _showSnackBar('Masukkan email yang valid', isError: true);
      return;
    }
    setState(() => _isLoading = true);
    final result = await _authService.requestPasswordReset(email);
    setState(() => _isLoading = false);
    if (result['success']) {
      setState(() {
        _email = email;
        _currentStep = 1;
      });
      _showSnackBar('Kode verifikasi telah dikirim');
    } else {
      _showSnackBar(result['message'], isError: true);
    }
  }

  Future<void> _verifyCode() async {
    final code = _codeController.text.trim();
    if (code.length != 6) {
      _showSnackBar('Kode harus 6 digit', isError: true);
      return;
    }
    setState(() => _isLoading = true);
    final result = await _authService.verifyResetCode(_email, code);
    setState(() => _isLoading = false);
    if (result['success']) {
      setState(() => _currentStep = 2);
      _showSnackBar('Kode valid!');
    } else {
      _showSnackBar(result['message'], isError: true);
    }
  }

  Future<void> _resetPassword() async {
    final pass = _newPasswordController.text;
    final confirm = _confirmPasswordController.text;
    if (pass.length < 6) {
      _showSnackBar('Password minimal 6 karakter', isError: true);
      return;
    }
    if (pass != confirm) {
      _showSnackBar('Password tidak cocok', isError: true);
      return;
    }
    setState(() => _isLoading = true);
    final result = await _authService.resetPassword(
        _email, _codeController.text.trim(), pass);
    setState(() => _isLoading = false);
    if (result['success']) {
      _showSnackBar('Password berhasil direset!');
      await Future.delayed(const Duration(seconds: 1));
      if (mounted) Navigator.pop(context);
    } else {
      _showSnackBar(result['message'], isError: true);
    }
  }

  @override
  Widget build(BuildContext context) {
    final responsive = context.responsive;
    return Scaffold(
      appBar: AppBar(
        title: Text('Lupa Password',
            style: AppTextStyles.heading3(context, color: Colors.white)),
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: Container(
        decoration: BoxDecoration(gradient: AppColors.primaryGradient),
        child: SafeArea(
          child: LayoutBuilder(
            builder: (context, constraints) => SingleChildScrollView(
              physics: const ClampingScrollPhysics(),
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight),
                child: IntrinsicHeight(
                  child: ResponsiveContainer(
                    padding: EdgeInsets.all(responsive.horizontalPadding),
                    child: Column(
                      children: [
                        SizedBox(height: responsive.spacing(16)),
                        _buildStepIndicator(responsive),
                        SizedBox(height: responsive.spacing(32)),
                        Expanded(child: _buildContent(responsive)),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildStepIndicator(ResponsiveUtils responsive) {
    final labels = ['Email', 'Kode', 'Password'];
    final isSmall = responsive.isSmallPhone;
    return Row(
      children: List.generate(5, (i) {
        if (i.isOdd) {
          return Expanded(
              child: Container(
                  height: 2,
                  color: i < _currentStep * 2 ? Colors.white : Colors.white30));
        }
        final step = i ~/ 2;
        final isActive = step == _currentStep;
        final done = step < _currentStep;
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: isSmall ? 28 : 36,
              height: isSmall ? 28 : 36,
              decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: done || isActive ? Colors.white : Colors.white30),
              child: Center(
                child: done
                    ? Icon(Icons.check,
                        color: AppColors.primary, size: responsive.iconSize(14))
                    : Text('${step + 1}',
                        style: TextStyle(
                            color:
                                isActive ? AppColors.primary : Colors.white70,
                            fontWeight: FontWeight.bold,
                            fontSize: isSmall ? 11 : 13)),
              ),
            ),
            SizedBox(height: responsive.spacing(4)),
            Text(labels[step],
                style: TextStyle(
                    color: isActive ? Colors.white : Colors.white60,
                    fontSize: isSmall ? 9 : 11,
                    fontWeight:
                        isActive ? FontWeight.bold : FontWeight.normal)),
          ],
        );
      }),
    );
  }

  Widget _buildContent(ResponsiveUtils responsive) {
    switch (_currentStep) {
      case 0:
        return _emailStep(responsive);
      case 1:
        return _codeStep(responsive);
      default:
        return _passwordStep(responsive);
    }
  }

  Widget _emailStep(ResponsiveUtils responsive) => Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.email_outlined,
              size: responsive.iconSize(56), color: Colors.white),
          SizedBox(height: responsive.spacing(16)),
          FittedBox(
              fit: BoxFit.scaleDown,
              child: Text('Masukkan Email',
                  style: AppTextStyles.heading2(context, color: Colors.white))),
          SizedBox(height: responsive.spacing(8)),
          Text('Kami akan mengirim kode verifikasi',
              style: AppTextStyles.body(context, color: Colors.white70),
              textAlign: TextAlign.center),
          SizedBox(height: responsive.spacing(20)),
          ResponsiveTextField(
              controller: _emailController,
              labelText: 'Email',
              prefixIcon: Icons.email,
              keyboardType: TextInputType.emailAddress),
          SizedBox(height: responsive.spacing(16)),
          ResponsiveButton(
              onPressed: _requestCode,
              text: 'Kirim Kode',
              isLoading: _isLoading),
          const Spacer(),
        ],
      );

  Widget _codeStep(ResponsiveUtils responsive) => Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.security,
              size: responsive.iconSize(56), color: Colors.white),
          SizedBox(height: responsive.spacing(16)),
          FittedBox(
              fit: BoxFit.scaleDown,
              child: Text('Masukkan Kode',
                  style: AppTextStyles.heading2(context, color: Colors.white))),
          SizedBox(height: responsive.spacing(8)),
          Text('Kode dikirim ke $_email',
              style: AppTextStyles.body(context, color: Colors.white70),
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis),
          SizedBox(height: responsive.spacing(20)),
          ResponsiveTextField(
              controller: _codeController,
              labelText: '',
              keyboardType: TextInputType.number,
              maxLength: 6,
              textAlign: TextAlign.center,
              style: TextStyle(
                  color: Colors.white,
                  fontSize: responsive.fontSize(24),
                  fontWeight: FontWeight.bold,
                  letterSpacing: 8)),
          SizedBox(height: responsive.spacing(16)),
          ResponsiveButton(
              onPressed: _verifyCode,
              text: 'Verifikasi',
              isLoading: _isLoading),
          TextButton(
              onPressed: () => setState(() {
                    _currentStep = 0;
                    _codeController.clear();
                  }),
              child: Text('Kirim ulang',
                  style:
                      AppTextStyles.bodySmall(context, color: Colors.white))),
          const Spacer(),
        ],
      );

  Widget _passwordStep(ResponsiveUtils responsive) => Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.lock_reset,
              size: responsive.iconSize(56), color: Colors.white),
          SizedBox(height: responsive.spacing(16)),
          FittedBox(
              fit: BoxFit.scaleDown,
              child: Text('Password Baru',
                  style: AppTextStyles.heading2(context, color: Colors.white))),
          SizedBox(height: responsive.spacing(20)),
          ResponsiveTextField(
              controller: _newPasswordController,
              labelText: 'Password Baru',
              prefixIcon: Icons.lock,
              obscureText: _obscurePassword,
              suffixIcon: IconButton(
                  icon: Icon(
                      _obscurePassword
                          ? Icons.visibility_off
                          : Icons.visibility,
                      color: Colors.white70,
                      size: responsive.iconSize(20)),
                  onPressed: () =>
                      setState(() => _obscurePassword = !_obscurePassword))),
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
                  onPressed: () => setState(() =>
                      _obscureConfirmPassword = !_obscureConfirmPassword))),
          SizedBox(height: responsive.spacing(16)),
          ResponsiveButton(
              onPressed: _resetPassword,
              text: 'Reset Password',
              isLoading: _isLoading),
          const Spacer(),
        ],
      );
}
