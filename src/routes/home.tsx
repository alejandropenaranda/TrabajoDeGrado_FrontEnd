import{ User } from "../types/types";

export default function Home() {

    const user = JSON.parse(localStorage.getItem("user")) as User;

    return <h1>bienvenido al Home {user.nombre}</h1>
}