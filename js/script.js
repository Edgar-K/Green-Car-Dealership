const CreateCars = (() => {
    //car data
    const cars = [];
    //car class

    class Car {
        constructor(make, fuel, img, special, model, price, type, horsepower, odometer) {
            this.make = make;
            this.fuel = fuel;
            this.img = img;
            this.special = special;
            this.model = model;
            this.price = price;
            this.type = type;
            this.horsepower = horsepower;
            this.odometer = odometer;
        }
    }
    //car creation function
    function makeCar(make, fuel, img = 'img/default-hybrid-car-4.jpg', special = true, model = 'new model', price = 10000, type = 'sedan', horsepower = '250', odometer = '75,000') {

        const car = new Car(make, fuel, img, special, model, price, type, horsepower, odometer);
        cars.push(car);
    }
    //produce cars function
    function produceCars() {
        // data for cars to sell
        makeCar('Tesla Model S', 'electric', 'img/electric-car-1.jpg', false, '09/2015', 52300, 'sedan', '310 kW/421 Hp', '136000');
        makeCar('BMW i3', 'electric', 'img/electric-car-2.jpg', false, '07/2017', 23400, 'Small', '125 kW/170 Hp', '75000');
        makeCar('Hyundai IONIQ', 'electric', 'img/electric-car-3.jpg', false, '08/2017', 19500, 'Saloon', '88 kW/120 Hp', '63000');
        makeCar('VW Golf 1.4 GTE/Hybrid', 'hybrid', 'img/hybrid-car-1.jpg', false, '05/2017', 23200, 'Saloon', '150 kW/204 Hp', '51000');
        makeCar('Audi A3 e-tron 1.4 TFSI', 'hybrid', 'img/hybrid-car-2.jpg', false, '02/2016', 19600, 'Estate', '150 kW/204 Hp', '95000');
        makeCar('Mercedes-Benz C350 e', 'hybrid', 'img/hybrid-car-3.jpg', false, '02/2018', 33800, 'Estate', '155 kW/211 Hp', '27000');

        // data for new cars 2020
        makeCar('Audi E-Tron', 'electric', 'img/new-car-1.jpg', true);
        makeCar('Chevrolet Bolt EV', 'electric', 'img/new-car-2.jpg', true);
        makeCar('Nissan Leaf', 'electric', 'img/new-car-3.jpg', true);
        makeCar('Tesla Model 3', 'electric', 'img/new-car-4.jpg', true);
        makeCar('Volkswagen ID.3', 'electric', 'img/new-car-5.jpg', true);
    }
    produceCars();

    // filter cars for sell which should display in inventory section
    const carsForSell = cars.filter(car => car.special !== true)

    // filter new cars which should display in new models 2020 section
    const newModels = cars.filter(car => car.special === true)

    return {
        carsForSell,
        newModels
    }

})();

// display cars for sell
const DisplayCarsForSell = ((CreateCars) => {
    //cars for sell
    const carsForSell = CreateCars.carsForSell;
    //car container
    const inventory = document.querySelector('.inventory-container');

    //content loaded
    document.addEventListener('DOMContentLoaded', () => {
        inventory.innerHTML = '';
        let output = '';
        carsForSell.forEach((car) => {
            output += `<div class="col-10 mx-auto my-3 col-md-6 col-lg-4 single-car ${car.fuel} ">
            <div class="card car-card">
                <img src="${car.img}" class="card-img-top car-img" alt="car">
                <!-- card body -->
                <div class="cart-body">
                    <div class="car-info d-flex justify-content-between">
                        <!-- first flex child -->
                        <div class="car-text text-uppercase">
                            <h6 class="font-weight-bold p-2">${car.make} </h6>
                            <h6 class="px-2"> ${car.model} </h6>
                        </div>
                        <!-- second flex child -->
                        <h5 class="car-value align-self-center py-2 px-3">
                            <span class="car-price">&#8364; ${car.price} </span>
                        </h5>
                    </div>
                </div>
                <!-- end of card body -->
                <div class="card-footer text-capitalize d-flex justify-content-between">
                    <p><span><i class="fas fa-car"></i> </span> ${car.type} </p>
                    <p><span><i class="fas fa-cogs"></i> </span> ${car.horsepower} </p>
                    <p><span> <i class="fas fa-tachometer-alt"></i></span> ${car.odometer}</p>
                </div>
            </div>
        </div>`
        })

        inventory.innerHTML = output;
    })
})(CreateCars);

//filter cars

const FilterCars = (() => {
    const filter = document.querySelectorAll('.filter-btn');

    filter.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const value = event.target.dataset.filter;
            const singleCar = document.querySelectorAll('.single-car');
            console.log(singleCar);

            singleCar.forEach(car => {
                if (value === 'all') {
                    car.style.display = 'block';
                }
                else {
                    (!car.classList.contains(value)) ? car.style.display = 'none' : car.style.display = 'block';
                }
            })
        })
    })
})();

// display new cars 2020
const DisplayNewCars = ((CreateCars) => {
    const newModels = CreateCars.newModels;

    const info = document.querySelector('.featured-info');

    //document loaded event
    document.addEventListener('DOMContentLoaded', () => {
        info.innerHTML = '';

        let data = '';
        newModels.forEach(item => {
            data += ` <!-- single item -->
                        <div class="featured-item my-3 d-flex p-2 text-capitalize align-item-center flex-wrap">
                            <span data-img="${item.img}" class="featured-icon mx-4">
                                <i class="fas fa-car"></i>
                            </span>
                            <h5 class="font-weight-bold mx-2">${item.make}</h5>
                        </div>
                    <!-- end of single item --> `
        })
        info.innerHTML = data;
    })

    //change img
    info.addEventListener('click', (event) => {
        if (event.target.parentElement.classList.contains('featured-icon')) {
            const img = event.target.parentElement.dataset.img;
            document.querySelector('.featured-photo').src = img;
        }
    })

})(CreateCars);