function openSearch() {
    let searchArea = document.getElementById('searchcenter');
    searchArea.classList.add('d-show');
    searchArea.innerHTML = htmlTempSearch();
}

function htmlTempSearch() {
    return /*html */ `
        <div class="search-area">
            <div class="search-back">
                <img src="img/icon/arrow-left.png" class="search-back-button" onclick="closeSearch()">
                <input type="text" class="search-input font-grace" id="search" placeholder="&#x1F50E; Speißen Angebot durchstöbern." onkeydown="filterDishes()">
            </div>
            <div class="searched-dishes" id="s-disches"></div>
        </div>
    `;
}

function filterDishes() {
    let searchFild = document.getElementById('search').value;
    let search = searchFild.toLowerCase();
    console.log(search);

    let dishList = document.getElementById('s-disches');

    dishList.innerHTML = ``;

    for (let d = 0; d < dishes.length; d++) {
        const dish = dishes[d];

        for (let dm = 0; dm < dish['dish'].length; dm++) {
            const dishMenu = dish['dish'][dm];
            if (dishMenu.name.toString().toLowerCase().includes(search)) {
                dishList.innerHTML += htmlTempDishMenu(dishMenu, dm, d);
            }
        }
    }
}

function closeSearch() {
    document.getElementById('searchcenter').classList.remove('d-show');;
}