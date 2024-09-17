import React from "react";
import Lotties from "./lotties.jsx";
import not_found_result from "../assets/lotties/no_result.json";


export default function NoResult(){
    return(
        <div className=" row w-100 vh-100">
            {/* page not found */}
            <div className="col-12 text-center d-flex flex-column align-items-center justify-content-center">
                <Lotties source={not_found_result} height={300} width={450}/>
                <h3 className="mt-4">Aucun résultat trouvé</h3>
            </div>
        </div>
    )
}
