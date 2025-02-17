import { FC } from "react";
import { BaseLayout } from "@/components/organisms";
import { TodoType } from "@/types/todo";
import { InputForm, TextArea } from "@/components/atoms";
import styles from "./style.module.css";

type TodoDetailTemplateProps = {
  todo: TodoType;
};

export const TodoDetailTemplate: FC<TodoDetailTemplateProps> = ({ todo }) => (
  <BaseLayout title={"TodoDetail"}>
    {!!todo && (
      <div className={styles.container}>
        <div className={styles.area}>
          <InputForm disabled value={todo.title} placeholder={"Title"} />
        </div>
        <div className={styles.area}>
          <TextArea disabled value={todo.content} placeholder={"Content"} />
        </div>
      </div>
    )}
  </BaseLayout>
);
