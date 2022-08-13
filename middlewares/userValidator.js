exports.userSignUpValidator = (req, res, next) => {

    // First Method to validate the user input
    // const { name, email, password } = req.body

    // let errors = []

    // if(!name || name.length < 3){
    //     errors.push({message: 'Name is required and should be atleast 3 characters'})
    // }

    // if(!email || email.length < 5){
    //     errors.push({message: 'Email is required and should be atleast 5 characters'})
    // }

    // if(!password || password.length < 5){
    //     errors.push({message: 'Password is required and should be atleast 5 characters'})
    // }


    // if(errors.length > 0){
    //     res.status(400).send(errors)
    // }else{
    //     next()
    // }


    // Second Method to validate the user input

    req.check('name', 'Name is required and should be atleast 3 characters')
        .notEmpty()
        .isLength({ min: 3, max: 25 })

    req.check('email', 'Email is required')
        .notEmpty()
        .isEmail()

    req.check('password', 'Password is required')
        .notEmpty()
        .isLength({ min: 6, max: 25 })
        .withMessage('Password should contain atleast min of 6 characters')

        const errors = req.validationErrors()
        
        if(errors){
            res.status(400).send({
                error : errors[0].msg
            })
        }else{
            next();
        }
        
}