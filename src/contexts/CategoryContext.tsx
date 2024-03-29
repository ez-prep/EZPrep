import {CategoryItem} from "../types";
import {createContext, useEffect, useState} from "react";
import {fetchCategories} from "../api";


export const CategoryContext = createContext<CategoryItem[] | []>([]);
CategoryContext.displayName = 'CategoryContext';


// @ts-ignore
export function CategoryContextProvider({children}) {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories()
            .then((data) => {
                setCategoryList(data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            })
            .finally(() => setLoading(false))
    }, []);

    return (
        <CategoryContext.Provider value={categoryList}>
            {!loading ? children : <div style={{color: "white", fontSize: "large"}}>Loading...</div>}
        </CategoryContext.Provider>
    );
}
