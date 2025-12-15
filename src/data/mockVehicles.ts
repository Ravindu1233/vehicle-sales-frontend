import { Vehicle } from "@/components/vehicles/VehicleCard";

export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    title: "2023 BMW M4 Competition",
    price: 84900,
    year: 2023,
    mileage: 5200,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop&q=60",
    source: "AutoTrader",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "2022 Mercedes-Benz E-Class",
    price: 62500,
    year: 2022,
    mileage: 18300,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60",
    source: "Dealer",
    isVerified: true,
  },
  {
    id: "3",
    title: "2024 Tesla Model S Plaid",
    price: 108990,
    year: 2024,
    mileage: 1200,
    fuelType: "Electric",
    transmission: "Automatic",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=60",
    source: "Tesla",
    isVerified: true,
    isNew: true,
  },
  {
    id: "4",
    title: "2021 Porsche 911 Carrera",
    price: 119500,
    year: 2021,
    mileage: 12800,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=60",
    source: "CarGurus",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "5",
    title: "2023 Audi RS e-tron GT",
    price: 142400,
    year: 2023,
    mileage: 3500,
    fuelType: "Electric",
    transmission: "Automatic",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=60",
    source: "Dealer",
    isVerified: true,
  },
  {
    id: "6",
    title: "2022 Ford Mustang GT",
    price: 45900,
    year: 2022,
    mileage: 22400,
    fuelType: "Gasoline",
    transmission: "Manual",
    location: "Dallas, TX",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5f82d718c?w=800&auto=format&fit=crop&q=60",
    source: "Facebook",
    isVerified: false,
  },
  {
    id: "7",
    title: "2023 Range Rover Sport",
    price: 89900,
    year: 2023,
    mileage: 8700,
    fuelType: "Hybrid",
    transmission: "Automatic",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&auto=format&fit=crop&q=60",
    source: "Dealer",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "8",
    title: "2021 Chevrolet Corvette",
    price: 72500,
    year: 2021,
    mileage: 15600,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Phoenix, AZ",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=60",
    source: "AutoTrader",
    isVerified: true,
  },
];

export const carMakes = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti",
  "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Fiat",
  "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep",
  "Kia", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati",
  "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Porsche",
  "Ram", "Rivian", "Rolls-Royce", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"
];

export const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];

export const transmissions = ["Automatic", "Manual", "CVT"];

export const conditions = ["New", "Used", "Certified Pre-Owned"];

export const locations = [
  "Los Angeles, CA", "New York, NY", "Miami, FL", "San Francisco, CA",
  "Seattle, WA", "Dallas, TX", "Chicago, IL", "Phoenix, AZ", "Boston, MA",
  "Denver, CO", "Atlanta, GA", "Houston, TX"
];
