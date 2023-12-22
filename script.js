
const menTab = document.getElementById('menTab');
const womenTab = document.getElementById('womenTab');
const kidsTab = document.getElementById('kidsTab');

const menProductsContainer = document.getElementById('menProducts');
const womenProductsContainer = document.getElementById('womenProducts');
const kidsProductsContainer = document.getElementById('kidsProducts');

async function fetchDataFromApi(category) {
  const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
  const data = await response.json();
  return data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase()).category_products;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  card.style.display="flex";
  card.style.alignItems="center";
  card.style.justifyContent="center";

  card.innerHTML = `
    <div style=" height:520px; display:flex; flex-direction: column;justify-content:center; align-items: center; ">
   <div>
   <img src="${product.image}" alt="${product.title}" style="width: 200px; height:200px; border-radius: 10px; ">
   </div>
    <div style="display: flex; align-items: start; flex-direction:column; justify-content: center; height:200px; ">
    <div style="display:flex">
    <p class="title" style="font-weight:bold">${product.title}</p>
    <p class="vendor" style="font-size:13px; margin-left:20px ">${product.vendor}</p>
    </div>
    <div style="display:flex">
    <p class="price">Rs ${product.price}.00</p>
    <p class="compare-at-price" style="opacity:0.5">Rs ${product.compare_at_price}.00</p>
    <p class="discount" style="color:red">${calculateDiscount(product.price, product.compare_at_price)}%Off</p>
    </div>
    <button class="add-to-cart-btn" style=" padding: 10px 20px;
    cursor: pointer;
    background-color: black;
    color: white;
    border-radius: 5px; width:200px">Add to Cart</button>
    </div>
 
    </div>

  `;

  return card;
}

function calculateDiscount(price, compareAtPrice) {
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return discount.toFixed(2);
}

async function showProducts(category) {
  const products = await fetchDataFromApi(category);

  if (category === 'men') {
    displayProducts(products, menProductsContainer);
  } else if (category === 'women') {
    displayProducts(products, womenProductsContainer);
  } else if (category === 'kids') {
    displayProducts(products, kidsProductsContainer);
  }
}

function displayProducts(products, container) {
  container.innerHTML = '';

  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });

  // Show the container
  container.style.display = 'flex';

  // Hide other containers
  const otherContainers = [menProductsContainer, womenProductsContainer, kidsProductsContainer].filter(c => c !== container);
  otherContainers.forEach(c => c.style.display = 'none');
}