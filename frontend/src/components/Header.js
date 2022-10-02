import React from 'react';
import logo from '../images/logo.svg';
import { Switch, Route, Link } from "react-router-dom";

export default function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <Switch>

                <Route exact path="/">
                    <div className="header__inside">
                        <p className="header__email">{props.email}</p>
                        <button to='/sign-in' className="header__out" onClick={props.onClick} >Выйти</button>
                    </div>
                </Route>

                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__authorization">Регистрация</Link>
                </Route>

                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__authorization">Войти</Link>
                </Route>

            </Switch>
        </header>
    );
}