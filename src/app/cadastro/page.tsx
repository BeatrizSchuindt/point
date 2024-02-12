"use client";

import styles from "./page.module.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreateUserInput } from "@/@types/User";
import { signUp } from "../services/user-service";

export default function Cadastro() {
  const [error, setError] = React.useState();
  const router = useRouter();
  const { register, handleSubmit, formState: {errors, isValid} } = useForm<CreateUserInput>({mode: "onChange"});

  const onSubmit = async (data: CreateUserInput) => {
    try {
      const response = await signUp(data);
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      router.replace('/');
    } catch (error: any) {
      setError(error.response.data.error);
    }
  }

  return (
    <div className={styles.wraper}>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
        <h1 className={styles.title}>HomePONTO</h1>
        <div className="d-flex flex-column gap-2">
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <div className="form-floating ">
            <input type="email" className="form-control" id="email" placeholder="name@example.com" {...register('email')} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating ">
            <input type="text" className="form-control" id="name" placeholder="Josézinho da feira" {...register('name')} />
            <label htmlFor="name">Nome</label>
          </div>
        </div>
        <div className="d-flex gap-2">
          <div className="form-floating">
            <input type="password" className="form-control" id="password" placeholder="Insira sua senha aqui" />
            <label htmlFor="password">Senha</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="confirm-password" placeholder="Confirme sua senha aqui" {...register('password')} />
            <label htmlFor="confirm-password">Confirmar a senha</label>
          </div>
        </div>
        <div className="px-2">
          <a href="/login" style={{ fontSize: "13px" }}>
            Entrar
          </a>
        </div>
        <button typeof="submit" className="btn btn-primary p-2" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
