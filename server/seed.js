const Rental = require('./models/rental.model')

class Seed {
    constructor() {
        this.rental = [{
            id: 1,
            make: "Audi",
            model: "Q3",
            variant: "SUV",
            city: "Belgrade",
            street: "Rableova 1",
            image: "https://cnet4.cbsistatic.com/img/u0PjKFms-Q8qbzmGXV7ixSSpFHQ=/1200x675/2019/10/23/081090fd-736c-4d79-9b6c-6e86d768ca2a/2019-audi-q3-1.jpg",
            shared: false,
            fuel: "diesel",
            numberOfSeat: 5,
            numberOfDoor: 5,
            color: "red",
            description: "Very nice car",
            dailyRate: 1,

        },
        {
            id: 2,
            make: "Audi",
            model: "Q3",
            variant: "SUV",
            city: "Belgrade",
            street: "Rableova 1",
            image: "https://cnet4.cbsistatic.com/img/u0PjKFms-Q8qbzmGXV7ixSSpFHQ=/1200x675/2019/10/23/081090fd-736c-4d79-9b6c-6e86d768ca2a/2019-audi-q3-1.jpg",
            shared: false,
            fuel: "diesel",
            numberOfSeat: 5,
            numberOfDoor: 5,
            color: "red",
            description: "Very nice car",
            dailyRate: 1,

        },
        {
            id: 3,
            make: "Audi",
            model: "Q3",
            variant: "SUV",
            city: "Belgrade",
            street: "Rableova 1",
            image: "https://cnet4.cbsistatic.com/img/u0PjKFms-Q8qbzmGXV7ixSSpFHQ=/1200x675/2019/10/23/081090fd-736c-4d79-9b6c-6e86d768ca2a/2019-audi-q3-1.jpg",
            shared: true,
            fuel: "diesel",
            numberOfSeat: 5,
            numberOfDoor: 5,
            color: "red",
            description: "Very nice car",
            dailyRate: 1,

        },
        {
            id: 4,
            make: "BMW",
            model: "Serie 7",
            variant: "Limousine",
            city: "Belgrade",
            street: "Rableova 1",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/93/2019_BMW_740Li_Automatic_facelift_3.0.jpg",
            shared: true,
            fuel: "diesel",
            numberOfSeat: 5,
            numberOfDoor: 5,
            color: "red",
            description: "Very nice car",
            dailyRate: 1,

        }];

    }
    async cleanDB() {
        await Rental.deleteOne({});
    }

    pushRentToDB() {
        this.rental.forEach((rental) => {
            const newRental = new Rental(rental);

            newRental.save();
        })
    }

    seedDb() {
        this.cleanDB();
        this.pushRentToDB();
    }
}

module.exports = Seed;