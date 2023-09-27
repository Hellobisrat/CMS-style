const {Model,Datatype} = require('sequelize')
const sequelize = require('../config/connection')

class Blog extends Model{}

Blog.init (
  {
    title:{
      type: Datatype.STRING,
      allowNull:false
    },
    description:{
      type: Datatype.TEXT,
      allowNull:false
    }
  },
  {
    sequelize,
    timestamps:false,
    freezeTableName:true,
    underscored:true,
    modelName:'blog'
  }
)

module.exports = Blog;