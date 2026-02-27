'use client';
import LoginForm from "../../components/LoginForm";

export default function Signup() {
    const is_login = false
    return(

        <div>
            <LoginForm is_login={is_login}></LoginForm>
        </div>
    )
}