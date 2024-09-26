import React, {useEffect, useState} from 'react'
import { login } from '../../services/authService'
import { notifyError, notifySucess} from "../../components/notificationManager.jsx";
import sanifer from "../../assets/images/sanifer.png"
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../reducers/users/userActions.js';
import {useNavigate} from "react-router-dom";


const defaultState = {
    login: null,
    password: null
}


export default function Login ()
{
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.reception_user.user);
    const navigate = useNavigate();
    const [state, setState] = useState(defaultState)
    const [loading, setLoading] = useState(false)
    const [error] = useState(false)
    const handleState = (name, value) =>
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const auth = () => {
        setLoading(true)
        if(state.login === '' || state.password === ''){
            notifyError('Veuillez remplir tous les champs')
            setLoading(false)
        }
        else {
            login(state)
                .then(async (res)=>{
                    const response = res.data
                    notifySucess("Connexion réussie")
                    dispatch(setUser(response.user))
                    setLoading(false)
                })
                .catch((error) => {
                    if(error.response){
                        notifyError(error.response.data.message)
                    }
                    else {
                        notifyError("Erreur lors de la connexion : " + error.message)
                    }
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        // console.log(userStore)
        if(userStore){
            navigate('/')
        }
    }, [userStore]);

    let loginPage =
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="login-box col-xl-5 col-lg-5 col-md-10 col-sm-11 p-2">
                        <div className="card border-0 shadow">
                            <div className="card-body login-card-body">

                                <div className="login-logo text-center">
                                    <img
                                        src={sanifer}
                                        alt="logo-talys"
                                        className="logo-login mt-3"
                                        style={{width: '200px', height: '210px'}}
                                    />

                                    <h4
                                        style={{marginTop: "-45px"}}
                                        className="text-center mb-3 "
                                    >
                                        Réception
                                    </h4>
                                </div>
                                <p className="login-box-msg my-3 mb-4 small">Connectez-vous pour commencer votre
                                    session</p>

                                {error && <p className="alert alert-danger"> error </p>}

                                <div className="input-group mb-3">
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Nom de l'ordinateur"
                                           onChange={(e) => handleState("login", e.target.value)}
                                           name="login"
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text h-100">
                                            <span className="fas fa-user"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Mot de passe Ordinateur"
                                        onChange={(e) => handleState("password", e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text h-100">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12">
                                        <button
                                            className="btn background-primary h-100 w-100"
                                            onClick={auth}
                                        >
                                            {loading ? "Chargement..." : "Connexion"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<div className={"mt-3 text-center small"}>*/}
                        {/*    <p>*/}
                        {/*        Talys &copy; {new Date().getFullYear()} | Version {import.meta.env.VITE_APP_VERSION} | <*/}
                        {/*        a*/}
                        {/*        href={`mailto:${import.meta.env.VITE_DEVELOPER_EMAIL}`}*/}
                        {/*        className="text-primary text-decoration-none"*/}
                        {/*        >*/}
                        {/*            <span className="text-primary"> Contactez-nous</span>*/}
                        {/*        </a>*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    return (loginPage)
}
