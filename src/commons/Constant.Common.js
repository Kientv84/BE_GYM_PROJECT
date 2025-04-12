const CK_RESULTS = {
  SUCCESS: 1,
  ERROR: -1,
  DATA_EXIST: 2,
  DATA_USING: 4,
};

CK_CONSTANT_TYPE_PRODUCT = {
  GenderProduct: 1001,
  TypeProduct: 1002,

  ///// classification
  Gender: {
    men: "1001-001",
    woman: "1001-002",
    accessories: "1001-003",
  },
  Type: {
    top: "1002-001",
    bottom: "1002-002",
    accessory: "1002-005",
    shoes: "1002-006",
  },

  //// product detail
  top_detail: {
    tank_top: "1002-001-001",
    oversize: "1002-001-002",
    jacket: "1002-001-003",
  },
  short_detail: {
    long_pants: "1002-002-001",
    short_pants: "1002-002-002",
  },
  accessory_detail: {
    wrist_wrap: "1002-005-001",
    lifting_strap: "1002-005-002",
    lifting_belt: "1002-005-003",
  },
  shoes_detail: {
    weight_lifting_shoes: "1002-006-001",
    fashion_shoes: "1002-006-002",
  },
};

module.exports = {
  CK_RESULTS,
  CK_CONSTANT_TYPE_PRODUCT,
};
