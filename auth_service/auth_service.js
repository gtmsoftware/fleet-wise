const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../dbservice/common/db_pool');


// Configure Passport to use a Local Strategy with PostgreSQL
passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
  
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
  
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
  
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      const user = result.rows[0];
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });