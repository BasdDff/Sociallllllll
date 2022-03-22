import {useMemo} from "react";

export const useSortedUsers = (users, sort) => {
    const sortedUsers = useMemo(() => {
        if (sort) {
            return [...users].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return users
    }, [sort, users])

    return sortedUsers
}

export const useFiltersUsers = (users, sort, query) => {
    const sortedUsers = useSortedUsers(users, sort)

    const sortedAndSearchedUsers = useMemo(() => {
        return sortedUsers.filter(user => {
            return user.username.toLowerCase().includes(query.toLowerCase())
        })
    }, [query, sortedUsers])

    return sortedAndSearchedUsers
}