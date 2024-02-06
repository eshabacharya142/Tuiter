import * as usersDao from "./users-dao.js";
let users = usersDao;

function AuthenticationController(app){

    const login = (req, res) => { 
        const username = req.body.username;
        const password = req.body.password;
        if(username && password){
             const user = users.findUserByCredentials(username, password);
             if (user) {
                 req.session["currentUser"] = user;
                 res.json(user);
             } else {
                 res.sendStatus(403);
             }
        }
        else {
         res.sendStatus(403);
        }
     
      };

 const register = (req, res) => {
    const username = req.body.username;
    const user = users.findUserByUsername(username);
    if (user) {
        res.sendStatus(409);
        return;
   }
   const newUser = usersDao.createUser(req.body);
   req.session["currentUser"] = newUser;
   res.json(newUser);
  };

 const profile  = (req, res) => { 
    const currentUser = req.session["currentUser"];
   if (!currentUser) {
     res.sendStatus(403);
     return;
   }
   res.json(currentUser);

 };
 const logout   = (req, res) => {
    req.session.destroy();
   res.sendStatus(200);
  };


 const update   = (req, res) => { 
    // implement this update


 };


 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
 app.put ("/api/users",          update);
};
export default AuthController;