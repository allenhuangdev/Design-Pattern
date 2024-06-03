// Mediator interface
interface ChatRoomMediator {
  addUser(user: ChatRoomUser): void;
  sendMessage(user: ChatRoomUser, msg: string): void;
}

// Colleague abstract class with Mediator reference
abstract class ChatRoomUser {
  constructor(public name: string, protected mediator: ChatRoomMediator) {}

  abstract send(msg: string): void;
  abstract receive(msg: string): void;
}

// Colleague class implementation
class ChatRoomUserImpl extends ChatRoomUser {
  constructor(name: string, mediator: ChatRoomMediator) {
    super(name, mediator);
  }

  send(msg: string): void {
    // Call the Mediator to send the message to others
    this.mediator.sendMessage(this, msg);
  }

  receive(msg: string): void {
    console.log(`${this.name} received: ${msg}`);
  }
}

// Mediator implementation
class ChatRoomMediatorImpl implements ChatRoomMediator {
  private userList: ChatRoomUser[] = [];

  addUser(user: ChatRoomUser): void {
    this.userList.push(user);
  }

  sendMessage(user: ChatRoomUser, msg: string): void {
    // Send message to all users except the sender
    this.userList.filter((u) => u !== user).forEach((u) => u.receive(msg));
  }
}

// Main function
function main(): void {
  const mediator: ChatRoomMediator = new ChatRoomMediatorImpl();

  // Create and associate users with the mediator
  const bob: ChatRoomUser = new ChatRoomUserImpl("Bob", mediator);
  const alice: ChatRoomUser = new ChatRoomUserImpl("Alice", mediator);
  const tom: ChatRoomUser = new ChatRoomUserImpl("Tom", mediator);

  // Add users to the mediator
  mediator.addUser(bob);
  mediator.addUser(alice);
  mediator.addUser(tom);

  // Send messages
  bob.send("How are you?");
  alice.send("I'm fine.");
  tom.send("Bye");
}

// Run the program
main();
