/**
 * Status of Carrier assigned to an Order
 *
 * @enum {number}
 */
enum ORDER_CARRIER_STATUS {
  /**
   * No Status
   * Shipping was not planed or started yet for this Order by any carrier, i.e. no carrier assigned to an order
   */
  NoCarrier = 0,

  /**
   * Some carrier decide to pick up this order and will start moving to warehouse soon.
   * Carrier change order status to this when see packaged order is waiting him in warehouse
   */
  CarrierSelectedOrder = 1,

  /**
   * Some carrier arrived to Warehouse and picked up an order products for delivery
   * (carrier change order status to this)
   */
  CarrierPickedUpOrder = 2,

  /**
   * Some carrier start delivery of order products to customer
   */
  CarrierStartDelivery = 3,

  /**
   * Some carrier arrived to customer location
   */
  CarrierArrivedToCustomer = 4,

  /**
   * Order is given to the client (delivery completed)
   */
  DeliveryCompleted = 5,

  /**
   * Carrier have issues during delivery (e.g. incident happens or carrier can't found address, etc)
   */
  IssuesDuringDelivery = 204,

  /**
   * Carrier arrives to customer location and client refuse to take order
   */
  ClientRefuseTakingOrder = 205,
}

// TODO: this should be translated
export function carrierStatusToString(status: ORDER_CARRIER_STATUS): string {
  switch (status) {
    case ORDER_CARRIER_STATUS.NoCarrier:
      return "No Carrier";

    case ORDER_CARRIER_STATUS.CarrierSelectedOrder:
      return "Order Selected For Delivery";

    case ORDER_CARRIER_STATUS.CarrierPickedUpOrder:
      return "Order Picked Up";

    case ORDER_CARRIER_STATUS.CarrierStartDelivery:
      return "Order In Delivery";

    case ORDER_CARRIER_STATUS.CarrierArrivedToCustomer:
      return "Arrived To Client";

    case ORDER_CARRIER_STATUS.DeliveryCompleted:
      return "Delivered";

    case ORDER_CARRIER_STATUS.IssuesDuringDelivery:
      return "Delivery Issues";

    case ORDER_CARRIER_STATUS.ClientRefuseTakingOrder:
      return "Client Refuse to Take Order";

    default:
      return "BAD_STATUS";
  }
}

export default ORDER_CARRIER_STATUS;
