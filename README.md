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
