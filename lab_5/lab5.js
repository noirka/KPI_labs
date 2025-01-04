class EventEmitter {
    constructor() {
      this.events = {};
    }

    on(event, listener) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(listener);
    }

    emit(event, ...args) {
      if (this.events[event]) {
        this.events[event].forEach(listener => {
          listener(...args);
        });
      }
    }

    off(event, listener) {
      if (this.events[event]) {
        this.events[event] = this.events[event].filter(l => l !== listener);
      }
    }
   once(event, listener){
    const onceListener = (...args) => {
        listener(...args);
        this.off(event, onceListener);
    }
    this.on(event, onceListener);
  }
  }

async function entity1(emitter) {
  setInterval(() => {
    const message = `Message from Entity 1 at ${new Date().toLocaleTimeString()}`;
    emitter.emit('message', 'entity1', message);
  }, Math.random() * 2000);
}

async function entity2(emitter) {
  emitter.on('message', (sender, message) => {
      if(sender === 'entity1')
      console.log(`Entity 2 received: ${message}`);
  });
}

async function entity3(emitter) {
  emitter.on('message', (sender, message) => {
      if(sender === 'entity1')
      console.log(`Entity 3 received: ${message}`);
  });
}

async function entity4(emitter){
    emitter.once('message', (sender, message) => {
        if(sender === 'entity1')
            console.log('Entity 4 received once:' + message);
    })
}

async function main() {
    const emitter = new EventEmitter();
    entity1(emitter);
    entity2(emitter);
    entity3(emitter);
    entity4(emitter);
}
main();
