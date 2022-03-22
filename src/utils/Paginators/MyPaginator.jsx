import React from "react";

function createPages(pages, pagesCount, currentPage) {
    if (pagesCount > 10) {
        if (currentPage > 5) {
            for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                pages.push(i)
                if (i === pagesCount) {
                    break
                }
            }
        } else {
            for (let i = 0; i <= 10; i++) {
                pages.push(i)
                if (i === pagesCount) {
                    break
                }
            }
        }
    } else {
        for (let i = 0; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
}

//Paginator принимает обязательные параметры:
// currentPage - текущая страница
// totaItemsCount - общее число объектов которое приходит с сервера
// pageSize - размер объектов на одной странице
// onPageChanged - метод смены страницы
// classSpan - класс для стилей
// activeClassSpan - класс для текущей активной страницы

export const MyPaginator = (props) => {

    let pagesCount = Math.ceil(props.totaItemsCount / props.pageSize)

    let pages = []

    createPages(pages, pagesCount, props.currentPage)

    return (
        <>
            {pages.map(page => {
                return <span key={page} className={`${props.classSpan} ${props.currentPage === page && props.activeClassSpan}`}
                             onClick={() => {
                                 props.onPageChanged(page)
                             }}> {page} </span>
            })}
        </>
    )
}