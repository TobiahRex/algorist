# Observables

1. Create a collection of registered callbacks.
2. Provide a contract for emitting events to emitters.
3. When an event is emitted, call all the callbacks subscribed to that event.

## Use Cases

1. Event-driven systems
2. Asynchronous programming
3. Reactive programming

```python
class Observable:
    def __init__(self):
        self.callbacks = []

    def subscribe(self, callback):
        self.callbacks.append(callback)

    def emit(self, event):
        for callback in self.callbacks:
            callback(event)
```

