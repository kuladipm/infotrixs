const { Op, Sequelize, QueryTypes } = require("sequelize");
exports.databseErrorHandler=(error,req,res,next)=>{
    if (error instanceof Sequelize.ValidationError) {
        // Handle validation errors
        const errorMessages = error.errors.map((err) => err.message);
        return res
          .status(422)
          .json({ error: "validation error", message: error.message });
      } else if (error instanceof Sequelize.DatabaseError) {
        // Handle other database errors
        return res.status(500).json({ error: "databse error", message: error.message });
      } else {
        // Handle other errors
        return res.status(500).json({ error: "other error", message: error.message });
      }
}