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
    <div className="w-2/4 m-auto shadow-md rounded-[30px]">
      <div className="rounded-t-[29px] text-center drop-shadow-md bg-dourado text-white py-2 font-bold text-2xl">SGP</div>
      <form className="bg-light-500 dark:bg-dark-500 rounded-b-[29px] p-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        {notification.message &&
          <div className={`p-1 px-5 mx-auto text-center ${notification.status === "error" ? "bg-red-300 text-red-800" : ""}`}>{notification.message}</div>
        }
        <div className="flex gap-2 items-center">
          <input required id="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="text-light-50 dark:text-dark-50 flex-1 p-2 pl-1 pb-0 border-b-2 border-light-50 dark:border-dark-50 outline-0" />
        </div>
        <div className="flex gap-2 items-center">
          <input required id="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            type="password"
            className="text-light-50 dark:text-dark-50 flex-1 p-2 pl-1 pb-0 bg-transparent border-b-2 border-light-50 dark:border-dark-50 outline-0" />
        </div>
        <button className="bg-roxo w-1/2 mx-auto rounded py-1 hover:bg-indigo-900">Login</button>
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