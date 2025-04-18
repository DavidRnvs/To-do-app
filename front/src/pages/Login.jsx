function Login () {
    return (
        <div className="register-container">
        <div className="animation-side">
            <div className="nucleus-animation">
                <div className="nucleus-core"></div>
                <div className="orbit orbit-1"></div>
                <div className="orbit orbit-2"></div>
                <div className="electron electron-1"></div>
                <div className="electron electron-2"></div>
                <div className="electron electron-3"></div>
                <div className="electron electron-4"></div>
            </div>
        </div>

        <div className="register-content">
            <div className="register-header">
                <h1>To Do</h1>
                <p className="tagline">Simplement l'outil dont mon équipe et moi avons besoin.</p>
                <p className="testimonial">David Salvatore<br />Lead Tech en informatique</p>
            </div>

            <div className="register-form">
                <h2>Bienvenue dans To Do</h2>
                <p className="subtitle">Votre productivité, notre priorité - Transformez vos objectifs en réalisations.</p>

                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="anjara.david@gmail.com" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" placeholder="***********" />
                    </div>

                    <div className="form-options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Se souvenir de moi</label>
                        </div>
                        <a href="#" className="forgot-password">Mot de passe oublié?</a>
                    </div>

                    <button type="submit" className="signin-button">S'inscrire</button>

                    <div className="divider">OU</div>

                    <button type="button" className="google-button">
                        Continuer avec Google
                    </button>

                    <p className="signup-link">Pas de compte? <a href="#">S'inscrire</a></p>
                </form>
            </div>
        </div>
    </div>
 )
}

export default Login;