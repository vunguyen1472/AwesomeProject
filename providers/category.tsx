export const getCategories = async () => {
    try {
        const response = await fetch("https://66863e1e83c983911b014bc2.mockapi.io/category");
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error)
    } 
}