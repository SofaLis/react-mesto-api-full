import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import LogIn from './LogIn';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isLoggedIn, setIsisLoggedIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isAuthorization, setIsAuthorization] = React.useState(false);
  const [isAuthorizationText, setIsAuthorizationText] = React.useState('');

  const [email, setEmail] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState({ name: '', avatar: '', about: '' });
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [cards, setCards] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`${err}, попробуйте ещё`);
        })
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`${err}, попробуйте ещё`);
      })
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(res => {
        setCards((newCard) => newCard.filter((item) => { return item._id !== card._id }));
      })
      .catch((err) => {
        console.log(`${err}, попробуйте ещё`);
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard({
      link: card.link,
      name: card.name
    });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard({ name: '', link: '' });
  }

  function handleUpdateUser(user) {
    api.editProfile(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}, попробуйте ещё`);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}, попробуйте ещё`);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}, попробуйте ещё`);
      })
  };

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    handleTokenCheck()
  }, [])

  function handleTokenCheck() {
    auth.getContent()
      .then((res) => {
        setIsisLoggedIn(true);
        setEmail(res.data.email);
        history.push("/");
      })
      .catch((err) => {
        history.push("/sign-in");
      });
  }

  function handleLogIn(data) {
    auth.authorize(data)
      .then((res) => {
        if (res.token) {
          setIsisLoggedIn(true);
          setIsAuthorization(true)
          setIsAuthorizationText('Вы успешно зарегистрировались!')
          setIsInfoTooltipPopupOpen(true)
          setEmail(data.email);
          localStorage.setItem("jwt", res.token);
          history.push('/');
        }
      })
      .catch(() => {
        setIsAuthorizationText('Что-то пошло не так! Попробуйте ещё раз.');
        setIsAuthorization(false)
        setIsInfoTooltipPopupOpen(true);
      })
  }

  function handleRegister(data) {
    auth.register(data)
      .then((res) => {
        setIsisLoggedIn(true);
        setEmail(data.email);
        setIsAuthorization(true)
        setIsAuthorizationText('Вы успешно зарегистрировались!')
        setIsInfoTooltipPopupOpen(true)
        history.push('/');
      })
      .catch(() => {
        setIsAuthorization(false)
        setIsAuthorizationText('Что-то пошло не так! Попробуйте ещё раз.')
        setIsInfoTooltipPopupOpen(true)
      })
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsisLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header email={email} onClick={handleSignOut} />

        <Switch>
          <ProtectedRoute exact path="/" component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} isLoggedIn={isLoggedIn} />

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <LogIn onRegister={handleLogIn} />
          </Route>

          <Route>
            {isLoggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>

        </Switch>

        {isLoggedIn && <Footer />}

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipPopupOpen} isAuthorizationText={isAuthorizationText} isAuthorization={isAuthorization} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
