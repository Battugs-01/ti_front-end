import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import auth from "service/auth";
import { Action, AuthContextType, AuthReducerType } from "./type";

type Props = {
  children: any;
};

const reducer: AuthReducerType = (state, action) => {
  switch (action[0]) {
    case Action.SIGN_IN:
      return { ...state, user: action[1], authorized: true };
    case Action.SIGN_OUT:
      return { ...state, user: undefined, authorized: false };
    case Action.INIT:
      return { ...state, init: action[1] };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType>([
  { authorized: false, init: false, user: undefined },
  () => {},
  "en",
  () => {},
]);

export const AuthProvider = ({ children }: Props) => {
  const [state, setState] = useReducer(reducer, {
    authorized: false,
    init: false,
  });
  const [lang, setLang] = useState<string>("en");
  const _info = useRequest(auth.info, {
    manual: true,
    onSuccess: (data) => {
      setState([Action.SIGN_IN, data]);
      setState([Action.INIT, true]);
    },
    onError: () => {
      auth.removeToken();
      setState([Action.SIGN_OUT]);
      setState([Action.INIT, true]);
    },
  });

  useEffect(() => {
    _info.run();
    setLang(localStorage.getItem("web.locale") || "en");
  }, []);

  return (
    <AuthContext.Provider value={[state, setState, lang, setLang]}>
      {!state.init ? <PageLoading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuthContext: () => AuthContextType = () =>
  useContext<AuthContextType>(AuthContext);
