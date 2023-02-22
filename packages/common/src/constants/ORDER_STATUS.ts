/**
 * Status of an Order (this will apply after user complete to fill in and submit order)
 *
 * @enum {number}
 */
export enum ORDER_STATUS {
  /**
   * No status, user not yet submit order to our server
   */
  Draft = 0,
  /**
   * User already submit order to our server, order now confirmed by an admin
   */
  Confirmed = 1,
  /**
   * User cancelled order
   */
  Cancelled = 2,
  /**
   * Order is sent to delivery
   */
  Delivery = 3,
}
