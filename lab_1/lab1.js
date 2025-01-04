async function asyncMap(array, callback) {
  const results = [];
  for (const item of array) {
    const result = await callback(item);
    results.push(result);
  }
  return results;
}

async function asyncMapWithDebounce(array, callback, debounceTime = 0) {
    const results = [];
    for (const item of array) {
        const startTime = Date.now();
        const result = await callback(item);
        const endTime = Date.now();
        const executionTime = endTime - startTime;

        if (executionTime < debounceTime) {
          await new Promise(resolve => setTimeout(resolve, debounceTime - executionTime));
        }

        results.push(result);
    }
    return results;
}


function simulateAsyncOperation(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value * 2);
    }, Math.random() * 1000);
  });
}

async function example1() {
  const numbers = [1, 2, 3, 4, 5];
  console.log("Original array:", numbers);
  const doubledNumbers = await asyncMap(numbers, simulateAsyncOperation);
  console.log("Doubled numbers:", doubledNumbers);
}

async function example2() {
    const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Peter' },
    ];
    console.log("Original array:", users);

    const userNames = await asyncMap(users, async (user) => {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
        return user.name;
    });

    console.log("User names:", userNames);
}


async function example3() {
    const numbers = [1, 2, 3, 4, 5];
    console.log("Original array:", numbers);

    const debouncedResults = await asyncMapWithDebounce(numbers, async (number) => {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 200));
        return number * 3;
    }, 300);

    console.log("Debounced results:", debouncedResults);
}

example1();
example2();
example3();
