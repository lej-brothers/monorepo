import { IImage } from '../types/IImage';
import CARRIER_STATUS from "../constants/CARRIER_STATUS";

export interface ICarrier {
  _id: string;
  name: string;
  email?: string;
  numberOfDeliveries?: number;
  apartment?: string;

  /**
   * True carrier enabled in system,
   * False carrier completely disabled in the system (e.g. was fired / banned)
   * This setting is set by Admin, not by carrier itself
   * (he/she set 'status' field instead in the carrier mobile app)
   *
   * @type {boolean}
   * @memberof ICarrier
   */
  isDeleted?: boolean;

  // Current carrier status (set via his mobile app), e.g. Online or Offline
  status?: CARRIER_STATUS;

  phone: string;

  deliveriesCountToday?: number;

  /**
   * Url to Carrier logo/photo
   *
   * @type {string}
   * @memberof ICarrier
   */
  logo: IImage;
}
