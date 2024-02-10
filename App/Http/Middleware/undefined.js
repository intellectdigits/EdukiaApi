
        
              const undefined=(req, res, next) => {
      
                const fs = require('fs'); 
             
                // Function to get current filenames 
                // in directory 
                fs.readdir("./Routes", (err, files) => { 
                  if (err) 
                    console.log(err); 
                  else { 
                  
                    files.forEach(file => { 
                      console.log(files); 
                    }) 
                   console.log("authenticateduser")
                   next()
                  } 
                 
                })  
               
                 
            
              
             }
             module.exports=undefined;