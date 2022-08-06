module.exports = (sequelize, DataTypes) => {
    const Clients = sequelize.define("Clients", {
        clientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pageName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        packageType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        num: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        altNum: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
    return Clients;
};