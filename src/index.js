// Fetch ramens from server and display them in the ramen-menu
fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(data => {
    data.forEach(ramen => {
      const img = document.createElement('img');
      img.src =`${ramen.image}`;
      img.dataset.id = ramen.id; // set the data-id attribute for each image
      document.querySelector('#ramen-menu').appendChild(img);
    });
  });

// Add event listener to each image in the ramen-menu
document.querySelector('#ramen-menu').addEventListener('click', event => {
  const ramenId = event.target.dataset.id;
  fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(data => {
      const detailImage = document.querySelector('#ramen-detail img');
      detailImage.src = data.image;
      detailImage.alt = data.name;
      document.querySelector('.name').textContent = data.name;
      document.querySelector('.restaurant').textContent = data.restaurant;
      document.querySelector('#rating-display').textContent = data.rating;
      document.querySelector('#comment-display').textContent = data.comment;
    });
});

// Add event listener to the 'new-ramen' form submit button
document.querySelector('#new-ramen').addEventListener('submit', event => {
  event.preventDefault(); // prevent the default form submission behavior

  // Create a new ramen object
  const newRamen = {
    name: document.querySelector('#new-name').value,
    restaurant: document.querySelector('#new-restaurant').value,
    image: document.querySelector('#new-image').value,
    rating: document.querySelector('#new-rating').value,
    comment: document.querySelector('#new-comment').value,
  };

  // Send a POST request to the server to create a new ramen
  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRamen),
  })
    .then(response => response.json())
    .then(data => {
      // Add the new ramen to the ramen-menu
      const newImg = document.createElement('img');
      newImg.src = data.image;
      newImg.dataset.id = data.id;
      document.querySelector('#ramen-menu').appendChild(newImg);
    });

  // Reset the form inputs
  document.querySelector('#new-name').value = '';
  document.querySelector('#new-restaurant').value = '';
  document.querySelector('#new-image').value = '';
  document.querySelector('#new-rating').value = '';
  document.querySelector('#new-comment').value = '';
});

  




