// Синтаксис async/await - асинхронная ф-я, возвращает промис
// Последовательные операции
// Паралельные операции с Promise.all()
// try...catch


function getFruit(name) {
  const fruits = {
    strawberry: '🍓',
    kiwi: '🥝 ',
    apple: '🍎',
  };

   return new Promise((resolve, reject) =>
    setTimeout(() => resolve(fruits[name]), 500),
  );
}

// function makeSmoothie() {
//   getFruit('apple').then(apple => {
//     console.log(apple);

//     getFruit('kiwi').then(apple => {
//       console.log(apple);
//     });
//   });  
// }      // перепишем с async
//------------------------------------

// async function aMakeSmoothie() {
//   console.time('aMakeSmoothie');   
//   const apple = await getFruit('apple');   // подождало здесь 500 ms
//   console.log(apple);

//   const kiwi = await getFruit('kiwi');  // подождало здесь 500 ms
//   console.log(kiwi);
//   console.timeEnd('aMakeSmoothie'); // aMakeSmoothie: 1005.93701171875 ms
// }
// aMakeSmoothie();


// async function aMakeSmoothie() {
//   console.time('aMakeSmoothie');
//   const apple = getFruit('apple');
//   const kiwi = getFruit('kiwi');
//   const berry = getFruit('strawberry');
  
//   const fruits = await Promise.all([apple, kiwi, berry]);
//   console.log(fruits);
 
//   console.timeEnd('aMakeSmoothie'); // aMakeSmoothie: 502.875244140625 ms
// }

// aMakeSmoothie();
//----------------- Обрабатываем ошибки через try...catch

async function aMakeSmoothie() {
  try {
    console.time('aMakeSmoothie');
    const apple = getFruit('apple');
    const kiwi = getFruit('kiwi');
    const berry = getFruit('strawberry');

    const fruits = await Promise.all([apple, kiwi, berry]);
    console.log(fruits);
    console.timeEnd('aMakeSmoothie');

    return fruits;
  } catch (error) {
    console.log('Ошибка');
  }
}

aMakeSmoothie();


//======================================================

// async function fn () {}

// const fn  = async function () {}  - function expression

// const arr = async () => {}        - стрелочная ф-я

// const x = {                       - метод объекта
//   async getname () {} 
// }

// class X {                        - метод класса
//   async getName () {}
// }
