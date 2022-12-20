import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({onClickHandler}) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ formErrors, setFormErrors ] = useState()
    const [ dataChange, setDataChange ] = useState("");
    const [ accessToken, setAccessToken ] = useState(sessionStorage.getItem('accessToken'));

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }; 
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/rotten_potatoes/user/login', {
            email,
            password,})
        .then(res =>
            {console.log(res);
            setAccessToken(sessionStorage.setItem('accessToken', res.data.token));
            navigate("/");
            window.location.reload(false);
        })
        .catch(err => {
            console.log(err);
            const errRes = err.response.data.error
            setFormErrors(errRes);
        })
    }

    return (
    <div className='mb-96 absolute top-[103px] text-black right-10 z-100 bg-white border border-black p-4'>
        <div className='flex flex-col items-center'>
            <h1 className="text-2xl m-3">Login User</h1>
        <form onSubmit={handleSubmit} className="w-[500px]  flex flex-col">
            <div className='flex'>
                <section className='m-4'>
                    <div className="flex flex-col gap-2">
                    {formErrors && <p className="text-center text-red-500">{formErrors}</p>}
                        <label htmlFor="email">Email: </label>
                        <input className="border border-black rounded w-[400px]" type="text" onChange={handleEmail} value={email}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password: </label>
                        <input className="border border-black rounded" type="password" onChange={handlePassword} value={password}/>
                    </div>
                </section>
            </div>
                <button className="border border-black rounded p-2 m-2 bg-slate-700 hover:bg-slate-600 text-white">Login</button>
        </form>
        <div className="flex gap-2">
            <h1>New User?</h1>
            <button className="underline" onClick={() => onClickHandler()}>Register</button>
        </div>
    </div>
    </div>
)
}

export default LoginForm