import NavBar from "./components/NavBar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProfileList from "./components/ProfileList";
import Home from "./components/Home";
import {useAuth,AuthContext} from "./hooks/useAuth";

const App = ()=>{
    const auth = useAuth();
    return (
      <AuthContext.Provider value = {auth}>
          <BrowserRouter>
                <div className="App">
                    <NavBar/>
                </div>

              <Switch>
                  <Route exact path ="/login" component = {Login}></Route>
                  <Route exact path ="/cupido/profile" component = {Profile}/>
                  <Route exact path ="/cupido/profilelist" component = {ProfileList}/>
                  <Route path ="/" component = {Home} />
              </Switch>
          </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
