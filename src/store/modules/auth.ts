import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import store from "@/store";
import { User } from "@/types/User";
import axios from "axios";

@Module({ namespaced: true, store })
class AuthState extends VuexModule {
  public loggedUser: User | undefined;
  public token: string | null = localStorage.getItem("token");

  @Mutation
  setLoggedUser(user: User) {
    this.loggedUser = user;
  }
  @Mutation
  setToken(token: string) {
    localStorage.setItem("token", token);
    this.token = token;
  }

  @Action
  async LogInUser(payload: any): Promise<void> {
    try {
      console.log(payload);
      const req = await axios.post("users/authenticate", payload);
      this.context.commit("setLoggedUser", req.data.user);
      this.context.commit("setToken", req.data.token);
    } catch (e) {
      console.error(e);
    }
  }
}
export default AuthState;
