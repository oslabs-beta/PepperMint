const Profile = require('')

const controller = {};

controller.verifyUser = async function(req, res, next){
    try{
        //find profile with same username 
        const profile = await Profile.findOne({username: req.body.username});

        //if profile not found OR incorrect password, take to signup page
        if (profile === null || profile.password !== req.body.password){
            return next({
                log: 'Incorrect username or password',
                status: 400,
                message: { err: 'Incorrect username or password' }
            });
        }
        else{
            req.locals.profile = profile;
            return next();
        }
    } catch{
        return next({
            log: 'Error in verifyUser middleware',
            message: { err: 'Error in verifyUser middleware' }
        })
    }  
}

controller.createUser = async function(req, res, next){
    try{
        

    } catch{

    }
}