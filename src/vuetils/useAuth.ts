import { ref } from "vue";
import supabase from "@/supabase/supabase";
import { Provider, Session } from "@supabase/gotrue-js/dist/main/lib/types";
import ICredentials from "@/typescript/interfaces/ICredentials";
import { useUserStore } from "@/store/user";
import { useBoardStore } from "@/store/board";
import { useTaskStore } from "@/store/task";
import { getTask } from "@/vuetils/useTask";

const userSession = ref<Session | null>(null);

supabase.auth.onAuthStateChange((event, session) => {
  console.log("session_event", event);
  userSession.value = session;
  const store = useUserStore();
  store.user = session?.user.id;
  getTask();
});
/**
 * Обрабатывает вход пользователя по электронной почте + пароль в сеанс supabase.
 * Если пароль не пуст, он отправит волшебную ссылку на адрес электронной почты пользователя
 * @param credentials почта и пароль
 */
async function handleLogin(credentials: ICredentials) {
  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: credentials.email as string,
      password: credentials.password as string,
    });
    if (error) {
      console.log("Ошибка", error);
      return { data, error };
    }
    return data;
  } catch (error) {
    console.error("Error thrown:", error);
  }
}

/**
 * Обрабатывает регистрацию, предоставленную объектом действительных учетных данных.
 * @param credentials - почта и пароль
 */
async function handleSignup(credentials: ICredentials) {
  try {
    const { email, password } = credentials;
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log("Ошибка", error);
      return { data, error };
    }
    return data;
  } catch (error) {
    console.error("Error thrown:", error);
  }
}

/**
 * Обрабатывает регистрацию через сторонний логин.
 * https://supabase.com/docs/guides/auth#third-party-logins
 */
async function handleOAuthLogin(provider: Provider) {
  const { error } = await supabase.auth.signInWithOAuth({ provider });
  if (error) console.error("Error: ", error.message);
}

/**
 * Обрабатывает сброс пароля. Отправит электронное письмо на указанный адрес электронной почты.
 */
async function handlePasswordReset() {
  const email = prompt("Please enter your email:");
  if (!email) {
    window.alert("Email address is required.");
  } else {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Password recovery email has been sent.");
    }
  }
}

/**
 * Обновляет данные о пользователе
 * @param credentials - новые данные о пользователе
 */
async function handleUpdateUser(credentials: ICredentials) {
  try {
    const { error } = await supabase.auth.updateUser(credentials);
    if (error) {
      alert("Error updating user info: " + error.message);
    } else {
      alert("Successfully updated user info!");
      window.location.href = "/";
    }
  } catch (error) {
    alert("Error updating user info: " + error);
  }
}

/**
 * обрабатывает выход пользователя из сеанса через базу данных
 */
async function handleLogout() {
  const storeUser = useUserStore();
  const storeBoard = useBoardStore();
  const storeTask = useTaskStore();
  console.log("logging out");
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error", error);
      return;
    }
    storeUser.user = "";
    storeTask.tasks = [];
    storeBoard.boards = [];
  } catch (err) {
    console.error("Error", err);
  }
}

export {
  userSession,
  handleLogin,
  handleOAuthLogin,
  handleSignup,
  handleLogout,
  handlePasswordReset,
  handleUpdateUser,
};
