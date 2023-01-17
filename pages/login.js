import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import { useState } from "react";
import { signIn } from 'next-auth/react';
import Router from 'next/router';

const LoginPage = () => {
  const notificationInitialState = {
    status: '',
    message: ''
  }
  const [notification, setNotification] = useState(notificationInitialState);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = evt => {
    setForm(st => { return { ...st, [evt.target.name]: evt.target.value }; });
  }

  const handleSubmit = async evt => {
    evt.preventDefault();
    setNotification(notificationInitialState);
    if (form.email.trim().length && form.password.trim().length) {
      const res = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false
      });

      if (!res.error) {
        Router.push('/');
      } else {
        setNotification({ message: res.error, status: 'error' });
      }
    } else {
      setNotification({ message: !form.email.trim().length ? "Informe um E-mail" : "Informe uma senha", status: 'error' });
    }
  }

  return (
    <div className="w-2/4 m-auto border border-yellow-500/30 shadow-md shadow-yellow900/50 rounded-[30px]">
      <div className="rounded-t-[29px] text-center drop-shadow-md text-orange-50 bg-dourado-500 py-2 font-bold text-2xl">SGP</div>
      <form className="bg-yellow-700/30 rounded-b-[29px] p-5 text-mesquita flex flex-col gap-4" onSubmit={handleSubmit}>
        {notification.message &&
          <div className={`p-1 px-5 mx-auto text-center ${notification.status === "error" ? "bg-red-300 text-red-800" : ""}`}>{notification.message}</div>
        }
        <div className="flex gap-2 items-center">
          <label className="text-indigo-50 w-1/6 text-center" htmlFor="email">E-mail</label>
          <input required id="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} type="email" className="bg-white flex-1 p-2 rounded outline-0" />
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-indigo-50 w-1/6 text-center" htmlFor="password">Senha</label>
          <input required id="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange} type="password" className="bg-white flex-1 p-2 rounded outline-0" />
        </div>
        <button className="hover:bg-blue-400 hover:text-indigo-50 bg-blue-500/75 rounded py-2 px-4 w-fit mx-auto text-indigo-50 border border-blue-400">Login</button>
      </form>
    </div>
  );
}

export const getServerSideProps = async context => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
      props: {}
    }
  } else {
    return {
      props: {}
    }
  }
}

LoginPage.layout = "regular";
export default LoginPage;