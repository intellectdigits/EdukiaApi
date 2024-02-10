const mongoose = require("mongoose");
                      const tokenSchema = new mongoose.Schema({
                         user_id: {
                              required: true,
                              type: mongoose.Types.ObjectId
                          },
                          token: {
                              required: true,
                              type: String
                          },
                          created_at: {
                            required: true,
                            type: Date
                        },
                        Expired_at: {
                            required: true,
                            type: Date
                        }
                      })
                      
                      module.exports = mongoose.model('token', tokenSchema)