import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../contenedores/models/User.js";
import bcrypt from "bcrypt";

passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) console.log(err);
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) console.log(err);
                if (isMatch) return done(null, user);
                return done(null, false);
            });
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
});

export default passport;