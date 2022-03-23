import {useState} from "react";

export const useRequest = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const data = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [data, isLoading, error]
}

//const [fetchPosts, isPostsLoading, postError] = useRequest(async () => {
// ...request to server
// })