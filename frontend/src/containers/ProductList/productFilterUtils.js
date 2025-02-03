export const defaultFilters = {
  fromPrice: null,
  toPrice: null,
  onlyInStock: false,
  onlyhasDiscount: false,
  brands: [],
  forAge: [],
  maxLoad: [],
  maxMileage: [],
  maxSpeed: [],
  enginePower: [],
  wheelSize: [],
  hasSeat: false,
  hasTaoTao: false,
  batteryType: [],
};

// helpers to transform filters to a query string

export const getFromPriceFilterString = (fromPrice) =>
  fromPrice ? `filters[relevantPrice][$gte]=${fromPrice}` : "";

export const getToPriceFilterString = (toPrice) =>
  toPrice ? `filters[relevantPrice][$lte]=${toPrice}` : "";

export const getForAgeFilterString = (forAge) =>
  forAge.map((age) => `filters[${age.value}][$eq]=true`).join("&");

export const getBooleanFilterString = (boolField, fieldName) =>
  boolField ? `filters[${fieldName}][$eq]=true` : "";

export const getBatteryTypeFilterString = (batteryType) => {
  if (!batteryType) return "";

  return batteryType
    .map((b, i) => `filters[brand][$in][${i}]=${b.value}`)
    .join("&");
};
export const getDiscountFilterString = (onlyhasDiscount) =>
  onlyhasDiscount ? "filters[relevantPrice][$lt]=oldPrice" : "";

export const getBrandsFilterString = (brands) => {
  if (!brands) return "";

  return brands
    .map((brand, i) => `filters[brand][$in][${i}]=${brand.value}`)
    .join("&");
};

export const getFilterStringFromObject = (filters) => {
  return Object.entries(filters)
    .filter((pair) => {
      if (Array.isArray(pair[1]) && pair[0] != "brands" && pair[0] != "forAge")
        return pair[1].length > 0;
      return false;
    })
    .map((pair, i) => {
      const filterName = pair[0];
      const options = pair[1];
      const optionsString =
        options.length > 1
          ? options
              .map(
                (opt, j) =>
                  `filters[$and][${i}][$or][${j}][${filterName}][$eqi]=${opt.value}`
              )
              .join("&")
          : `filters[$and][${i}][${filterName}][$eqi]=${options[0].value}`;
      return optionsString;
    })
    .join("&");
};

export const getFilterString = (filters) => {
  const separate = Object.entries(filters)
    .map((filterPair, index) => {
      switch (filterPair[0]) {
        case "fromPrice":
          return getFromPriceFilterString(filterPair[1]);
        case "toPrice":
          return getToPriceFilterString(filterPair[1]);
        case "forAge":
          return getForAgeFilterString(filterPair[1]);
        case "onlyInStock":
          return getBooleanFilterString(filterPair[1], "inStock");
        case "hasSeat":
          return getBooleanFilterString(filterPair[1], "hasSeat");
        case "hasTaoTao":
          return getBooleanFilterString(filterPair[1], "withTaoTao");
        case "onlyhasDiscount":
          return getDiscountFilterString(filterPair[1]);
        case "brands":
          return getBrandsFilterString(filterPair[1]);
        default:
          return "";
      }
    })
    .filter((str) => str?.length != 0)
    .join("&");

  console.log(separate);

  return separate + "&" + getFilterStringFromObject(filters);
};

// counting all filters

export const countFilters = (filters) =>
  Object.entries(filters).reduce((acc, filter) => {
    let count = 0;

    if (filter[0] == "fromPrice" || filter[0] == "toPrice")
      count = filter[1] !== null;
    else if (Array.isArray(filter[1])) count = filter[1].length;
    else count = filter[1];

    return acc + count;
  }, 0);
