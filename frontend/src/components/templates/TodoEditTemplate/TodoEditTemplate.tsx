"use client";
import { FC } from "react";
import { Controller } from "react-hook-form";

import { useTodoEditTemplate } from "./useTodoEditTemplate";

import { BaseLayout } from "@/components/organisms";
import { InputFormSection, TextAreaSection } from "@/components/molecules";
import { CommonButton } from "@/components/atoms";
import { TodoType } from "@/types/todo";
import styles from "./style.module.css";

type TodoEditTemplateProps = {
  todo: TodoType;
};

export const TodoEditTemplate: FC<TodoEditTemplateProps> = ({ todo }) => {
  // const { originTodoList, updateTodo } = useTodoContext();

  const { control, errors, handleEditSubmit } = useTodoEditTemplate({
    todo,
  });

  return (
    <BaseLayout title={"TodoEdit"}>
      <div></div>
      {!!todo && (
        <form className={styles.container} onSubmit={handleEditSubmit}>
          <div className={styles.area}>
            <Controller
              name="title"
              render={({ field }) => (
                <InputFormSection
                  placeholder={"Title"}
                  errorMessage={errors.title?.message}
                  {...field}
                />
              )}
              control={control}
            />
          </div>
          <div className={styles.area}>
            <Controller
              name="content"
              render={({ field }) => (
                <TextAreaSection
                  placeholder={"Content"}
                  errorMessage={errors.content?.message}
                  {...field}
                />
              )}
              control={control}
            />
          </div>
          <div className={styles.area}>
            <CommonButton type="submit">{"Edit Todo"}</CommonButton>
          </div>
        </form>
      )}
    </BaseLayout>
  );
};
