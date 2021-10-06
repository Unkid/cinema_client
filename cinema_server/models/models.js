const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Movie = sequelize.define('movie', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    origTitle: {type: DataTypes.STRING, allowNull: false},
    country: {type: DataTypes.STRING, allowNull:false},
    rate: {type: DataTypes.REAL, allowNull: false, defaultValue: 5},
    description: {type: DataTypes.TEXT, allowNull: false},
    duration: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 120},
    startYear:{type: DataTypes.STRING, allowNull: false},
    ageLimit: {type: DataTypes.STRING, allowNull: false, defaultValue: '+6'},
    startDate: {type: DataTypes.DATEONLY, allowNull: false},
    genres: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false, defaultValue: '1.jpg'}
})

const Actor = sequelize.define('actor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},
    gender: {type: DataTypes.ENUM('М', 'Ж'), allowNull: false},
    birthDate: {type: DataTypes.DATEONLY, allowNull: false},
    country: {type: DataTypes.STRING, allowNull:false},
    img: {type: DataTypes.STRING, allowNull: false, defaultValue: '1.jpg'} 
})

const Director = sequelize.define('director', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},
    gender: {type: DataTypes.ENUM('М', 'Ж'), allowNull: false},
    birthDate: {type: DataTypes.DATEONLY, allowNull: false},
    country: {type: DataTypes.STRING, allowNull:false},
    img: {type: DataTypes.STRING, allowNull: false, defaultValue: '1.jpg'} 
})

const Seance = sequelize.define('seance', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 200},
    date: {type: DataTypes.DATEONLY, allowNull: false},
    time: {type: DataTypes.TIME, allowNull: false},
    format: {type: DataTypes.STRING, allowNull: false, defaultValue: "2D"}
})

const Cinema = sequelize.define('cinema', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    adress: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false, defaultValue: '1.jpg'}
})

const Hall = sequelize.define('hall', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER, allowNull: false},
    rows: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 10},
    seats: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 12}
})

const SelectedSeat = sequelize.define('selectedSeat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    seats: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false}
})

const Client = sequelize.define('client', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false}
})

const Order = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false}
})

const MovieActor = sequelize.define('movie_actor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const MovieDirector = sequelize.define('movie_director', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})



Movie.hasMany(Seance)
Seance.belongsTo(Movie)

Hall.hasMany(Seance)
Seance.belongsTo(Hall)

Cinema.hasMany(Seance)
Seance.belongsTo(Cinema)

Seance.hasMany(SelectedSeat)
SelectedSeat.belongsTo(Seance)

Client.hasMany(SelectedSeat)
SelectedSeat.belongsTo(Client)

Seance.hasMany(Order)
Order.belongsTo(Seance)

SelectedSeat.hasOne(Order)
Order.belongsTo(SelectedSeat)

Client.hasMany(Order)
Order.belongsTo(Client)

Movie.belongsToMany(Actor, {through: MovieActor})
Actor.belongsToMany(Movie, {through: MovieActor})

Movie.belongsToMany(Director, {through: MovieDirector})
Director.belongsToMany(Movie, {through: MovieDirector})

module.exports = {
    Movie,
    Actor,
    Director,
    Seance,
    Cinema,
    Hall,
    Client,
    Order,
    SelectedSeat,
    MovieActor,
    MovieDirector
}


