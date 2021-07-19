let deckId
let computerScore = 0
let myScore = 0

const getElemet = (ele) => document.getElementById(ele)

const cardsContainer = getElemet("cards")
const newDeckBtn = getElemet("new-deck")
const drawCardBtn = getElemet("draw-cards")
const header = getElemet("header")
const remainingText = getElemet("remaining")
const computerScoreEl = getElemet("computer-score")
const myScoreEl = getElemet("my-score")


async function handleClick() {
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            deckId = data.deck_id
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", async () => {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText
            
            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if (computerScore > myScore) {
                    header.textContent = "Computer won the game!"
                    header.style.color = "yellow"
                } else if (myScore > computerScore) {
                    header.textContent = "You won the game!"
                    header.style.color = "yellow"
                } else {
                    header.textContent = "It's a tie game!"
                    header.style.color = "yellow"
                }
            }
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}
