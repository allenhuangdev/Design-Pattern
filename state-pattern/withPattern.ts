// The common interface between OpenState and InCartState.
interface State {
  addToCart(userId: number): boolean;
}

class OpenState implements State {
  context: Ticket;

  constructor(ticket: Ticket) {
    this.context = ticket;
  }

  // Logic of addToCart() when the state is OpenState.
  public addToCart(userId: number): boolean {
    this.context.userId = userId;
    this.context.setState(new InCartState(this.context));
    return true;
  }
}

class InCartState implements State {
  context: Ticket;

  constructor(ticket: Ticket) {
    this.context = ticket;
  }

  // Logic of addToCart() when the state is InCartState.
  public addToCart(userId: number): boolean {
    if (this.context.userId == userId) {
      console.log("You have already added this ticket to your cart.");
      return true;
    } else {
      console.log("This ticket has been added by someone.");
      return false;
    }
  }
}

class Ticket {
  seatId: number;
  userId: number | null;
  state: State;

  constructor(seatId: number) {
    this.seatId = seatId;
    this.state = new OpenState(this);
  }

  // A method which is not related to states.
  public printTicket() {
    console.log(`This ticket's seat id is ${this.seatId}`);
  }

  public setState(state: State) {
    this.state = state;
  }

  // Delegate the state specific logic to current state object.
  public addToCart(userId: number): boolean {
    return this.state.addToCart(userId);
  }
}

const ticket = new Ticket(0);
const user0 = 0;
const user1 = 1;

// Output: This ticket's seat id is 0.
ticket.printTicket();

console.log("It should be able to be added by user 0.");
ticket.addToCart(user0); // Return: true

console.log("It should return true and print the information.");
// Output: You have already added this ticket to your cart.
ticket.addToCart(user0); // Return: true

console.log("It should not be able to be added to cart by user 1.");
// Output: This ticket has been added by someone.
ticket.addToCart(user1); // Return: false
