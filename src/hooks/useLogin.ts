import { loginUser, registerUser } from "@/api/user.api";
import { LoginUserType, RegisterUserType } from "@/lib/validation";
import useAuthStore from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { login } = useAuthStore();

  const { mutate, isPending, error, isError, isSuccess, data, status } =
    useMutation({
      mutationFn: (data: LoginUserType) => loginUser(data),
      onSuccess: (data) => {
        if (data instanceof Error) throw console.error(data.message);
        console.log({ uselogin: data.access_token });
        login(data);
      },
      onError: (error) => {
        console.log({ errorReactQuery: error });
      },
    });

  return { mutate, isPending, error, isError, isSuccess, data, status };
};

export const useRegister = () => {
  const loginHook = useLogin();

  const { mutate, isPending, error, isError, isSuccess } = useMutation({
    mutationFn: (data: RegisterUserType) => registerUser(data),
    onSuccess: (data, variables) => {
      if (data instanceof Error) throw console.error(data.message);
      console.log({ useregister: data });

      const loginUser: LoginUserType = {
        email: variables.email,
        password: variables.password,
      };
      loginHook.mutate(loginUser);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate, isPending, error, isError, isSuccess };
};
