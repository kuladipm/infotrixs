
module.exports=(sequelize,DataTypes)=>{
  const User = sequelize.define('users', {
   user_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING,
       allowNull: true
    },
    mobileNo:{
      type:DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
      isEmail: true
    }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pictureId:{
      type:  DataTypes.STRING,
      allowNull: true
    },
    address:{
      type:  DataTypes.STRING,
      allowNull: true
    },
    created_by:{
      type:  DataTypes.STRING,
      allowNull: false
    },
    updated_by:{
      type:  DataTypes.STRING,
      allowNull: false
    }
  }, {
      tableName: 'users',
      timestamps: false,
    
  });
  return User;
  }