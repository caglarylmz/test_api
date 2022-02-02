# test_api

This app provides testing of auth operations for developers

https://restapifortest.herokuapp.com/

# Register User

@route POST /adduser
//@desc Authenticate user
//@route POST /authenticate
router.post("/login", actions.authenticate);
//@desc Get info on a user
//@route GET /getinfo
router.get("/getinfo", actions.getInfo);

Read Logs: heroku logs --tail

# Fix for Problem heroku .env file

enter bash : heroku run bash -a restapifortest
create env file : touch .env
write in file : echo "MONGOOSE_URI='mongodb+srv://username:password@oriontech.ji21k.mongodb.net/test-api?retryWrites=true&w=majority'" "SECRET_KEY='secret'" >> .env
see file : cat .env
