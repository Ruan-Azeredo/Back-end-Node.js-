// const sequelize = require("sequelize");
// const { DataTypes } = require("sequelize/types");

const User = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    });
};

module.exports = User;