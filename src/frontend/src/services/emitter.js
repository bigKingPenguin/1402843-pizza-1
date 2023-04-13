const events = {};

const on = (eventName, callback) => {
  if (typeof events[eventName] === 'undefined') {
    events[eventName] = [];
  }
  events[eventName].push(callback);
};

const off = (eventName, callback) => {
  events[eventName] = events[eventName].filter(eventCallback => callback !== eventCallback);
};

const emit = (eventName, data = undefined) => {
  const event = events[eventName];
  event && event.forEach(callback => callback.call(null, data));
};

export default {on, off, emit};
