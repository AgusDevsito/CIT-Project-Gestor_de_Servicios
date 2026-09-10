import {useState} from 'react';
import {loginUser, LoginUser} from '../../services/authService';

export const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
    
        try{
            const data = await loginUser {email,password};
    
        } catch {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={styles.container}>
          <div style={styles.card}>
            <h2 style={styles.title}>CITio - Iniciar Sesión</h2>
            <p style={styles.subtitle}>Plataforma de Servicios y Proyectos</p>
    
            {/* Renderizado condicional del mensaje de error */}
            {error && <div style={styles.errorAlert}>{error}</div>}
    
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Correo Electrónico:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  style={styles.input}
                />
              </div>
    
              <div style={styles.inputGroup}>
                <label style={styles.label}>Contraseña:</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={styles.input}
                />
              </div>
    
              <button 
                type="submit" 
                disabled={loading} 
                style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
              >
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
              </button>
            </form>
          </div>
        </div>
      );
    };
    const styles = {
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        fontFamily: 'Arial, sans-serif'
      },
      card: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      },
      title: { margin: '0 0 0.5rem 0', color: '#1a365d', textAlign: 'center' },
      subtitle: { margin: '0 0 1.5rem 0', color: '#718096', textAlign: 'center', fontSize: '0.9rem' },
      errorAlert: {
        backgroundColor: '#fed7d7',
        color: '#9b2c2c',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem',
        fontSize: '0.875rem'
      },
      form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
      inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
      label: { fontSize: '0.875rem', color: '#2d3748', fontWeight: 'bold' },
      input: {
        padding: '0.6rem',
        borderRadius: '4px',
        border: '1px solid #cbd5e0',
        fontSize: '1rem'
      },
      button: {
        padding: '0.75rem',
        backgroundColor: '#2b6cb0',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '0.5rem'
      },
      buttonDisabled: {
        backgroundColor: '#a0aec0',
        cursor: 'not-allowed'
      }
    };
