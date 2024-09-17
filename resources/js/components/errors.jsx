import React from "react";
import Lotties from "../components/lotties.jsx";
import not_found from "../assets/lotties/404.json";
import unsupported_type from "../assets/lotties/unsupported_type.json";
import unsupported_file from "../assets/lotties/unsupported_file.json";

export const PageNotFound = () => {
    const homePage = () => {
        window.location.href = '/'
    }

    return (
        <div className=" row w-100 vh-100">
            {/* page not found */}
            <div className="col-12 text-center d-flex flex-column align-items-center justify-content-center">
                <Lotties source={not_found} height={300} width={450}/>
                <h3 className="mt-4">Page non trouvée</h3>

                <div className="d-flex flex-row justify-content-center mt-4">
                    <button className="btn btn-primary"  onClick={homePage}>
                        Page d'accueil
                    </button>
                </div>
            </div>
        </div>
    )
}


export const Error = ({message}) => {
    return (
        <div className=" row w-100 vh-100">
            {/* no search banner*/}
            <div className="col-12 text-center d-flex flex-column align-items-center justify-content-center">
                <i className={"fa fa-exclamation-triangle text-danger"} style={{fontSize: "100px"}}></i>
                <h4 className="mt-4 text-danger">{message}</h4>
            </div>
        </div>
    )
}
