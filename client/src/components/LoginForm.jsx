import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';


const LoginForm = () => {

    const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const { data } = await axios.post(`/api/user/${state}`,
                { name, email, password })

            if (data.success) {
                navigate('/')
                setUser(data.user)
                setShowUserLogin(false)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    return (
        <div onClick={() => setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm
        text-primary/40 bg-black/50'>
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-4 m-auto items-center p-8 py-12 w-80 sm:w-[352px] text-black
            rounded-2xl shadow-xl border border-gray-200 bg-white">
                <h1 className="text-2xl font-medium">
                    {state === "login" ? "Login" : "Konto erstellen"}
                </h1>
                <p className="text-dark-green text-sm pb-3">
                    Bitte {state === "login" ? "melden Sie sich an" : "erstellen Sie ein Konto"}, um fortzufahren.
                </p>
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Name ist ein Pflichtfeld" className="border border-dark-green/20 placeholder:text-primary/60 rounded-full w-full p-2 mt-1 outline-dark-green" type="text" required />
                    </div>
                )}
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="E-Mail-Adresse ist ein Pflichtfeld" className="border border-dark-green/20 placeholder:text-primary/60 rounded-full w-full p-2 mt-1 outline-dark-green" type="email" required />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password ist ein Pflichtfeld" className="border border-dark-green/20 placeholder:text-primary/60 rounded-full w-full p-2 mt-1 outline-dark-green" type="password" required />
                </div>
                {state === "register" ? (
                    <p>
                        Sie haben bereits ein Konto? <span onClick={() => setState("login")} className="text-dark-green cursor-pointer">hier klicken</span>
                    </p>
                ) : (
                    <p>
                        Noch kein Konto? <span onClick={() => setState("register")} className="text-dark-green cursor-pointer">hier klicken</span>
                    </p>
                )}
                <button className="bg-primary hover:bg-dark-green transition-all text-white w-full py-2 rounded-full cursor-pointer">
                    {state === "register" ? "Registrieren" : "Einloggen"}
                </button>
            </form>
        </div>
    );
};
export default LoginForm