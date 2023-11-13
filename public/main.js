
const deleteButton = document.getElementsByClassName("deleteButton");
const upArrow = document.getElementsByClassName('upArrow')
const downArrow = document.getElementsByClassName('downArrow')

Array.from(upArrow).forEach(function (element) {
  element.addEventListener('click', function () {
    const foodListing = this.closest('li').childNodes[1].innerText//text of each food listing
    const calories = this.closest('li').childNodes[3].innerText
    const upArrow = parseFloat(this.closest('li').childNodes[5].innerText)
    console.log(upArrow)
    fetch('messages', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'foodListing': foodListing,
        'calories': calories,
        'upArrow': upArrow,
        '$currentDate': { 'lastUpdated': true }
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        // console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(downArrow).forEach(function (element) {
  element.addEventListener('click', function () {
    const foodListing = this.closest('li').childNodes[1].innerText//text of each food listing
    const calories = this.closest('li').childNodes[3].innerText
    const downArrow = parseFloat(this.closest('li').childNodes[5].innerText)
    // const quantity = this.closest('li').childNodes[5].innerText
    // console.log(quantity)
    console.log(downArrow)
    fetch('messages', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'foodListing': foodListing,
        'calories': calories,
        'downArrow': downArrow,
        '$currentDate': { 'lastUpdated': true } // Using $currentDate to update 'lastUpdated' field
      })//connected with the app.put, which in turn dives into the db collection and parses through messages.
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        // console.log(data)
        window.location.reload(true) //reloads the page which triggers our app.get
      })
  });
});





Array.from(deleteButton).forEach(function (element) {
  element.addEventListener('click', function () {
    const foodListing = this.closest('li').childNodes[1].innerText//text of each food listing
    const calories = this.closest('li').childNodes[3].innerText
    const downArrow = parseFloat(this.closest('li').childNodes[5].innerText)
    const upArrow = parseFloat(this.closest('li').childNodes[5].innerText)
    console.log(foodListing)
    console.log(calories)

    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'foodListing': foodListing,
        'calories': calories,
        'upArrow': upArrow,
        'downArrow': downArrow

      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

