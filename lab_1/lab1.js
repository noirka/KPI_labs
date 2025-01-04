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
             await delay(debounceTime - executionTime); // Використовуємо нашу функцію delay
          }
          results.push(result);
      }
      return results;
  }
  
  // Нова функція для затримки
  async function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  
  async function simulateAsyncOperation(value) {
    await delay(Math.random() * 1000); // Використовуємо нашу функцію delay
    return value * 2;
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
          await delay(Math.random() * 500);
          return user.name;
      });
  
      console.log("User names:", userNames);
  }
  
  
  async function example3() {
      const numbers = [1, 2, 3, 4, 5];
      console.log("Original array:", numbers);
  
      const debouncedResults = await asyncMapWithDebounce(numbers, async (number) => {
          await delay(Math.random() * 200);
          return number * 3;
      }, 300);
  
      console.log("Debounced results:", debouncedResults);
  }
  
  
  async function main() {
      await example1();
      await example2();
      await example3();
  }
  
  main();
