import { Link } from "react-router-dom"
import React from "react";
import sanifer from "../assets/images/sanifer.png"
import { navigationsSettings } from "../data/navigations.js";

export default function Header({
    user,
}) {


    let header =
        <>
            <div className="row background-primary 100vw">
                <div className="col-12 small d-flex justify-content-between align-items-center flex-row flex-wrap gap-1">
                    <div
                        className={"d-flex flex-row justify-content-between align-items-center py-2 gap-4 flex-sm-basis-100 flex-md-basis-100"}
                    >
                        <img
                            src={sanifer}
                            alt="logo-talys"
                            className="rounded"
                            style={{width: '75px', height: '60px'}}
                        />

                        {/*    navigations */}
                        <div className={"d-flex flex-row gap-3"}>
                            {
                                navigationsSettings.list.map((navigation, index) => {
                                    return(
                                        <Link to={navigation.path} className={"text-decoration-none text-white"} key={index}>
                                            <span className={'d-flex gap-1 justify-content-center align-items-center'}>
                                                <navigation.icon />
                                                {navigation.title}
                                            </span>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="d-flex justify-content-center align-items-center py-2 gap-1 flex-sm-basis-100 flex-md-basis-100">
                        <span className="small">
                            <i className={"fas fa-user mr-3"}></i> {user?.name} | {user?.site}
                        </span>
                        <Link to="/logout">
                            <button className="btn btn-danger btn-sm">
                                Déconnexion
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    return (header)
}
