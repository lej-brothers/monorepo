/**
 * Used in translation of fields depending of selected locale
 *
 * @export
 * @interface ILocaleMember
 */
export interface ILocaleMember {
  _id: string;
  locale: string;
  value?: string;
}
