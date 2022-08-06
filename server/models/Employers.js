module.exports = (sequelize, DataTypes) => {
    const Employers = sequelize.define("Employers", {
        EmployerName: {
            type: DataTypes.STRING,
            allowNull: false,
        }, address: {
            type: DataTypes.STRING,
            allowNull: false,
        }, NationalNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        }, num: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        altNum: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        holyday: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }

    });
    return Employers;
};