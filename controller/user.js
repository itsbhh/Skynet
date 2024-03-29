const user = require("../dbmodels/user.js");


module.exports.signUpForm = async (req, res) => {
    res.render("user/signup.ejs");
};



module.exports.signUpReq = async (req, res) => {
    try {
        let { username, fullname, dob, email, password } = req.body;
        const newUser = new user({ email, username, fullname, dob });
        const registerUser = await user.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", `Welcome to Skynet ${req.user.username}`);
            res.redirect('/home');
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/user/signup");
    }
};

module.exports.loginForm = async (req, res) => {
    res.render("user/login.ejs");
};


module.exports.loginReq = async (req, res) => {
    req.flash("success", `Welcome to Skynet ${req.user.username}`);
    let redirectUrl = res.locals.redirectUrl || "/home";
    console.log(redirectUrl);
    res.redirect(redirectUrl);
};


module.exports.logoutReq = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("sucess", "You are logged Out!!");
        res.redirect("/home");
    })
};