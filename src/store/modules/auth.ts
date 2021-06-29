import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import store from "@/store";
import { User } from "@/types/User";
import axios from "axios";

@Module({ namespaced: true, store })
class AuthState extends VuexModule {
  public loggedUser: User | null = null;
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
  @Action
  async LogOutUser(): Promise<boolean> {
    try{
      const req = await axios.get("users/logout");
      if (req.data.success) {
        this.context.commit("setLoggedUser", null);
        this.context.commit("setToken", null);
        localStorage.removeItem("token")
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e)
      return false;
    }
  }
  get currentUser(): User | null {
    return this.loggedUser;
  }
  get isUserLogged(): boolean {
    return this.loggedUser == null
  }
}
export default AuthState;
