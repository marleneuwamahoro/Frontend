import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backendapprication-8eeb6fd4c701.herokuapp.com/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        const data = await response.text();
        setMessage(data);
        setError("");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        setMessage("");
      }
    } catch (err) {
      console.error("Error sending request:", err);
      setError("An unexpected error occurred. Please try again.");
      setMessage("");
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: "'Poppins', sans-serif",
      color: '#333'
    }}>
      <section style={{
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 600,
          color: '#333',
          marginBottom: '1.5rem'
        }}>
          Forgot Password
        </h2>

        {message && (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '0.75rem',
            borderRadius: '6px',
            marginBottom: '1.5rem'
          }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '0.75rem',
            borderRadius: '6px',
            marginBottom: '1.5rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label 
            htmlFor="email"
            style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: 500,
              marginBottom: '0.5rem',
              color: '#666',
              textAlign: 'left'
            }}
          >
            Enter your Email
          </label>
          <input 
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@example.com"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ddd',
              marginBottom: '1.5rem',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#1d72b8'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: '#1d72b8',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#155a8a'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1d72b8'}
          >
            Send Reset Link
          </button>
        </form>
      </section>
    </div>
  );
};

export default ForgotPassword;