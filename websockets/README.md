## Gateways

Gateways operate on an event-driven architecture, where events are emitted and consumed by clients and the server. Clients can listen for specific events and the server can emit events to trigger actions on the client side.

1. Gateways in Nest.js are implemented using decorators and a class-based approach. Agateway class is decorated with the @WebSocketGateway() decorator, which marks it as aWebSocket gateway. Within the gateway class, you can define event handlers to handleWebSocket events like connection, disconnection, and message reception. Gateways can be treated as providers; this means they can inject dependencies through the class constructor. Also, gateways can be injected by other classes (providers and controllers) as well.
2. You can access to webSocket server by using this decorator. You can find out who has connected to your Gateway and their socket ID
3. I choose onModuleInit to check the WebSocket connection with the client
4. The @SubscribeMessage('message') decorator is applied to the newMessage method. This decorator specifies that this method should be executed when a WebSocket message with the event name 'message' is received from the client.

- The @MessageBody() decorator is applied to the data parameter. This decorator instructs Nest.js to extract the message payload from the incoming WebSocket message and bind it to the data parameter.

## Return data from the message event using Observable

- Returning data from the message event utilizing Observables in Nest.js aligns with reactive programming principles, facilitating a stream-based approach to handle data sequences over time.
- This method is crucial for scenarios requiring real-time updates or complex asynchronous operations, where Observables can efficiently manage and deliver data payloads as events occur.

- As a best practice, it's advisable to leverage the RxJS library, which Nest.js integrates seamlessly with, to create Observables.
- This enables fine-grained control over event handling, allowing for the composition of sophisticated data handling and transformation strategies, essential for robust and reactive application architectures.
