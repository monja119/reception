import { Link } from "react-router-dom"
import React from "react";
import talys_image from "../assets/images/talys.png"
import { FaSearch } from "react-icons/fa";

export default function Header({
    search,
    setSearch,
    user,
    initial_date,
    setInitial_date,
    final_date,
    setFinal_date
}) {


    let header =
        <>
            <div className="row background-primary 100vw">
                <div className="col-12 small d-flex justify-content-between align-items-center flex-row flex-wrap gap-1">
                    <div
                        className={"d-flex flex-row justify-content-between align-items-center py-2 flex-sm-basis-100 flex-md-basis-100"}>
                        <img
                            src={talys_image}
                            alt="logo-talys"
                            className="rounded"
                            style={{width: '75px'}}
                        />
                        <span className="small d-block d-lg-none d-xl-none">
                            <i className={"fas fa-user mr-3"}></i> {user?.name} | {user?.site}
                        </span>

                        <Link to="/logout" className={"d-block d-lg-none d-xl-none"}>
                            <button className="btn btn-danger">
                                Déconnexion
                            </button>
                        </Link>
                    </div>
                    {/* search bar */}

                    <div
                        className="search-bar d-flex flex-row align-items-center justify-content-center py-2 gap-1 flex-sm-basis-100 flex-md-basis-100">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Numéro"
                            style={{width: '250px'}}
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        - de -
                        <input
                            type="date"
                            className="form-control"
                            style={{width: '150px'}}
                            onChange={(e) => setInitial_date(e.target.value)}
                            value={initial_date}
                        />
                        - à -
                        <input
                            type="date"
                            className="form-control"
                            style={{width: '150px'}}
                            onChange={(e) => setFinal_date(e.target.value)}
                            value={final_date}
                        />
                    </div>

                    <div className="d-none d-lg-flex d-xl-flex justify-content-center align-items-center py-2 gap-1 flex-sm-basis-100 flex-md-basis-100">
                        <span className="small">
                            <i className={"fas fa-user mr-3"}></i> {user?.name} | {user?.site}
                        </span>
                        <Link to="/logout">
                            <button className="btn btn-danger">
                                Déconnexion
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    return (header)
}
