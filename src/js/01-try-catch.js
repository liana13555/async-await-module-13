// Обработка ошибок с try...catch - код будет выполняться дальше если даже какая то часть упала
//  - Синтаксис
//  - Какие ошибки ловит
//    - ❌ ошибки парсинга (parsing errors) - не умеет отлавливать синтаксические ошибки
//    - ✅ ошибки выполнения (runtime errors)
//  - Ловит только ошибки в синхронном коде
//    - Как словить ошибку в асинхронном коде
//  - Объект ошибки
//    - name
//    - message
//    - stack
//  - Блок catch без объекта ошибки

try {
  console.log('Внутри try до myVar');
  myVar;
  console.log('Внутри try после myVar');
} catch (error) {
  // console.log(error);
  console.log('Ошибка!');
}

console.log('После try...catch');

// setTimeout(() => {
//   try {
//     myVar;
//   } catch (error) {
//     console.log('Ошибка!');
//   }
// }, 1000)

// console.log('После try...catch');
