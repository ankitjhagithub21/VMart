import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setIsLoggedIn } from '../redux/slices/authSlice'
import Input from '../components/Input'
import Button from '../components/Button'
import FormHeading from '../components/FormHeading'


const Register = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const handleRegister = async (e) => {
        e.preventDefault()


        setLoading(true)
       
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({fullName,email,password})
            })

            const data = await res.json()
            if (data.success) {
                toast.success(data.message)
                dispatch(setIsLoggedIn(true))
                navigate("/")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        finally {
            setLoading(false)
            
        }
    }

    return (
        <section className='p-5'>
            <div className='max-w-xl mx-auto my-24 p-5 border border-primary rounded-xl'>
                <FormHeading text={"Create an account."}/>
                <form onSubmit={handleRegister} className='flex flex-col gap-3'>
                   
                    <Input type={"text"} placeholder={"Enter your name"} value={fullName} setValue={setFullName} name={"fullName"} />
                    <Input type={"email"} placeholder={"Enter your email"} value={email} setValue={setEmail} name={"email"} />
                    <Input type={"password"} placeholder={"Enter your password"}  value={password} setValue={setPassword} name={"password"} />
                    <Button type={"submit"} text={"Register"}  loading={loading} />
                </form>
                <p className='mt-5'>Already have an account ? <Link className='text-blue-500 underline' to={"/login"}>Login</Link></p>
            </div>
        </section>
    )
}

export default Register
