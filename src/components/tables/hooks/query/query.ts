

import {useQuery} from "@tanstack/react-query"
import axios from "axios";

export const  useProducts = () => {

    const query = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const {data} = await axios.get("https://dummyjson.com/products");
           console.log(data)
            return data
        }
    })

    return query
}