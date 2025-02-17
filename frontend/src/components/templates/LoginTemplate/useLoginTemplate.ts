import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@/actions/api/authApi";
import { NAVIGATION_LIST } from "@/constants/navigation";

const schema = z.object({
  email: z.string().email("メールアドレスの形式で入力してください"),
  password: z.string().min(8, "8文字以上で入力してください"),
  password_confirmation: z.string().min(8, "8文字以上で入力してください"),
});

export const useLoginTemplate = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleLoginSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        if (values.password !== values.password_confirmation) {
          setError("password", {
            type: "manual",
            message: "確認用パスワードと一致しません",
          });
          return;
        }
        const { email, password } = values;
        const res = await login(email, password);
        if (res.status !== 200) {
          setError("email", {
            type: "manual",
            message: res.errorMessage,
          });
          return;
        }
        router.push(NAVIGATION_LIST.TOP);
      },

      [setError, router]
    )
  );

  return {
    control,
    errors,
    handleLoginSubmit,
  };
};
