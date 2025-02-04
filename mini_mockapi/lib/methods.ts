export const dataTypes = [
  "Faker.js",
  "String",
  "Number",
  "Date",
  "Array",
  "Object",
  "boolean",
  "Object ID",
] as const;

export const fakerMethods = {
  address: [
    "location.cardinalDirection",
    "location.city",
    "location.cityName",
    "location.country",
    "location.countryCode",
    "location.county",
    "location.direction",
    "location.latitude",
    "location.longitude",
    "location.nearbyGPSCoordinate",
    "location.ordinalDirection",
    "location.secondaryAddress",
    "location.state",
    "location.stateAbbr",
    "location.streetAddress",
    "location.streetName",
    "location.street",
    "location.timeZone",
    "location.zipCode",
  ] as const,
  animal: [
    "animal.bear",
    "animal.cat",
    "animal.cetacean",
    "animal.cow",
    "animal.crocodilia",
    "animal.dog",
    "animal.fish",
    "animal.horse",
    "animal.insect",
    "animal.lion",
    "animal.rabbit",
    "animal.rodent",
    "animal.snake",
    "animal.type",
    "animal.bird",
  ] as const,
  color: [
    "color.cmyk",
    "color.hsl",
    "color.human",
    "color.hwb",
    "color.lab",
    "color.lch",
    "color.rgb",
  ] as const,
  commerce: [
    "commerce.department",
    "commerce.price",
    "commerce.productName",
    "commerce.productAdjective",
    "commerce.productMaterial",
    "commerce.product",
    "commerce.productDescription",
  ] as const,
  person: ["person.fullName", "person.firstName", "person.lastName"] as const,
  image: ["image.avatar", "image.url"] as const,
  date: ["date.past", "date.recent"] as const,
};

export const httpMethods = ["GET", "POST", "PUT", "DELETE"];
