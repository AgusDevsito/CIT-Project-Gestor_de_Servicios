import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const PRIMARY = '#0F4C81';
const SECONDARY = '#1F7AE0';
const SURFACE = '#F5F8FC';
const MUTED = '#64748B';
const BORDER = '#D9E3F0';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const welcomeName = useMemo(() => {
    if (!username.trim()) return 'Usuario';
    return username.trim();
  }, [username]);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError('Ingresá usuario y contraseña para continuar.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
      setScreen('welcome');
    }, 700);
  };

  const handleRegister = () => {
    if (!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !password.trim()) {
      setError('Completá todos los campos obligatorios.');
      return;
    }

    if (role === 'cit' && !document.trim()) {
      setError('Los trabajadores del CIT deben adjuntar un documento.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
      setScreen('welcome');
      setUsername(username.trim());
    }, 700);
  };

  const resetAuth = () => {
    setIsLoggedIn(false);
    setScreen('login');
    setPassword('');
    setError('');
  };

  const renderLoginScreen = () => (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.loginContainer}>
          <View style={styles.logoWrap}>
            <Text style={styles.logo}>CIT</Text>
          </View>

          <Text style={styles.title}>Iniciar sesión</Text>
          <Text style={styles.subtitle}>Accedé a tu panel de gestión</Text>

          <View style={styles.formCard}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Usuario"
              placeholderTextColor={MUTED}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Contraseña"
              placeholderTextColor={MUTED}
              secureTextEntry
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Pressable
              style={[styles.primaryButton, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Ingresar</Text>}
            </Pressable>

            <Pressable style={styles.secondaryButton} onPress={() => { setError(''); setScreen('register'); }}>
              <Text style={styles.secondaryButtonText}>Crear cuenta</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderRegisterScreen = () => (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.registerContainer}>
          <Text style={styles.title}>Registrarse</Text>
          <Text style={styles.subtitle}>Creá tu cuenta en CIT</Text>

          <View style={styles.formCard}>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Nombre"
              placeholderTextColor={MUTED}
            />

            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Apellido"
              placeholderTextColor={MUTED}
            />

            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Usuario"
              placeholderTextColor={MUTED}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={MUTED}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Contraseña"
              placeholderTextColor={MUTED}
              secureTextEntry
            />

            <Text style={styles.roleLabel}>Rol</Text>
            <View style={styles.roleRow}>
              <Pressable
                style={[styles.roleOption, role === 'user' && styles.roleOptionSelected]}
                onPress={() => setRole('user')}
              >
                <Text style={[styles.roleOptionText, role === 'user' && styles.roleOptionTextSelected]}>Usuario</Text>
              </Pressable>

              <Pressable
                style={[styles.roleOption, role === 'cit' && styles.roleOptionSelected]}
                onPress={() => setRole('cit')}
              >
                <Text style={[styles.roleOptionText, role === 'cit' && styles.roleOptionTextSelected]}>CIT</Text>
              </Pressable>
            </View>

            {role === 'cit' ? (
              <>
                <TextInput
                  style={styles.input}
                  value={document}
                  onChangeText={setDocument}
                  placeholder="Nombre del documento o adjunto"
                  placeholderTextColor={MUTED}
                />
                <Text style={styles.helperText}>Si sos trabajador del CIT, se exige documento.</Text>
              </>
            ) : null}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Pressable style={[styles.primaryButton, loading && styles.buttonDisabled]} onPress={handleRegister} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Registrarme</Text>}
            </Pressable>

            <Pressable style={styles.linkButton} onPress={() => { setError(''); setScreen('login'); }}>
              <Text style={styles.linkButtonText}>Ya tengo cuenta</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderWelcomeScreen = () => (
    <View style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.welcomeContainer}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>CIT Formosa</Text>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.userName}>{welcomeName}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Panel rápido</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Tareas</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Alertas</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={resetAuth}>
          <Text style={styles.primaryButtonText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </View>
  );

  if (screen === 'register') return renderRegisterScreen();
  if (screen === 'welcome' || isLoggedIn) return renderWelcomeScreen();
  return renderLoginScreen();
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF3FF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  logoWrap: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  logo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#10233F',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: MUTED,
    marginBottom: 22,
  },
  formCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#0F4C81',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: SURFACE,
    paddingHorizontal: 14,
    marginBottom: 14,
    color: '#0F172A',
    fontSize: 16,
  },
  roleLabel: {
    fontSize: 14,
    color: MUTED,
    fontWeight: '600',
    marginBottom: 10,
  },
  roleRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 10,
  },
  roleOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: SURFACE,
    alignItems: 'center',
  },
  roleOptionSelected: {
    backgroundColor: '#EAF3FF',
    borderColor: PRIMARY,
  },
  roleOptionText: {
    color: '#334155',
    fontWeight: '700',
  },
  roleOptionTextSelected: {
    color: PRIMARY,
  },
  helperText: {
    fontSize: 12,
    color: MUTED,
    marginBottom: 14,
  },
  errorText: {
    color: '#D92D20',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  primaryButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  secondaryButton: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: PRIMARY,
    fontWeight: '700',
    fontSize: 15,
  },
  linkButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkButtonText: {
    color: PRIMARY,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingHorizontal: 20,
    paddingTop: 72,
    paddingBottom: 28,
  },
  headerCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 22,
    padding: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  eyebrow: {
    fontSize: 12,
    color: '#DCEAFF',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
    fontWeight: '700',
  },
  userName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: '#10233F',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F3F8FF',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: SECONDARY,
  },
  statLabel: {
    fontSize: 13,
    color: MUTED,
    marginTop: 4,
  },
});
