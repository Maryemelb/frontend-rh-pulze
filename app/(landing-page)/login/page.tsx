
'use client';
import LoginForm from "../../components/LoginForm";

export default function Login() {
    const is_login=true

return(
    <div>
        login
        <LoginForm is_login={is_login}></LoginForm>
    </div>
)
}