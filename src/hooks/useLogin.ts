import { loginUser } from "@/api/user.api";
import { LoginUserType } from "@/lib/validation";
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginUserType) => loginUser(data),
    onSuccess: (data) => {
      if (data instanceof Error) throw console.error(data.message);
      console.log({ uselogin: data.access_token });
      setAccessToken(data.access_token); // Almacena el token de acceso en el store

      // localStorage.set('accessToken', data.token);
      // setAuthorizationHeader(data.token);
      // queryClient.removeQueries();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate, isPending };
};
