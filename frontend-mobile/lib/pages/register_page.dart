// ============================================
// FILE: lib/pages/register_page.dart
// ============================================
import 'dart:ui';
import 'dart:math';
import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../constants/app_constants.dart' hide AppColors;
import '../widgets/responsive_widgets.dart';
import '../utils/responsive_utils.dart';
import '../utils/app_theme.dart';
import 'dashboard_page.dart';

/// Halaman Register - 100% Responsif dengan Desain Premium
class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage>
    with TickerProviderStateMixin {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _authService = AuthService();
  bool _isLoading = false;
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;

  // Animation Controllers
  late AnimationController _fadeController;
  late AnimationController _slideController;
  late AnimationController _backgroundController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _initAnimations();
  }

  void _initAnimations() {
    _fadeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );
    _slideController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    );
    _backgroundController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 20),
    )..repeat();

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _fadeController, curve: Curves.easeOut),
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(parent: _slideController, curve: Curves.easeOutCubic),
    );

    _fadeController.forward();
    _slideController.forward();
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _fadeController.dispose();
    _slideController.dispose();
    _backgroundController.dispose();
    super.dispose();
  }

  // ===== FUNGSI YANG TIDAK DIUBAH =====
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
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
              size: 20,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                message,
                style: const TextStyle(fontWeight: FontWeight.w500),
              ),
            ),
          ],
        ),
        backgroundColor:
            isError ? const Color(0xFFE53935) : const Color(0xFF43A047),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        margin: const EdgeInsets.all(16),
        elevation: 8,
      ),
    );
  }
  // ===== END FUNGSI YANG TIDAK DIUBAH =====

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Animated Background
          _buildAnimatedBackground(),
          // Decorative Elements
          _buildDecorativeElements(),
          // Main Content
          SafeArea(
            child: LayoutBuilder(
              builder: (context, constraints) {
                final responsive = context.responsive;
                final isTablet = constraints.maxWidth >= 600;

                return SingleChildScrollView(
                  physics: const BouncingScrollPhysics(),
                  child: ConstrainedBox(
                    constraints: BoxConstraints(
                      minHeight: constraints.maxHeight,
                    ),
                    child: IntrinsicHeight(
                      child: Padding(
                        padding: EdgeInsets.symmetric(
                          horizontal: isTablet ? 48 : 24,
                          vertical: 16,
                        ),
                        child: FadeTransition(
                          opacity: _fadeAnimation,
                          child: SlideTransition(
                            position: _slideAnimation,
                            child: Column(
                              children: [
                                _buildBackButton(responsive),
                                Center(
                                  child: ConstrainedBox(
                                    constraints: BoxConstraints(
                                      maxWidth:
                                          isTablet ? 450 : double.infinity,
                                    ),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        SizedBox(
                                            height: responsive.spacing(16)),
                                        _buildHeader(responsive),
                                        SizedBox(
                                            height: responsive.spacing(32)),
                                        _buildGlassCard(responsive),
                                        SizedBox(
                                            height: responsive.spacing(24)),
                                        _buildLoginLink(responsive),
                                        SizedBox(
                                            height: responsive.spacing(16)),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAnimatedBackground() {
    return AnimatedBuilder(
      animation: _backgroundController,
      builder: (context, child) {
        return Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Color(0xFF0A2E12),
                Color(0xFF1B5E20),
                Color(0xFF2E7D32),
                Color(0xFF1B5E20),
              ],
              stops: [0.0, 0.3, 0.7, 1.0],
            ),
          ),
          child: CustomPaint(
            painter: _BubblePainter(_backgroundController.value),
            size: Size.infinite,
          ),
        );
      },
    );
  }

  Widget _buildDecorativeElements() {
    return Stack(
      children: [
        Positioned(
          top: -100,
          left: -100,
          child: Container(
            width: 300,
            height: 300,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: RadialGradient(
                colors: [
                  const Color(0xFF4CAF50).withValues(alpha: 0.3),
                  Colors.transparent,
                ],
              ),
            ),
          ),
        ),
        Positioned(
          bottom: -150,
          right: -100,
          child: Container(
            width: 350,
            height: 350,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: RadialGradient(
                colors: [
                  const Color(0xFF81C784).withValues(alpha: 0.2),
                  Colors.transparent,
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildBackButton(ResponsiveUtils responsive) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Colors.white.withValues(alpha: 0.2),
            width: 1,
          ),
        ),
        child: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(
            Icons.arrow_back_ios_new_rounded,
            color: Colors.white,
            size: responsive.iconSize(20),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(ResponsiveUtils responsive) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Animated Icon Container
        Container(
          width: responsive.iconSize(80),
          height: responsive.iconSize(80),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Color(0xFF81C784),
                Color(0xFF4CAF50),
                Color(0xFF2E7D32),
              ],
            ),
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF4CAF50).withValues(alpha: 0.4),
                blurRadius: 25,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: Icon(
            Icons.person_add_rounded,
            size: responsive.iconSize(40),
            color: Colors.white,
          ),
        ),
        SizedBox(height: responsive.spacing(20)),
        // Title with Gradient
        ShaderMask(
          shaderCallback: (bounds) => const LinearGradient(
            colors: [Colors.white, Color(0xFFA5D6A7)],
          ).createShader(bounds),
          child: FittedBox(
            fit: BoxFit.scaleDown,
            child: Text(
              'Daftar Akun Baru',
              style: TextStyle(
                fontSize: responsive.fontSize(32),
                fontWeight: FontWeight.bold,
                color: Colors.white,
                letterSpacing: -0.5,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ),
        SizedBox(height: responsive.spacing(8)),
        Text(
          'Buat akun untuk mulai menggunakan',
          style: TextStyle(
            fontSize: responsive.fontSize(14),
            color: Colors.white.withValues(alpha: 0.7),
            letterSpacing: 0.3,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildGlassCard(ResponsiveUtils responsive) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(28),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          padding: EdgeInsets.all(responsive.spacing(28)),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(28),
            border: Border.all(
              color: Colors.white.withValues(alpha: 0.2),
              width: 1.5,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.1),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: _buildForm(responsive),
        ),
      ),
    );
  }

  Widget _buildForm(ResponsiveUtils responsive) {
    return Form(
      key: _formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Username Field
          _buildTextField(
            controller: _usernameController,
            label: 'Username',
            hint: 'Masukkan username',
            icon: Icons.person_outline,
            responsive: responsive,
            validator: (v) => v!.isEmpty
                ? 'Username harus diisi'
                : (v.length < 3 ? 'Minimal 3 karakter' : null),
          ),
          SizedBox(height: responsive.spacing(16)),

          // Email Field
          _buildTextField(
            controller: _emailController,
            label: 'Email',
            hint: 'contoh@email.com',
            icon: Icons.email_outlined,
            keyboardType: TextInputType.emailAddress,
            responsive: responsive,
            validator: (v) => v!.isEmpty
                ? 'Email harus diisi'
                : (!v.contains('@') ? 'Format email tidak valid' : null),
          ),
          SizedBox(height: responsive.spacing(16)),

          // Password Field
          _buildTextField(
            controller: _passwordController,
            label: 'Password',
            hint: '********',
            icon: Icons.lock_outline,
            obscureText: _obscurePassword,
            responsive: responsive,
            suffixIcon: IconButton(
              icon: Icon(
                _obscurePassword
                    ? Icons.visibility_off_outlined
                    : Icons.visibility_outlined,
                color: Colors.white60,
                size: responsive.iconSize(22),
              ),
              onPressed: () =>
                  setState(() => _obscurePassword = !_obscurePassword),
            ),
            validator: (v) => v!.isEmpty
                ? 'Password harus diisi'
                : (v.length < 6 ? 'Minimal 6 karakter' : null),
          ),
          SizedBox(height: responsive.spacing(16)),

          // Confirm Password Field
          _buildTextField(
            controller: _confirmPasswordController,
            label: 'Konfirmasi Password',
            hint: '********',
            icon: Icons.lock_person_outlined,
            obscureText: _obscureConfirmPassword,
            responsive: responsive,
            suffixIcon: IconButton(
              icon: Icon(
                _obscureConfirmPassword
                    ? Icons.visibility_off_outlined
                    : Icons.visibility_outlined,
                color: Colors.white60,
                size: responsive.iconSize(22),
              ),
              onPressed: () => setState(
                  () => _obscureConfirmPassword = !_obscureConfirmPassword),
            ),
            validator: (v) =>
                v != _passwordController.text ? 'Password tidak cocok' : null,
          ),
          SizedBox(height: responsive.spacing(28)),

          // Register Button
          _buildRegisterButton(responsive),
        ],
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required String hint,
    required IconData icon,
    required ResponsiveUtils responsive,
    TextInputType keyboardType = TextInputType.text,
    bool obscureText = false,
    Widget? suffixIcon,
    String? Function(String?)? validator,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: responsive.fontSize(14),
            fontWeight: FontWeight.w500,
            color: Colors.white,
            letterSpacing: 0.3,
          ),
        ),
        SizedBox(height: responsive.spacing(8)),
        TextFormField(
          controller: controller,
          obscureText: obscureText,
          keyboardType: keyboardType,
          validator: validator,
          style: TextStyle(
            color: Colors.white,
            fontSize: responsive.fontSize(16),
          ),
          cursorColor: const Color(0xFFA5D6A7),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: TextStyle(
              color: Colors.white.withValues(alpha: 0.4),
              fontSize: responsive.fontSize(15),
            ),
            prefixIcon: Container(
              margin: const EdgeInsets.only(left: 16, right: 12),
              child: Icon(
                icon,
                color: Colors.white.withValues(alpha: 0.7),
                size: responsive.iconSize(22),
              ),
            ),
            prefixIconConstraints: const BoxConstraints(
              minWidth: 50,
              minHeight: 50,
            ),
            suffixIcon: suffixIcon,
            filled: true,
            fillColor: Colors.white.withValues(alpha: 0.1),
            contentPadding: EdgeInsets.symmetric(
              horizontal: responsive.spacing(20),
              vertical: responsive.spacing(16),
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide.none,
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(
                color: Colors.white.withValues(alpha: 0.2),
                width: 1,
              ),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(
                color: Color(0xFFA5D6A7),
                width: 2,
              ),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(
                color: Color(0xFFE53935),
                width: 1,
              ),
            ),
            focusedErrorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(
                color: Color(0xFFE53935),
                width: 2,
              ),
            ),
            errorStyle: TextStyle(
              color: const Color(0xFFFF8A80),
              fontSize: responsive.fontSize(12),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildRegisterButton(ResponsiveUtils responsive) {
    return GestureDetector(
      onTap: _isLoading ? null : _register,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        height: responsive.spacing(56),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF66BB6A),
              Color(0xFF43A047),
              Color(0xFF2E7D32),
            ],
          ),
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFF4CAF50).withValues(alpha: 0.4),
              blurRadius: 20,
              offset: const Offset(0, 8),
            ),
          ],
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: _isLoading ? null : _register,
            borderRadius: BorderRadius.circular(16),
            child: Center(
              child: _isLoading
                  ? SizedBox(
                      width: responsive.iconSize(24),
                      height: responsive.iconSize(24),
                      child: const CircularProgressIndicator(
                        strokeWidth: 2.5,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    )
                  : Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.how_to_reg_rounded,
                          color: Colors.white,
                          size: responsive.iconSize(22),
                        ),
                        SizedBox(width: responsive.spacing(10)),
                        Text(
                          'Daftar',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: responsive.fontSize(17),
                            fontWeight: FontWeight.w600,
                            letterSpacing: 0.5,
                          ),
                        ),
                      ],
                    ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLoginLink(ResponsiveUtils responsive) {
    return Wrap(
      alignment: WrapAlignment.center,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        Text(
          'Sudah punya akun? ',
          style: TextStyle(
            fontSize: responsive.fontSize(15),
            color: Colors.white70,
          ),
        ),
        TextButton(
          onPressed: () => Navigator.pop(context),
          style: TextButton.styleFrom(
            padding: EdgeInsets.symmetric(
              horizontal: responsive.spacing(8),
              vertical: responsive.spacing(4),
            ),
            minimumSize: Size.zero,
            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          ),
          child: Text(
            'Login',
            style: TextStyle(
              fontSize: responsive.fontSize(15),
              color: const Color(0xFFA5D6A7),
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }
}

// Bubble Painter for Animated Background
class _BubblePainter extends CustomPainter {
  final double animation;
  final List<_Bubble> bubbles;

  _BubblePainter(this.animation)
      : bubbles = List.generate(15, (index) => _Bubble.random(index));

  @override
  void paint(Canvas canvas, Size size) {
    for (var bubble in bubbles) {
      final y = (bubble.startY + animation * bubble.speed) % 1.2 - 0.1;
      final paint = Paint()
        ..color = Colors.white.withValues(alpha: bubble.opacity)
        ..style = PaintingStyle.fill;

      canvas.drawCircle(
        Offset(bubble.x * size.width, y * size.height),
        bubble.radius,
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

class _Bubble {
  final double x;
  final double startY;
  final double radius;
  final double speed;
  final double opacity;

  _Bubble({
    required this.x,
    required this.startY,
    required this.radius,
    required this.speed,
    required this.opacity,
  });

  factory _Bubble.random(int seed) {
    final random = Random(seed);
    return _Bubble(
      x: random.nextDouble(),
      startY: random.nextDouble(),
      radius: random.nextDouble() * 25 + 8,
      speed: random.nextDouble() * 0.4 + 0.1,
      opacity: random.nextDouble() * 0.12 + 0.03,
    );
  }
}
