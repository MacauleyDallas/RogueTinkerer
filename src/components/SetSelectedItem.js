export default function SetSelectedItem(x, y, i, title, choiceValues, callback, book) {
    let j = 0

    
    while (document.getElementById('select-' + title + x + '-' + j) !== null) {
        
        if (j === y) {
            document.getElementById('select-' + title + x + '-' + j).classList.add('selectedItem')
            
        } else {
            document.getElementById('select-' + title + x + '-' + j).classList.remove('selectedItem')
        }
        j = j + 1
    }

    let choices = choiceValues

    if (choices[book] === undefined) choices[book] = {}
    if (choices[book][title] === undefined) choices[book][title] = {}
    if (choices[book][title][x] === undefined) {
        choices[book][title][x] = {Value: y}
    } else {
        choices[book][title][x]['Value'] = y
    }
    console.log('we here b', choices)

    callback({choiceValues: choices})
 }