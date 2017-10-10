const centers = [{
  id: 1,
  name: 'Global Plasticos',
  location: {
    address: 'Av. Caldeia 150',
    municipality: 'Porto Alegre',
    state: 'RS',
    zip: '91130-540'
  },
  telephone: '+55 (51) 3364-4115',
  typeofWaste: {
    aluminium: false,
    compost: false,
    cookingOil: false,
    ewaste: false,
    furniture: false,
    glass: false,
    greenWaste: false,
    hazardousWaste: false,
    paper: false,
    plastic: true
  }

}, {
  id: 2,
  name: 'Fkl Recargas de Cartuchos e Toners',
  location: {
    address: 'R. Germano Hasslocher 288 s 1',
    municipality: 'Porto Alegre',
    state: 'RS',
    zip: '90160-050'
  },
  telephone: '+55 (51) 3232-9300',
  typeofWaste: {
    aluminium: false,
    compost: false,
    cookingOil: false,
    ewaste: true,
    furniture: false,
    glass: false,
    greenWaste: false,
    hazardousWaste: false,
    paper: false,
    plastic: false
  }

}];

let nextId = 3;

export const resolvers = {
  Query: {
    centers: () => {
      return centers;
    },
  },
  Mutation: {
    addCenter: (root, args) => {
      const centerCreator = { id: nextId++, name: args.name };
      centers.push(centerCreator);
      return centerCreator;
    },
  },
};
