window.addEventListener("scroll", function (event) {
    let scroll = this.scrollY;
    if (scroll > 112) {
        document.getElementById('cart').classList.add('position-change');
        document.getElementById('searchcenter').classList.add('search-position-change1');
    }
    else {
        document.getElementById('cart').classList.remove('position-change');
        document.getElementById('searchcenter').classList.remove('search-position-change1');
    }
});

window.addEventListener("scroll", function (event) {
    let scroll = this.scrollY;
    if (scroll > 733) {
        document.getElementById('menubar').classList.add('menubar-position-change');
        document.getElementById('searchcenter').classList.add('search-position-change2');
    }
    else {
        document.getElementById('menubar').classList.remove('menubar-position-change');
        document.getElementById('searchcenter').classList.remove('search-position-change2');
    }
});

function swipeLeft() {
    document.getElementById('button-container').scrollLeft -= 20;
}

function swipeRight() {
    document.getElementById('button-container').scrollLeft += 20;
    document.getElementById('swipe-left').classList.add('left-scroll-button');
    document.getElementById('button-container').classList.add('button-container-change');
}

// Das Herz der Seite

let liked = false;
let likeButton = `img/icon/favorite-empty.png`;

loadLikeFrom();

function like() {
    let like = document.getElementById('like-icon');
    like.src = likeButton;
}

function saveLikeTo() {
    let likeToText = JSON.stringify(liked);
    localStorage.setItem('liked', likeToText);

    let likeButtonToText = JSON.stringify(likeButton);
    localStorage.setItem('likeButton', likeButtonToText);
}

function loadLikeFrom() {
    let likeToText = localStorage.getItem('liked');
    let likeButtonToText = localStorage.getItem('likeButton');
    if (likeToText != null && likeButtonToText != null) {
        liked = JSON.parse(likeToText);
        likeButton = JSON.parse(likeButtonToText);
    }
}

function likeRestaurant() {

    likeButton = `img/icon/favorite-${liked ? 'filled':'empty'}.png`;
    liked = !liked;
    saveLikeTo();
    like();
}