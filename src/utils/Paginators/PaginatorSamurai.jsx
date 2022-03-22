import React, {useState} from "react";

export const PaginatorSamurai = ({
                                     totaItemsCount,
                                     pageSize,
                                     currentPage,
                                     portionSize,
                                     onPageChanged,
                                     classSpan,
                                     activeClassSpan
                                 }) => {

    let pagesCount = Math.ceil(totaItemsCount / pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)

    //Левая граница! portionNumber - номер страницы порций
    //portionSize - размер порции (у нас это 10 страниц)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    //Правая граница!
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}> prev</button>
            }
            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => {
                    return (
                        <span key={page}
                              className={`${classSpan} ${currentPage === page && activeClassSpan}`}
                              onClick={() => {
                                  onPageChanged(page)
                              }}> {page} </span>
                    )
                })}
            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}> next
            </button>
            }
        </>
    )
}