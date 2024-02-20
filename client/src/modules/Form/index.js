import { useState } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { useNavigate } from 'react-router-dom'
import PopUp from "../../components/PopUp/PopUp"

///////////////////////////////////////////////
const BASE_URL = process.env.REACT_APP_BASE_URL
///////////////////////////////////////////////

const Form = ({
    isSignInPage = true,
}) => {
    const[popupText, setPopupText] = useState("");
    
    const [data, setData] = useState({
        ...(!isSignInPage && {
            fullName: ''
        }),
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        //console.log('data :>> ', data);
        e.preventDefault()
        const res = await fetch(`${BASE_URL}api/${isSignInPage ? 'login' : 'register'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(res.status === 200 && !isSignInPage) {
            setPopupText("User Registered Successfully🎉\nPlease Sign In to continue...")
            navigate('/users/sign_in')
        }

        if(res.status === 400) {
            const resText = await res.text()
            setPopupText(resText)
        }else{
            const resData = await res.json()
            if(resData.token) {
                localStorage.setItem('user:token', resData.token)
                localStorage.setItem('user:detail', JSON.stringify(resData.user))
                navigate('/')
            }
        }
    }

  return (
    <div className="bg-light h-screen flex items-center justify-center">
        {
            popupText.length > 0 && 
            <PopUp text={popupText} setPopupText={setPopupText} />
        }
        <div className=" bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
            <div className=" text-4xl font-extrabold">Welcome {isSignInPage && 'Back'}</div>
            <div className=" text-xl font-light mb-14">{isSignInPage ? 'Sign in to get explored' : 'Sign up to get started'}</div>
            <form className="flex flex-col items-center w-full" onSubmit={(e) => handleSubmit(e)}>
            { !isSignInPage && <Input label="Full name" name="name" placeholder="Enter your full name" className="mb-6 w-[75%]" value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value }) } /> }
            <Input label="Email address" type="email" name="email" placeholder="Enter your email" className="mb-6 w-[75%]" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value }) }/>
            <Input label="Password" type="password" name="password" placeholder="Enter your Password" className="mb-14 w-[75%]" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value }) }/>
            <Button label={isSignInPage ? 'Sign in': 'Sign up'} type='submit' className="w-[75%] mb-2" />
            </form>
            <div>{ isSignInPage ? "Didn't have an account?" : "Alredy have an account?"} <span className=" text-primary cursor-pointer underline" onClick={() => navigate(`/users/${isSignInPage ? 'sign_up' : 'sign_in'}`)}>{ isSignInPage ? 'Sign up' : 'Sign in'}</span></div>
        </div>
    </div>
  )
}

export default Form