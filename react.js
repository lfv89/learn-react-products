// - FilterableProductTable
//   - SearchBar
//   - ProductTable
//     - ProductCategoryRow
//     - ProductRow

var FilterableProductTable = React.createClass({
  render: function () {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
});

var SearchBar = React.createClass({
  render: function () {
    return (
      <form>
        <input type="text" placholder="Search..." />
        <p>
          <input type="checkbox" />
          { ' ' }
          Only show products in stock
        </p>
      </form>
    );
  }
});

var ProductTable = React.createClass({
  render: function () {
    var rows = [];
    var lastCategory = null;

    this.props.products.forEach(function (product) {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }

      rows.push(<ProductRow product={product} key={product.name} />)
      lastCategory = product.category;
    });

    debugger
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody> {rows} </tbody>
      </table>
    );
  }
});

var ProductCategoryRow = React.createClass({
  render: function () {
    return (
      <tr><th colSpan="2">{this.props.category}</th></tr>
    );
  }
});

var ProductRow = React.createClass({
  render: function () {
    var outOfStockComponent = <span style={{ color: 'red' }}>{this.props.product.name}</span>
    var name = this.props.product.stocked ? this.props.product.name : outOfStockComponent;

    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
})

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

React.render(<FilterableProductTable products={PRODUCTS} />, document.body)
