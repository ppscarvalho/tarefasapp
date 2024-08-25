import { GetServerSideProps } from "next";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Head from "next/head";
import styles from "./dashboard.module.css";

import { getSession } from "next-auth/react";
import { TextArea } from "@/components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import { db } from "@/services/firebaseConnection";

import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

import Link from "next/link";

interface HomeProps {
  user: {
    email: string;
  };
}

interface TaskProps {
  id: string;
  task: string;
  createdAt: Date;
  user: string;
  public: boolean;
}

export default function Dashboard({ user }: HomeProps) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const tasks = collection(db, "tasks");
      const q = query(
        tasks,
        where("user", "==", user?.email),
        orderBy("createdAt", "desc")
      );

      onSnapshot(q, (snapshot) => {
        let lista = [] as TaskProps[];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            task: doc.data().task,
            createdAt: doc.data().created,
            user: doc.data().user,
            public: doc.data().public,
          });
        });

        setTasks(lista);
      });
    }
    loadTasks();
  }, [user?.email]);

  function handleChangePublicTask(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (!input) {
      alert("Preencha o campo de tarefa!");
      return;
    }

    const taskData = {
      task: input,
      createdAt: new Date(),
      user: user?.email,
      public: publicTask,
    };

    await addDoc(collection(db, "tasks"), taskData)
      .then(() => {
        setInput("");
        setPublicTask(false);
        alert("Tarefa registrada com sucesso!");
      })
      .catch((err) => {
        console.log("Error adding document: ", err);
        alert("Ocorreu um erro ao registrar a tarefa!");
      });
  }

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );

    alert("URL Copiada com sucesso!");
  }

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>
            <form onSubmit={handleRegisterTask}>
              <TextArea
                placeholder="Digite qual sua tarefa..."
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(event.target.value)
                }
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublicTask}
                />
                <label>Deixar tarefa pública</label>
              </div>

              <button className={styles.button} type="submit">
                Registrar
              </button>
            </form>
          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>
          {tasks.map((item) => (
            <article key={item.id} className={styles.task}>
              {item.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PUBLICO</label>
                  <button
                    className={styles.shareButton}
                    onClick={() => handleShare(item.id)}
                  >
                    <FiShare2 size={22} color="#3183ff" />
                  </button>
                </div>
              )}

              <div className={styles.taskContent}>
                {item.public ? (
                  <Link href={`/task/${item.id}`}>
                    <p>{item.task}</p>
                  </Link>
                ) : (
                  <p>{item.task}</p>
                )}
                <button
                  className={styles.trashButton}
                  onClick={() => handleDeleteTask(item.id)}
                >
                  <FaTrash size={24} color="#ea3140" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        email: session?.user?.email,
      },
    },
  };
};
