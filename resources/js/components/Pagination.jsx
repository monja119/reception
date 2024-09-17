import React from "react";

export default function Pagination({
    page, handlePage, dataLength
}){

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
                        if(page - 10 > 0) {
                            handlePage(page - 10)
                        }
                    }}
                >
                    <span
                        className="page-link"
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>
                {
                    page - 1 > 0 && <li className="page-item cursor-pointer" onClick={() => prev(page - 1)}>
                        <span className={`page-link`}>{page - 1}</span>
                    </li>
                }
                <li className="page-item cursor-pointer" onClick={() => handlePage(page)}>
                    <span className={`page-link  active`}>{page}</span>
                </li>
                {
                    <li className="page-item cursor-pointer" onClick={() => next(page + 1)}>
                        <span className={`page-link`}>{page + 1}</span>
                    </li>
                }
                {
                    page === 1 && <li className="page-item cursor-pointer" onClick={() => next(page + 1)}>
                        <span className={`page-link`}>{page + 2}</span>
                    </li>
                }
                <li className="page-item cursor-pointer"
                    onClick={() => {
                        if(dataLength > page + 1) {
                            handlePage(page + 10)
                        }
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
