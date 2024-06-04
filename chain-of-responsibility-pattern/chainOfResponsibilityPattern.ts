export type PaymentMethod = "creditcard" | "paypal" | "banktransfer";

export type Payment = {
  method: PaymentMethod;
  amount: number;
  cardNumber: string;
  cvv: string;
  expirationDate: string;
};

interface PaymentHandler {
  setNext(handler: PaymentHandler): PaymentHandler;
  handlePayment(payment: Payment): Promise<boolean>;
}

class CreditCardHandler implements PaymentHandler {
  private nextHandler: PaymentHandler;

  setNext(handler: PaymentHandler): PaymentHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handlePayment(payment: Payment): Promise<boolean> {
    if (payment.method === "creditcard") {
      console.log("Processing Credit Card Payment...");
      return true;
    } else if (this.nextHandler) {
      return this.nextHandler.handlePayment(payment);
    } else {
      return false;
    }
  }
}

class PayPalHandler implements PaymentHandler {
  private nextHandler: PaymentHandler;

  setNext(handler: PaymentHandler): PaymentHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handlePayment(payment: Payment): Promise<boolean> {
    if (payment.method === "paypal") {
      console.log("Processing PayPal Payment...");
      return true;
    } else if (this.nextHandler) {
      return this.nextHandler.handlePayment(payment);
    } else {
      return false;
    }
  }
}

class BankTransferHandler implements PaymentHandler {
  private nextHandler: PaymentHandler;

  setNext(handler: PaymentHandler): PaymentHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handlePayment(payment: Payment): Promise<boolean> {
    if (payment.method === "banktransfer") {
      console.log("Processing Bank Transfer Payment...");
      return true;
    } else if (this.nextHandler) {
      return this.nextHandler.handlePayment(payment);
    } else {
      return false;
    }
  }
}

const creditCardHandler = new CreditCardHandler();
const payPalHandler = new PayPalHandler();
const bankTransferHandler = new BankTransferHandler();

creditCardHandler.setNext(payPalHandler).setNext(bankTransferHandler);

const payment: Payment = {
  method: "creditcard",
  amount: 100,
  cardNumber: "1234567890",
  cvv: "111",
  expirationDate: "01/24",
};

const isPaymentSuccessful = await creditCardHandler.handlePayment(payment);

console.log("Payment Successful:", isPaymentSuccessful);
