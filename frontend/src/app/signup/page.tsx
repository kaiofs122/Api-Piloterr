import Image from "next/image"
import Link from "next/link"
import styles from '../page.module.scss'
import logoImg from '../../../public/logo.svg'
import { api } from '@/services/api'
import { redirect } from 'next/navigation'

export default function Signup(){

    async function handleRegister(formData: FormData){
        "use server"

        const nome = formData.get("nome")
        const email = formData.get("email")
        const senha = formData.get("senha")

        if(nome === "" || email === "" || senha === ""){
            console.log("Preencha todos os campos")
            return;
        }

        try{

            await api.post("/users", {
                nome,
                email,
                senha
            })

        }catch(err){
            console.log("error")
            console.log(err)
        }

        redirect("/")
    }

    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt="Logo da Prova"
                    className={styles.logo} 
                />

                <section className={styles.login}>
                    <h1>Criando sua Conta</h1>
                <form action={handleRegister}>
                    <input
                        type="nome"
                        required
                        name="nome"
                        placeholder="Digite seu Nome..."
                        className={styles.input}
                    />

                    <input
                        type="email"
                        required
                        name="email"
                        placeholder="Digite seu Email..."
                        className={styles.input}
                    />

                    <input
                        type="senha"
                        required
                        name="senha"
                        placeholder="**********"
                        className={styles.input}
                    />

                    <button type="submit" className={styles.button}>
                        Cadastrar
                    </button>
                </form>

                <Link href="/" className={styles.text}>
                    Já possui uma conta? Faça o Login
                </Link>

                </section>

            </div>
        </>
    )
}