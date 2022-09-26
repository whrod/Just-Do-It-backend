const { productDao } = require('../models');

const getProducts = async (sort, color, brand, size, limit, offset) => {
  let sortColumn;
  let sortOption;
  let statementWhere = 'WHERE po.stock != 0 ';

  if (typeof size !== 'string' && size !== undefined) {
    for (let i = 0; i < size.length; i++) {
      if (i == 0) statementWhere += `AND (s.foot_size = ${size[i]} `;
      else if (i == size.length - 1)
        statementWhere += `OR s.foot_size = ${size[i]}) `;
      else statementWhere += `OR s.foot_size = ${size[i]} `;
    }
  }
  if (typeof color !== 'string' && color !== undefined) {
    for (let i = 0; i < color.length; i++) {
      if (i == 0) statementWhere += `AND (c.id = ${color[i]} `;
      else if (i == color.length - 1)
        statementWhere += `OR c.id = ${color[i]}) `;
      else statementWhere += `OR c.id = ${color[i]} `;
    }
  }
  if (typeof brand !== 'string' && brand !== undefined) {
    for (let i = 0; i < brand.length; i++) {
      if (i == 0) statementWhere += `AND (b.id = ${brand[i]} `;
      else if (i == brand.length - 1)
        statementWhere += `OR b.id = ${brand[i]}) `;
      else statementWhere += `OR b.id = ${brand[i]} `;
    }
  }

  if (typeof size === 'string') {
    statementWhere += `AND (s.foot_size = ${size}) `;
  }
  if (typeof color === 'string') {
    statementWhere += `AND (c.id = ${color}) `;
  }
  if (typeof brand === 'string') {
    statementWhere += `AND (b.id = ${brand}) `;
  }

  if (size === undefined && color === undefined && brand === undefined) {
    statementWhere = '';
    console.log(statementWhere);
  }

  if (sort !== undefined) {
    if (sort.split(' ')[0] === 'price' && sort.split(' ')[1] === 'desc') {
      sortColumn = ` sellPrice`;
      sortOption = ` desc`;
    } else if (sort.split(' ')[0] === 'price' && sort.split(' ')[1] === 'asc') {
      sortColumn = ` sellPrice`;
      sortOption = ` asc ,p.id desc`;
    } else if (
      sort.split(' ')[0] === 'discountRate' &&
      sort.split(' ')[1] === 'desc'
    ) {
      sortColumn = ` discountRate`;
      sortOption = ` desc ,p.id desc`;
    } else {
      sortColumn = ` releaseDate`;
      sortOption = ` desc`;
    }
  }

  return await productDao.getProducts(
    sortColumn,
    sortOption,
    statementWhere,
    limit,
    offset
  );
};

module.exports = {
  getProducts,
};
