module.exports = (sequelize, DataTypes) => {
    const Packages = sequelize.define("Packages", {
        PackageName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Packages;
};