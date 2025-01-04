async function* largeDataGenerator(count, delayMs) {
    for (let i = 0; i < count; i++) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        yield { id: i, data: `Data ${i}` };
    }
}

async function processLargeData(dataIterator, processFn) {
    for await (const item of dataIterator) {
        await processFn(item);
    }
}

async function simulateAsyncProcessing(item) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
    console.log("Processing item:", item);
}


async function example4() {
    console.log("Start processing large data...");
    const dataStream = largeDataGenerator(10, 200);
    await processLargeData(dataStream, simulateAsyncProcessing);
    console.log("Finished processing large data.");
}

async function example5() {
    console.log("Start processing another large data stream...");

    const anotherDataStream = largeDataGenerator(5, 300);
    let count = 0;
    await processLargeData(anotherDataStream, async (item) => {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 300));
        count++;
        console.log('processing with count:' + count, item);
    });
      console.log('finished processing another large stream')
}


async function main() {
    await example4();
    await example5();
}
main();
