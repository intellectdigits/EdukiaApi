
                          const Tables1 = require("../Models/tables1");
                          // Assigning to exports will not modify module, must use module.exports
                          module.exports = class tables1{
                            constructor(record,id) {
                       
                           this.id=id;
                           this.record=record;
                            }
                          
                           
                      store() {
                            
                            const data = new Tables1(this.record)
                      
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
                                const data = await Tables1.find().skip(2).limit(5);
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
                        
                                const result = await Tables1.findByIdAndUpdate(
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
                                const data = await Tables1.findByIdAndDelete(id)
                                console.log(`Document with ${data.name} has been deleted..`)
                            }
                            catch (error) {
                                res.status(400).json({ message: error.message })
                            }
                            }
                          }