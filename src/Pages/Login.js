import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();  // useNavigate hook

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        header: {
            background: '#333',
            color: '#fff',
            padding: '1rem 0',
            textAlign: 'center',
        },
        headerTitle: {
            fontSize: '2.5rem',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '2rem',
        },
        label: {
            fontWeight: 'bold',
            marginBottom: '5px',
        },
        input: {
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            width: '100%',
        },
        button: {
            padding: '10px 30px',
            background: '#ff5733',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.3s',
            textAlign: 'center',
        },
        buttonHover: {
            background: '#ff6f4f',
        },
        link: {
            textDecoration: 'none',
            color: '#ff5733',
            fontSize: '1rem',
            transition: 'color 0.3s',
        },
        linkHover: {
            color: '#ff6f4f',
        },
        backToHome: {
            textAlign: 'center',
            marginTop: '20px',
        },
        forgotPassword: {
            textAlign: 'center',
            fontSize: '0.9rem',
        },
        error: {
            color: 'red',
            textAlign: 'center',
            marginBottom: '20px',
        },
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch('https://backendapprication-8eeb6fd4c701.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('role', data.role);
                localStorage.setItem('allowedMenus', JSON.stringify(data.allowedMenus));

                if (data.role === 'administrator') {
                    navigate('/AdminDashboard');  // Use navigate for redirection
                } else if (['Customer', 'accountant', 'Manager'].includes(data.role)) {
                    navigate('/UserDashboard');  // Use navigate for redirection
                }
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.errorMessage || 'Invalid login credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>Login</h1>
            </header>

            {/* Login Form */}
            <div style={styles.container}>
                <h2 style={styles.heading}>Welcome Back!</h2>

                {/* Error Message */}
                {errorMessage && <div style={styles.error}>{errorMessage}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="email" style={styles.label}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password" style={styles.label}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
                        onMouseOut={(e) => (e.target.style.background = styles.button.background)}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={styles.backToHome}>
                    <p>
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            style={styles.link}
                            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
                            onMouseOut={(e) => (e.target.style.color = styles.link.color)}
                        >
                            Sign Up
                        </Link>
                    </p>
                    <p>
                        <Link
                            to="/"
                            style={styles.link}
                            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
                            onMouseOut={(e) => (e.target.style.color = styles.link.color)}
                        >
                            Back to Home
                        </Link>
                    </p>
                </div>
                <p style={styles.forgotPassword}>
                    <Link
                        to="/ForgetPassword"
                        style={styles.link}
                        onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
                        onMouseOut={(e) => (e.target.style.color = styles.link.color)}
                    >
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
