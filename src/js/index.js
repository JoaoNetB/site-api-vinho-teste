

const itemsContainer = document.querySelector('.items-container')
const search = document.querySelector('.input-search')


// Makes the request to the API and returns the data in the variable "response"
const getItems = async () => {
    const response = await fetch(`https://api.sampleapis.com/wines/reds`);
    
    return response.json();
    
}



// Filters the data returned by the API
const filteringIncompleteData = items => items.filter(
    ({id, image, wine, winery, location}) => 
(id, image, wine, winery, location) != undefined && 
(id, image, wine, winery, location) != '')


// Receives the filtered data and creates a template for each item
const itemGeneratorTemplate = filterItems =>  filterItems.map(item =>`
    
<div class="item" id="${item.id}">
    <figure class="image">
        <img src="${ item.image ? item.image : " ../image/notFound.png"}" alt="${item.wine}" />
    </figure>
    <div class="description-item">
        <div class="title">
            <h2 class="item-wine">${item.wine}</h2>
        </div>

        <div class="sub-description">
            <h2>Adega</h2>
            <p class="item-winery">${item.winery}</p>
        </div>

        <div class="sub-description">
            <h2>Local</h2>
            <p class="item-location">${item.location}</p>
        </div>
    </div>
</div>
`).join('');




// Add the items to the "index.html" page
const addItems = async () => {
    
    const items = await getItems()
    
    const filterItems = filteringIncompleteData(items)
    
    const itemsTemplate = await itemGeneratorTemplate(filterItems)
    
    itemsContainer.innerHTML = itemsTemplate


}


// Add events to filter buttons
function selectedFilter() {

    let buttonName = document.querySelector('#name')
    let buttonWinery = document.querySelector('#winery')
    let buttonLocation = document.querySelector('#location')
    let buttonTotal = document.querySelector('#total')


    buttonName.addEventListener('change', () => {

        buttonLocation.checked = false
        buttonWinery.checked = false
        buttonTotal.checked = false
    })

    buttonWinery.addEventListener('change', () => {

        buttonLocation.checked = false
        buttonName.checked = false
        buttonTotal.checked = false
    })

    buttonLocation.addEventListener('change', () => {

        buttonWinery.checked = false
        buttonName.checked = false
        buttonTotal.checked = false
    })

    buttonTotal.addEventListener('change', () => {

        buttonLocation.checked = false
        buttonName.checked = false
        buttonWinery.checked = false
    })
}


// Adds search logic for each filter
function checksTheAppliedFilter(itemWine, itemWinery, itemLocation, inputValue) {


    let buttonName = document.querySelector('#name')
    let buttonWinery = document.querySelector('#winery')
    let buttonLocation = document.querySelector('#location')
    let buttonTotal = document.querySelector('#total')
    
    if (buttonName.checked == true) {

        return itemWine.includes(inputValue)

    } else if(buttonWinery.checked == true) {

        return itemWinery.includes(inputValue)

    }else if(buttonLocation.checked == true) {

        return itemLocation.includes(inputValue)

    } else if (buttonTotal.checked == true) {

        return itemWine.includes(inputValue) || 
        itemWinery.includes(inputValue) || 
        itemLocation.includes(inputValue)

    }else {

        return itemWine.includes(inputValue) || itemWinery.includes(inputValue) || itemLocation.includes(inputValue)
    }
    

}


// Returns the "divs" that contain the searched content 
const showValuesEqualToInput = inputValue => item => {
    
    const itemWine = item.querySelector('.item-wine').textContent.toLowerCase()
    const itemWinery = item.querySelector('.item-winery').textContent.toLowerCase()
    const itemLocation = item.querySelector('.item-location').textContent.toLowerCase()
    const itemInputValues = checksTheAppliedFilter(itemWine, itemWinery, itemLocation, inputValue)
    
    if(itemInputValues) {
        
        item.style.display = 'flex'
        return
    }
    
    item.style.display = 'none'
}


// Search according to the selected filter
const handleInputValue = event => {
    const inputValue = event.target.value.toLowerCase();
    
    const items = document.querySelectorAll('.item')
    
    items.forEach(showValuesEqualToInput(inputValue))

}



addItems()

selectedFilter()

search.addEventListener('input', handleInputValue)

