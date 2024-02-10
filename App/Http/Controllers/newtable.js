
                        
                        const newtableModel = require("../Models/newtable");
                        // Assigning to exports will not modify module, must use module.exports
                        module.exports = class  newtable{
                          constructor(record,id) {
                     
                         this.id=id;
                         this.record=record;
                          }
                        
                         
                    store() {
                          
                          const data = new newtableModel(this.record)
                    
                        try {
                            const dataToSave = data.save();
                            console.log(dataToSave)
                        }
                        catch (error) {
                           console.log({message: error.message})
                        }
                          }
                        async  show() {
                            try{
                              const data = await newtableModel.find();
                              console.log(data)
                          }
                          catch(error){
                              console.log({message: error.message})
                          }
                          }
                        async  get() {
                            try{
                              const data = await Tables1.findById(this.id);
                              console.log(data)
                          }
                          catch(error){
                              console.log({message: error.message})
                          }
                          }
                       async   update() {
                            try {
                              const id = this.id;
                              const updatedData = this.record;
                              const options = { new: true };
                      
                              const result = await newtableModel.findByIdAndUpdate(
                                  id, updatedData, options
                              )
                      
                             console.log(result)
                          }
                          catch (error) {
                             console.log({ message: error.message })
                          }
                          }
                        async  delete() {
                            try {
                              const id = this.id;
                              const data = await newtableModel.findByIdAndDelete(id)
                              console.log("data deleted")
                          }
                          catch (error) {
                              res.status(400).json({ message: error.message })
                          }
                          }
                        }