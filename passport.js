const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt')
const {User} = require('./models')

const initPassport = passport => {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({where: {username}})
      if(!user) {
        return done(null, false, {message: "Username does not exist!"})
      } else {
        const passwordCheck = await bcrypt.compare(password, user.password)
        if(passwordCheck) {
          return done(null, user)
        } else {
          return done(null, false, {message: "Password is incorrect!"})
        }
      }
    } catch(err) {
      return done(err)
    }
  }))  
  passport.serializeUser(function(user, done) {
      return done(null, {username: user.username, id: user.id});
  });  
  passport.deserializeUser(function(user, done) {
      return done(null, user);
  });
  return passport
}

module.exports = initPassport