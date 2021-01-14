import './App.css';
import React from "react";
import ImportExport from './pages/ImportExport'
import Core from './pages/core'
import StatsBar from './components/StatsBar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ls from 'local-storage'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Button } from '@material-ui/core';
import RuleBook from './components/resources/rulebook.json'
import CharacterSheet from './pages/CharacterSheet'


export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.updateParentState = this.updateParentState.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setSelectedStats = this.setSelectedStats.bind(this);
    
    this.state = {
      book: 'Career',
      scorePlacementMode: true,
      unallocatedValues: {},
      allocatedValues: {},
      skillPenaltySum: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      skillBonusSum: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      skillPenaltys: [],
      skillBonusus: [],
      finalScores: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      selected: {
        
        
      },
      baseRolls: [],
      choiceValues: {},
      baseRolled: false,
      bookmarks: [0, 0, 0, 0, 0, 0],
      isScrolling: false
    }
    
    this.bookNames = ['Lure of The Void', 'Trials and Travails', 'Motivation', 'Career', 'Homeworld', 'Birthright']
    this.bookTags = ['lureOfTheVoid', 'trialsAndTravails', 'motivation', 'career', 'homeworld', 'birthright']
  }

  setSelectedStats () {
    let selection = {}
    let selectionCount = 0

    selection['complete'] = false

    this.bookNames.forEach(bookName => {

      let selectedPage = RuleBook[bookName][this.state.bookmarks[this.bookNames.indexOf(bookName)]]      

      if (selection[bookName] === undefined) selection[bookName] = {}
      selection[bookName]['selectedIndex'] = this.state.bookmarks[this.bookNames.indexOf(bookName)]
      selection[bookName]['choices'] = []

      this.exploreObjectForChoices(selectedPage, bookName, selection)
    });

    this.updateParentState({selected: selection})
  }

  exploreObjectForChoices (ob, bookName, selection) {
    Object.keys(ob).forEach(heading => {
      if (Array.isArray(ob[heading])) {
        // console.log('Found array: ', bookName, heading, ob[heading])
        this.locateChoices(ob, heading, selection, bookName)
        
      } else if (typeof(ob[heading]) === "object") {
        this.exploreObjectForChoices(ob[heading], bookName, selection)
        
      }
    });
}

  locateChoices (selectedPage, heading, selection, book) {
      selectedPage[heading].forEach(element => {
        let sel = false
        let attr = false
        
        Object.keys(element).forEach(key => {
          if (key === 'Choice') sel = true
          if (key === 'Attr') attr = true
        });
        
        
        if (sel) {
          let xIndex = -1
  
          let booktag = this.bookTags[this.bookNames.indexOf(book)]
          try {
            xIndex = this.state.choiceValues[booktag][heading][selectedPage[heading].indexOf(element)]['Value']
          } catch (e) {
          }
          
          let descision = {yIndex: selectedPage[heading].indexOf(element), options: element, chosen: false, xIndex: xIndex}
          selection[book]['choices'].push(descision)         
        }
      });
    }

  updateParentState (st) {
      this.setState(st)

      let data = this.state.storedData
      Object.keys(st).forEach(key => {
        data[key] = st[key]
      });
      this.setState({storedData: data})
      
      ls.set('storedData', data)
      console.log('Updating Parent State with: ', st)
  }

  componentDidMount() {
    let data = ls.get('storedData') || {}
    // console.log('stored data', data)
    let keys = Object.keys(data)
    let retreivedState = {}
    
    keys.forEach(key => {
      retreivedState[key] = data[key]
    });
    retreivedState['storedData'] = data
    this.setState(retreivedState);
    // console.log('App state', this.state)
    // window.document.body.addEventListener('scroll', () => this.handleScroll());
    // this.interval = setInterval(() => console.log('App state', this.state), 100000);
    
 }

 componentWillUnmount () {
  clearInterval(this.interval);
  // window.document.body.removeEventListener('scroll', this.handleScroll);
}

  

  changePage(value) {

    console.log('changing page')
    let bookIndex = this.bookNames.indexOf(this.state.book)
    let currentChoices = this.state.choiceValues
    currentChoices[this.bookTags[bookIndex]] = {}
    
    let selectedItemBoxes = document.getElementsByClassName('selectedItem')
    
    for (let item of selectedItemBoxes) {
      if (item.classList.contains(this.bookTags[bookIndex])) {
        item.classList.remove('selectedItem')
      }
    }

    
    document.getElementById(this.bookTags[bookIndex] +'PageContent').classList.add('closedPage')
    this.updateParentState({choiceValues: currentChoices})

    setTimeout(() => {
      let maxIndex = RuleBook[this.bookNames[bookIndex]].length - 1
      let newIndex = this.state.bookmarks[bookIndex] + value

      if (newIndex < 0) {
        newIndex = maxIndex
      } else if (newIndex > maxIndex) {
        newIndex = 0
      }

      document.getElementById(this.bookTags[bookIndex] + 'PageContent').classList.remove('closedPage')
            
      let bookmarks = this.state.bookmarks
      bookmarks[this.bookNames.indexOf(this.state.book)] = newIndex
      
      this.updateParentState({bookmarks: bookmarks})
      this.setSelectedStats()

    }, 300)
}
  
  menuList = ['start-core', 'start-io', 'start-sheet']
  render () {
      return (
        
      <Router>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <div className={'LiteralBlock'}>
          <div id="headerMenu">
            <nav> 
              <Link onClick={() => {let e = document.getElementsByClassName("animatedMenuSlide")[0]; e.classList.remove(...this.menuList); e.classList.add('start-core')}} to="/">Lifepath</Link>
              <Link onClick={() => {let e = document.getElementsByClassName("animatedMenuSlide")[0]; e.classList.remove(...this.menuList); e.classList.add('start-sheet')}} to="/sheet">Character Sheet</Link>
              <Link onClick={() => {let e = document.getElementsByClassName("animatedMenuSlide")[0]; e.classList.remove(...this.menuList); e.classList.add('start-io')}} to="/io">Import/Export</Link>
              <div className="animatedMenuSlide start-core"></div>
            </nav>
          </div>

          {/* TODO: Move this into the core.js file */}
          


          <div className='App'>
          <div style={{top: document.body.clientHeight/2}} id="leftArrow"><NavigateBeforeIcon style={{fontSize:'40px'}} onClick={() => this.changePage(-1)}/></div>
          <div style={{top: document.body.clientHeight/2}} id="rightArrow"><NavigateNextIcon style={{fontSize:'40px'}} onClick={() => this.changePage(1)}/></div>
            <Button onClick={() => {ls.clear()}}>Clear Storage</Button>

              <Switch>
                <Route path="/io">
                  <ImportExport />
                </Route>
                <Route path="/sheet">
                  <CharacterSheet />
                </Route>
                <Route path="/">
                  <Core
                    selected={this.state.selected} 
                    careerIndex={this.state.bookmarks[this.bookTags.indexOf('career')]}
                    homeworldIndex={this.state.bookmarks[this.bookTags.indexOf('homeworld')]}
                    birthrightIndex={this.state.bookmarks[this.bookTags.indexOf('birthright')]}
                    lureOfTheVoidIndex={this.state.bookmarks[this.bookTags.indexOf('lureOfTheVoid')]}
                    trialsAndTravailsIndex={this.state.bookmarks[this.bookTags.indexOf('trialsAndTravails')]}
                    motivationIndex={this.state.bookmarks[this.bookTags.indexOf('motivation')]}
                    baseRolled={this.state.baseRolled}
                    updateParentState={this.updateParentState}
                    choiceValues={this.state.choiceValues}
                    setSelectedStats={this.setSelectedStats}
                    bookNames={this.bookNames}
                    bookTags={this.bookTags}
                    StatsBarProps={{scorePlacementMode: this.state.scorePlacementMode,
                      unallocatedValues: this.state.unallocatedValues,
                      allocatedValues: this.state.allocatedValues,
                      baseRolls: this.state.baseRolls,
                      updateParentState: this.updateParentState,
                      skillBonusSum: this.state.skillBonusSum,
                      skillPenaltySum: this.state.skillPenaltySum,
                      finalScores: this.state.finalScores}}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}

