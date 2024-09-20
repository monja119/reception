import React, {useEffect} from "react";
import {extract_page} from "./helper.jsx";



export default function Pagination({
    page, handlePage, dataLength, paginationData
}){

    const marge = 4;
    const next = (step) => {
        if(dataLength > page + step) {
            handlePage(page + step)
        }
    }

    const prev = (step) => {
        if(page - step > 0) {
            handlePage(page - step)
        }
    }

    return (
        <nav aria-label="Page navigation example w-100">
            <ul className="pagination">
                <li className="page-item cursor-pointer"
                    onClick={() => {
                        paginationData?.current_page - 10 > 0 ?handlePage(paginationData?.current_page - 10) : (paginationData?.from)
                    }}
                >
                    <span
                        className="page-link"
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>

                {/* first page */}
                <li className="page-item cursor-pointer" onClick={() => handlePage(extract_page(paginationData?.first_page_url))}>
                    <span className={`page-link ${paginationData.current_page === extract_page(paginationData?.first_page_url) && 'active'}`}>{extract_page(paginationData?.first_page_url)}</span>
                </li>

                {/* last page */}
                { paginationData?.current_page > (1 + marge) &&
                    <li className="page-item cursor-pointer">
                        <span className={`page-link`}> ... </span>
                    </li>
                }

                {/* middle page  */}
                {
                    // prev
                    Array.from({length : marge}, (_, i) =>
                    (
                        paginationData?.current_page - (marge - i) > 1 &&
                        <li className="page-item cursor-pointer"
                            key={i}
                            onClick={() => handlePage(paginationData?.current_page - (marge - i))}
                        >
                            <span
                                className={`page-link ${paginationData.current_page === paginationData?.current_page - (marge - i) && 'active'}`}>
                                {paginationData?.current_page - (marge - i)}
                            </span>
                        </li>
                    ))
                }

                {/* current page */}
                {
                    paginationData?.current_page !== 1 && paginationData?.current_page !== paginationData?.last_page &&
                    <li className="page-item cursor-pointer">
                        <span className={`page-link active`}>{paginationData?.current_page}</span>
                    </li>
                }
                {

                    // next
                    Array.from({length: marge}, (_, index) =>
                    (
                        paginationData?.current_page + (index + 1) <paginationData?.last_page &&
                        <li className="page-item cursor-pointer"
                            key={index}
                            onClick={() => handlePage(paginationData?.current_page + (index + 1))}
                        >
                            <span
                                className={`page-link ${paginationData.current_page === paginationData?.current_page + (index + 1) && 'active'}`}>
                                {paginationData?.current_page + (index + 1)}
                            </span>
                        </li>
                    ))
                }

                {/* last page */}
                { paginationData?.current_page < (paginationData?.last_page - marge) &&
                    <li className="page-item cursor-pointer">
                        <span className={`page-link`}> ... </span>
                    </li>
                }

                {/* last page */}
                <li className="page-item cursor-pointer"
                    onClick={() => handlePage(extract_page(paginationData?.last_page_url))}>
                    <span
                        className={`page-link ${paginationData.current_page === extract_page(paginationData?.last_page_url) && 'active'}`}>{extract_page(paginationData?.last_page_url)}</span>
                </li>


                <li className="page-item cursor-pointer"
                    onClick={() => {
                        paginationData?.last_page >= page + 10 ? handlePage((paginationData?.current_page + 10)) : handlePage(paginationData?.last_page)
                    }}
                >
                    <span className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            </ul>
        </nav>
    )
}
