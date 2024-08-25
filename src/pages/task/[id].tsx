import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "./task.module.css";

import { db } from "@/services/firebaseConnection";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { TextArea } from "@/components/textarea";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

interface TaskProps {
  task: {
    id: string;
    task: string;
    createdAt: Date;
    public: boolean;
    user: string;
  };
  allComments: CommentProps[];
}

interface CommentProps {
  id: string;
  taskId: string;
  comment: string;
  createdAt: string;
  user: string;
  name: string;
}

export default function Task({ task, allComments }: TaskProps) {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [comments, setComments] = useState<CommentProps[]>(allComments || []);

  async function handleSaveComment(event: FormEvent) {
    event.preventDefault();

    if (input === "") {
      toast.warn("O comentário não pode estar vazio");
      return;
    }

    if (!session?.user?.email || !session?.user?.name) {
      toast.warn("Você precisa estar logado para comentar");
      return;
    }

    await addDoc(collection(db, "comments"), {
      taskId: task.id,
      comment: input,
      user: session?.user?.email,
      name: session?.user?.name,
      createdAt: new Date(),
    })
      .then((resp) => {
        setInput("");
        toast.success("Tarefa registrada com sucess!!!");

        const data = {
          id: resp.id,
          taskId: task.id,
          comment: input,
          createdAt: new Date().toLocaleDateString(),
          user: session?.user?.email as string,
          name: session?.user?.name as string,
        };

        setComments((oldItems) => [...oldItems, data]);
      })
      .catch(() => {
        console.error("Error ao adicionar comentário!!!");
      });
  }

  async function handleDeleteTask(id: string) {
    await deleteDoc(doc(db, "comments", id))
      .then(() => {
        toast.success("Tarefa excluída com sucesso!!!");
        const newComments = comments.filter((comment) => comment.id !== id);
        setComments(newComments);
      })
      .catch(() => {
        console.error("Error ao excluir comentário!!!");
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>

      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>Tarefa: {task.task}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixar comentário</h2>

        <form onSubmit={handleSaveComment}>
          <TextArea
            placeholder="Digite seu comentário..."
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
          />
          <button disabled={!session?.user} className={styles.button}>
            Enviar comentário
          </button>
        </form>
      </section>

      <section className={styles.commentsContainer}>
        <h2>Todos Comentários</h2>
        {comments.length == 0 && <p>Nenhum comentário ainda.</p>}
        {comments.map((comment) => (
          <article key={comment.id} className={styles.comment}>
            <div className={styles.headComment}>
              <label className={styles.commentLabel}>{comment.name}</label>

              {comment.user === session?.user?.email && (
                <button
                  className={styles.buttonTrash}
                  onClick={() => handleDeleteTask(comment.id)}
                >
                  <FaTrash size={18} color="#EA3140" />
                </button>
              )}
            </div>

            <span>{comment.createdAt}</span>
            <p>{comment.comment}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  //Obtendo todos os comentários de uma tarefa pelo ID
  let allComments: CommentProps[] = [];

  /*  
  //
  const commentsQuery = query(
    collection(db, "comments"),
    where("taskId", "==", id)
  );
  const commentsSnapshot = await getDocs(commentsQuery);
  commentsSnapshot.forEach((doc) => {
    const miliseconds = doc.data()?.createdAt?.seconds * 1000;

    allComments.push({
      id: doc.id,
      taskId: doc.data().taskId,
      comment: doc.data().comment,
      createdAt: new Date(miliseconds).toLocaleDateString(),
      user: doc.data().user,
      name: doc.data().name,
    });
  });*/

  await getDocs(query(collection(db, "comments"), where("taskId", "==", id)))
    .then((doc) => {
      doc.forEach((doc) => {
        const miliseconds = doc.data()?.createdAt?.seconds * 1000;
        allComments.push({
          id: doc.id,
          taskId: doc.data().taskId,
          comment: doc.data().comment,
          createdAt: new Date(miliseconds).toLocaleDateString(),
          user: doc.data().user,
          name: doc.data().name,
        });
      });
    })
    .catch((error) => {
      console.error("Erro ao obter os comentários: ", error);
    });

  const docRef = doc(db, "tasks", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  //Oonvertendo a data para milisecondos
  const miliseconds = snapshot.data()?.createdAt?.seconds * 1000;

  const task = {
    id: snapshot.id,
    task: snapshot.data()?.task,
    public: snapshot.data()?.public,
    createdAt: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
  };

  return {
    props: {
      task: task,
      allComments: allComments,
    },
  };
};
