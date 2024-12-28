"use client"
import { useRouter } from "next/navigation";
export default function OrderProduct(){
    const router = useRouter();
    const handleClick=()=>{
        console.log("Placing your order");
        alert("Placing order");
        router.push("/");
    }
    return (<>
    <h1>Order Product</h1>
    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50" onClick={handleClick}>Place order</button>
    </>)
}