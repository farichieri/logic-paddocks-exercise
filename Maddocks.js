// Responsables de los cuarteles
const paddockManagers = [
    { id: 1, taxNumber: '132254524', name: 'JUAN TAPIA BURGOS'},
    { id: 2, taxNumber: '143618668', name: 'EFRAIN SOTO VERA'},
    { id: 3, taxNumber: '78903228', name: 'CARLOS PEREZ GONZALEZ'},
    { id: 4, taxNumber: '176812737', name: 'ANDRES VIÑALES CIENFUEGOS'},
    { id: 5, taxNumber: '216352696', name: 'OSCAR PEREZ ZUÑIGA'},
    { id: 6, taxNumber: '78684747', name: 'JOAQUIN ANDRADE SANDOVAL' }
  ];
  
  // Tipo de cuartel, en el cual se utiliza el tipo de producto plantado
  const paddockType = [
    { id: 1, name: 'PALTOS' },
    { id: 2, name: 'AVELLANOS' },
    { id: 3, name: 'CEREZAS' },
    { id: 4, name: 'NOGALES' },
  ]
  
  // Un paddock representa un cuartel de un campo (Entiéndase también como potrero o parcela), el área está representada en m2, harvestYear es el año en el que se sembró el cuartel
  const paddocks = [
    { paddockManagerId: 6, farmId: 1, paddockTypeId: 1, harvestYear: 2019, area: 1200 },
    { paddockManagerId: 1, farmId: 3, paddockTypeId: 4, harvestYear: 2019, area: 500 },
    { paddockManagerId: 5, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 20000 },
    { paddockManagerId: 2, farmId: 2, paddockTypeId: 3, harvestYear: 2021, area: 8401},
    { paddockManagerId: 3, farmId: 1, paddockTypeId: 1, harvestYear: 2020, area: 2877 },
    { paddockManagerId: 5, farmId: 2, paddockTypeId: 2, harvestYear: 2017, area: 15902 },
    { paddockManagerId: 3, farmId: 3, paddockTypeId: 2, harvestYear: 2018, area: 1736 },
    { paddockManagerId: 2, farmId: 3, paddockTypeId: 3, harvestYear: 2020, area: 2965 },
    { paddockManagerId: 4, farmId: 3, paddockTypeId: 4, harvestYear: 2018, area: 1651 },
    { paddockManagerId: 5, farmId: 1, paddockTypeId: 1, harvestYear: 2018, area: 700 },
    { paddockManagerId: 1, farmId: 2, paddockTypeId: 1, harvestYear: 2019, area: 7956 },
    { paddockManagerId: 5, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 3745 },
    { paddockManagerId: 6, farmId: 1, paddockTypeId: 3, harvestYear: 2021, area: 11362 },
    { paddockManagerId: 2, farmId: 3, paddockTypeId: 3, harvestYear: 2021, area: 300 },
    { paddockManagerId: 3, farmId: 2, paddockTypeId: 2, harvestYear: 2020, area: 19188 },
    { paddockManagerId: 3, farmId: 1, paddockTypeId: 1, harvestYear: 2019, area: 17137 },
    { paddockManagerId: 4, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 100 },
    { paddockManagerId: 2, farmId: 1, paddockTypeId: 3, harvestYear: 2019, area: 11845 },
    { paddockManagerId: 5, farmId: 2, paddockTypeId: 1, harvestYear: 2018, area: 15969 },
    { paddockManagerId: 1, farmId: 3, paddockTypeId: 1, harvestYear: 2029, area: 10420 },
    { paddockManagerId: 5, farmId: 2, paddockTypeId: 3, harvestYear: 2010, area: 3200 },
    { paddockManagerId: 6, farmId: 1, paddockTypeId: 2, harvestYear: 2012, area: 10587 },
    { paddockManagerId: 2, farmId: 2, paddockTypeId: 2, harvestYear: 2018, area: 16750 }
  ];
  
  const farms = [
    { id: 1, name: 'AGRICOLA SANTA ANA' },
    { id: 2, name: 'VINA SANTA PAULA' },
    { id: 3, name: 'FORESTAL Y AGRICOLA LO ENCINA' }
  ];
  
  // Tip: Una hectárea equivale a 10.000m2
  
  // 0 Arreglo con los ids de los responsables de cada cuartel
  function listPaddockManagerIds() {
    return paddockManagers.map(paddock => paddock.id)
  };
  console.log(listPaddockManagerIds())
  
  // 1 Arreglo con los ruts de los responsables de los cuarteles, ordenados por nombre
  function listPaddockManagersByName() {
    return paddockManagers.map(rut => rut).sort((rutA, rutB) => rutA.name.localeCompare(rutB.name))
  };
  console.log(listPaddockManagersByName());

  // 2 Arreglo con los nombres de cada tipo de cultivo, ordenados decrecientemente por la suma TOTAL de la cantidad de hectáreas plantadas de cada uno de ellos.
  function sortPaddockTypeByTotalArea() {
    return paddockType
      .map((type) => {
        return [
          type.name,
          paddocks
            .filter((paddock) => paddock.paddockTypeId === type.id)
            .reduce((acc, curr) => {
              return acc + curr.area;
            }, 0),
        ];
      })
      .sort((a, b) => b[1] - a[1])
      .map((result) => result[0]);
  }
  console.log(sortPaddockTypeByTotalArea())
 
  // 3 Arreglo con los nombres de los administradores, ordenados decrecientemente por la suma TOTAL de hectáreas que administran.
  function sortFarmManagerByAdminArea(paddockManagers, paddocks) {
    return paddockManagers
      .map((manager) => [
        manager.name,
        paddocks
          .filter((paddock) => paddock.paddockManagerId === manager.id)
          .reduce((acc, curr) => {
            return acc + curr.area;
          }, 0),
      ])
      .sort((a, b) => b[1] - a[1])
      .map((result) => result[0]);
  }
  console.log(sortFarmManagerByAdminArea(paddockManagers, paddocks))
  
  // 4 Objeto en que las claves sean los nombres de los campos y los valores un arreglo con los ruts de sus administradores ordenados alfabéticamente por nombre.
  function farmManagerNames() {
    const obj = {};

    for (key in paddockType) {
      const paddockManagerIds = paddocks
        .filter((paddock) => paddock.paddockTypeId === paddockType[key].id)
        .map((paddock) => paddock.paddockManagerId);

      const names = [...new Set(paddockManagerIds)]
        .map((id) => paddockManagers.find((manager) => manager.id === id))
        .sort((a, b) => a.name.localeCompare(b.name));

      obj[paddockType[key].name] = names;
    }
    return obj;
  }
  console.log(farmManagerNames())
  
  // 5 Arreglo ordenado decrecientemente con los m2 totales de cada campo que tengan más de 2 hectáreas en Paltos
  function biggestAvocadoFarms() {
    const obj = {};
    paddocks
      .filter((paddock) => paddock.paddockTypeId === 1)
      .forEach((paddock) => {
        !obj[paddock.farmId]
          ? (obj[paddock.farmId] = paddock.area)
          : (obj[paddock.farmId] += paddock.area);
      });

    return Object.values(obj)
      .filter((area) => area > 20000)
      .sort((a, b) => b - a);
  }
  console.log(biggestAvocadoFarms())
  
  // 6 Arreglo con nombres de los administradores de la FORESTAL Y AGRÍCOLA LO ENCINA, ordenados por nombre, que trabajen más de 1000 m2 de Cerezas
  function biggestCherriesManagers() {
    const paddocksMatching = paddocks.filter(
      (paddock) =>
        paddock.farmId === 3 &&
        paddock.paddockTypeId === 3 &&
        paddock.area > 1000
    );

    const managers = paddockManagers
      .filter(
        (manager) =>
          manager.id ==
          paddocksMatching.map((paddock) => paddock.paddockManagerId)
      )
      .map((manager) => manager.name);

    return managers.sort((a, b) => a.localeCompare(b));
  }
  console.log(biggestCherriesManagers());

  // 7 Objeto en el cual las claves sean el nombre del administrador y el valor un arreglo con los nombres de los campos que administra, ordenados alfabéticamente
  function farmManagerPaddocks() {
    const obj = {};

    for (key in paddockManagers) {
      const manager = paddockManagers[key];
      const paddocksManager = [
        ...new Set(
          paddocks
            .filter((paddock) => paddock.paddockManagerId === manager.id)
            .map((paddock) => paddock.farmId)
        ),
      ];
      const farmNames = paddocksManager
        .map((id) => farms.find((farm) => farm.id === id))
        .map((farm) => farm.name)
        .sort();

      obj[manager.name] = farmNames;
    }
    return obj;
  }
  console.log(farmManagerPaddocks())
  
  // 8 Objeto en que las claves sean el tipo de cultivo concatenado con su año de plantación (la concatenación tiene un separador de guión ‘-’, por ejemplo AVELLANOS-2020) y 
  // el valor otro objeto en el cual la clave sea el id del administrador y el valor el nombre del administrador
  function paddocksManagers() {
    const obj = {};

    for (key in paddocks) {
      const subObj = {};

      const typeId = paddocks[key].paddockTypeId;
      const typeYear = paddocks[key].harvestYear;
      const typeName = paddockType.find((type) => type.id === typeId).name;

      paddockMatching = paddocks.filter(
        (paddock) =>
          paddock.harvestYear === typeYear && paddock.paddockTypeId === typeId
      );

      for (key in paddockMatching) {
        const managerId = paddockMatching[key].paddockManagerId;
        const managerName = paddockManagers.find(
          (manager) => manager.id === managerId
        ).name;
        subObj[managerId] = managerName;
      }

      obj[`${typeName}-${typeYear}`] = subObj;
    }
    return obj;
  }
  console.log(paddocksManagers())

  //  9 Agregar nuevo administrador con datos ficticios a "paddockManagers" y agregar un nuevo cuartel de tipo NOGALES con 900mts2, año 2017 de AGRICOLA SANTA ANA, administrado por este nuevo administrador 
  //  Luego devolver el lugar que ocupa este nuevo administrador en el ranking de la pregunta 3.
  // No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
  function newManagerRanking() {
    const newPaddockManagers = paddockManagers.concat({
      id: 7,
      taxNumber: '13225452554',
      name: 'FABRICIO RICHIERI',
    });
    const newPaddocks = paddocks.concat({
      paddockManagerId: 7,
      farmId: 1,
      paddockTypeId: 4,
      harvestYear: 2017,
      area: 900,
    });
    return sortFarmManagerByAdminArea(newPaddockManagers, newPaddocks);
  }
  console.log(newManagerRanking());