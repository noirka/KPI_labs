function promiseMap(array, callback) {
  return Promise.all(array.map(item => callback(item)));
}

function promiseMapWithConcurrency(array, callback, concurrencyLimit = Infinity) {
    return new Promise((resolve, reject) => {
        const results = [];
        let index = 0;
        let running = 0;

        function run() {
            if (index === array.length) {
                if (running === 0) {
                   resolve(results);
                }
                return;
            }

            while (running < concurrencyLimit && index < array.length) {
                const currentIndex = index;
                index++;
                running++;

                callback(array[currentIndex])
                  .then((result) => {
                      results[currentIndex] = result;
                  })
                  .catch(reject)
                  .finally(() => {
                      running--;
                      run();
                  })
            }
        }
        run();
    });
}


function simulateAsyncOperationPromise(value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value * 2);
        }, Math.random() * 1000);
    });
}

async function promiseExample1() {
    const numbers = [1, 2, 3, 4, 5];
    console.log("Original array (promise):", numbers);
    promiseMap(numbers, simulateAsyncOperationPromise)
    .then((doubledNumbers) => {
      console.log("Doubled numbers (promise):", doubledNumbers);
    })
}


async function promiseExample2() {
    const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Peter' },
    ];
    console.log("Original array (promise):", users);

     promiseMap(users, (user) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(user.name);
            }, Math.random() * 500);
        });
    }).then((userNames) => {
        console.log("User names (promise):", userNames);
    });
}


async function asyncAwaitExample1() {
  const numbers = [1, 2, 3, 4, 5];
  console.log("Original array (async/await):", numbers);
  const doubledNumbers = await promiseMap(numbers, simulateAsyncOperationPromise);
  console.log("Doubled numbers (async/await):", doubledNumbers);
}


async function asyncAwaitExample2() {
    const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Peter' },
    ];
    console.log("Original array (async/await):", users);

    const userNames = await promiseMap(users, (user) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(user.name);
            }, Math.random() * 500);
        });
    });
    console.log("User names (async/await):", userNames);
}


async function parallelExample() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    console.log("Original array (parallel):", numbers);

    const doubledNumbers = await promiseMapWithConcurrency(numbers, simulateAsyncOperationPromise, 3);
    console.log("Doubled numbers (parallel):", doubledNumbers);
}


promiseExample1();
promiseExample2();
asyncAwaitExample1();
asyncAwaitExample2();
parallelExample();
