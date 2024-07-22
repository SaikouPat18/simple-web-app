import React, { useState, useCallback } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles';
import { successToast } from '../services/toastService';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response =  await login(email, password);
      successToast(response.data.user.name);
      navigate('/user-details');
    } catch (error) {
      console.error('Failed to login', error);
    } finally {
      setLoading(false);
    }
  }, [email, password, navigate]);

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={styles.card}
      >
        <h2 className={styles.heading}>Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className={styles.input_label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className={styles.input_label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          className={styles.button_login}
          disabled={loading}
        >
          {loading ? (
            <div className={styles.spinner}>
              <div className={styles.spinnerIcon}></div>
            </div>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
