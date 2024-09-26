$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    // Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
    async function part1() {
        let data = await $.getJSON(`${baseURL}/new/draw/`);
        let { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }

    // Make a request to the deck of cards PAI to request a single card from a newly shuffled deck, Once you have the card make a request to the same API to get one more card from the same deck.
    async function part2() {
        let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
        let deckId = firstCardData.deck_id;
        let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
        [firstCardData, secondCardData].forEach(card => {
            let { suit, value } = card.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        });
    }

    // Build an HTML page that lets you draw cards from a deck. When the page loads go to the deck of cards api to create a new deck and show a button that will let you draw a card. Every time you click the button display a new card until there are no cards left in the deck.
    async function setup() {
        let $btn = $('button');
        let $cardArea = $('#card-area');

        let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
        $btn.show().on('click', async function() {
            let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
            let cardSrc = cardData.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
               $('<img>', {
                src: cardSrc,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px)rotate(${angle}deg)`
                }
               }) 
            );
            if (cardData.remaining === 0) $btn.remove();
        });  
    }
    setup();
});