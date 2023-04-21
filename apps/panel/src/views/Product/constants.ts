export enum PRODUCT_DRAWER {
  NONE = 0,
  CREATE = 1,
}

export enum PRODUCT_MODAL {
  NONE = 0,
  CATEGORY_CREATE = 1,
  PRICE_VARIANT_CREATE = 2,
}

export const COLUMNS = [
  { title: "Name", key: "name", dataIndex: "title" },
  { title: "Category", key: "category", dataIndex: "categories" },
  { title: "Inventory", key: "inventory", dataIndex: "warehourse.count" },
  { title: "Prices", key: "prices", dataIndex: "warehourse.prices" },
];
