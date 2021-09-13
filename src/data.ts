export type Name = {
  id: number;
  first: string;
  last: string;
};

const names: Name[] = [
  { id: 1, first: "Oliver", last: "Hansen" },
  { id: 2, first: "Van", last: "Henry" },
  { id: 3, first: "April", last: "Tucker" },
  { id: 4, first: "Ralph", last: "Hubbard" },
  { id: 5, first: "Omar", last: "Alexander" },
  { id: 6, first: "Carlos", last: "Abbott" },
  { id: 7, first: "Miriam", last: "Wagner" },
  { id: 8, first: "Bradley", last: "WilkersonExtraLongAndSmooth" },
  { id: 9, first: "Virginia", last: "Andrews" },
  { id: 10, first: "Kelly", last: "Snyder" }
];

function random(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const OPTIONS = Array.from(new Array(10000))
  .map(() => random(10 + Math.ceil(Math.random() * 20)))
  .sort((a: string, b: string) =>
    a.toUpperCase().localeCompare(b.toUpperCase())
  );

export { names, OPTIONS };
