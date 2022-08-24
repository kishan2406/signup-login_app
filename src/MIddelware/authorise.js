
 // permittedRoles = ["admin"]

const authorise = (permittedRoles) =>{
 
    return (req,res, next) => {
       
        // getting the user
        const user = req.user
       if(user.role==undefined)
       return res.status(401).send({message: "you are not authorise to access"})

        let isPermitted = false;

        // checking if he has permittted role
    permittedRoles.map(role => {
       if(user.role.includes(role)){
           isPermitted = true;

       }
    })


    // if permitted, he can go ahead                              
         if(isPermitted) {
        return next()

         }
         else{
             return res.status(401).send({message: "you are not authorise to access"})
         }
    }
} 

module.exports = authorise
