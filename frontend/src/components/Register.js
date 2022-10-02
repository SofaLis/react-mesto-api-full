import React from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    };

    function handleChangePassword(e) {
        setPassword(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister({
            email,
            password
        });
    }

    return (
        <section className="authorization authorization__register">
            <form className="authorization__form" onSubmit={handleSubmit}>
                <h2 className="authorization__heading">Регистрация</h2>
                <input name="email" className="authorization__input" type="email" placeholder="Email" required onChange={handleChangeEmail} value={email || ''} />
                <input name="password" className="authorization__input" type="password" placeholder="Пароль" required onChange={handleChangePassword} value={password || ''} />
                <button className="authorization__submit-button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="authorization__text">Уже зарегистрированы?
                <Link to="/sign-in" className="authorization__text authorization__text_link"> Войти</Link></p>
        </section>
    );
}