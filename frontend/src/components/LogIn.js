import React from 'react';

export default function LogIn(props) {
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
                <h2 className="authorization__heading">Вход</h2>
                <input name="email" className="authorization__input" type="email" placeholder="Email" required onChange={handleChangeEmail} value={email || ''} />
                <input name="password" className="authorization__input" type="password" placeholder="Пароль" required onChange={handleChangePassword} value={password || ''} />
                <button className="authorization__submit-button" type="submit">Войти</button>
            </form>
        </section>
    );
}