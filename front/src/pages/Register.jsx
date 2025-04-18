import { useState } from "react";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="register-container">
            <div className="form-section">
                <div className="form-header">
                    <h1>To Do</h1>
                    <h2>Crée ton compte</h2>
                    <p className="subtitle">Rejoignez To Do et gérez vos tâches en toute simplicité.</p>
                </div>

                <form className="register-form">
                    <div className="form-group">
                        <label>Nom</label>
                        <input type="text" placeholder="Anjara David" />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="anjara.david@gmail.com" />
                    </div>

                    <div className="form-group password-group">
                        <label>Mot de passe</label>
                        <div className="password-input-container">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "Masquer" : "Afficher"}
                            </button>
                        </div>
                    </div>

                    <div className="form-group password-group">
                        <label>Confirmer le mot de passe</label>
                        <div className="password-input-container">
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? "Masquer" : "Afficher"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="create-account-btn">Créer un compte</button>

                    <div className="divider">
                        <span>OU</span>
                    </div>

                    <button type="button" className="google-signup-btn">
                        <span className="google-icon">G</span> Se connecter avec Google
                    </button>

                    <p className="login-link">Vous avez déjà un compte? <a href="#">Se connecter</a></p>
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
    )
}

export default Register;