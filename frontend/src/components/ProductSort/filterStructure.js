const filterStructure = {
  forAge: {
    "Для дорослих": "forAdults",
    "Для дітей": "forChildren",
  },
  maxLoad: {
    "До 100 кг": "max-100",
    "До 130 кг": "max-130",
    "130 - 150 кг": "from-130-to-150",
    "Більше 150 кг": "min-150",
  },
  maxMileage: {
    "До 20 км": "max-20",
    "20 - 30 км": "from-20-to-30",
    "30 - 50 км": "from-30-to-50",
    "50 - 80 км": "from-50-to-80",
  },
  maxSpeed: {
    "До 20 км": "max-20",
    "20 - 40 км": "from-20-to-40",
    "40 - 80 км": "from-40-to-80",
  },
  enginePower: {
    "600 - 1000 Ват": "from-600-to-1000",
    "1001 - 1500 Ват": "from-1001-to-1500",
    "1501 - 3000 Ват": "from-1501-to-3000",
  },
  wheelSize: {
    "6.5 Д": "inch-6.5",
    "8 Д": "inch-8",
    "8.5 Д": "inch-8.5",
    "10 Д": "inch-10",
    "10.5 Д": "inch-10.5",
    "11 - 20 Д": "inch-11-20",
  },
  batteryType: {
    "36V": "V36",
    "54V": "V54",
  },
};

export default filterStructure;
