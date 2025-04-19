import { useState } from "react";
import { useNavigate } from "react-router";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    } else if (userData.username.length < 3) {
      newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères";
    }

    if (!userData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Veuillez entrer un email valide";
    }

    if (!userData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (userData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/todoapp/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password
        }),
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(JSON.stringify(err));
      }
      
      const createdUser = await res.json();
      console.log("Utilisateur créé :", createdUser);
      setSuccessMessage("Compte créé avec succès !");
      setUserData({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      navigate("/home", {state: {user: createdUser}});
      
    } catch (e) {
      console.error("Erreur à l'inscription :", e);
      let errorMessage = "Une erreur est survenue lors de l'inscription";
      
      try {
        const errorData = JSON.parse(e.message);
        if (errorData.email) {
          setErrors(prev => ({...prev, email: errorData.email[0]}));
        }
        if (errorData.username) {
          setErrors(prev => ({...prev, username: errorData.username[0]}));
        }
      } catch (parseError) {
        setErrors(prev => ({...prev, form: errorMessage}));
      }
    }
  };

  return (
    <div className="register-container">
      <div className="form-section">
        <div className="form-header">
          <h1>To Do</h1>
          <h2>Crée ton compte</h2>
          <p className="subtitle">
            Rejoignez To Do et gérez vos tâches en toute simplicité.
          </p>
        </div>

        {errors.form && (
          <div className="error-message">{errors.form}</div>
        )}

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input
              value={userData.username}
              name="username"
              onChange={handleChange}
              type="text"
              placeholder="Anjara David"
              className={errors.username ? "error" : ""}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              value={userData.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="anjara.david@gmail.com"
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group password-group">
            <label>Mot de passe</label>
            <div className="password-input-container">
              <input
                value={userData.password}
                onChange={handleChange}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={errors.password ? "error" : ""}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group password-group">
            <label>Confirmer le mot de passe</label>
            <div className="password-input-container">
              <input
                value={userData.confirmPassword}
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                className={errors.confirmPassword ? "error" : ""}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="create-account-btn"
          >
            Créer un compte
          </button>

          <p className="login-link">
            Vous avez déjà un compte? <a href="#">Se connecter</a>
          </p>
        </form>
      </div>

      <div className="animation-section">
        <div className="particles-container">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>
      </div>
    </div>
  );
}

export default Register;