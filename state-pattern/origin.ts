class Ticket {
  static readonly openState = "open";
  static readonly inCartState = "inCart";

  seatId: number;
  userId: number | null;
  state: string;

  constructor(seatId: number) {
    this.seatId = seatId;
    this.state = "open";
  }

  public printTicket() {
    console.log(`This ticket's seat id is ${this.seatId}.`);
  }

  public addToCart(userId: number): boolean {
    if (this.state == Ticket.openState) {
      this.state = Ticket.inCartState;
      this.userId = userId;
      return true;
    } else if (this.state == Ticket.inCartState) {
      if (this.userId == userId) {
        console.log("You have already added this ticket to your cart.");
        return true;
      } else {
        console.log("This ticket has been added by someone.");
        return false;
      }
    }
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
