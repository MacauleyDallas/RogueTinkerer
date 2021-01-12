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
import { Grid, Container, Button, Tooltip, withStyles} from '@material-ui/core';
import RuleBook from './components/resources/rulebook.json'
import {disableScroll, enableScroll} from './components/resources/StopScroll'

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.updateParentState = this.updateParentState.bind(this);
    this.changeScroller = this.changeScroller.bind(this);
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

  executeScroll = (ref) => {
    console.log(document.body.scrollTo({top: 0, behavior: 'smooth'}))
    
    // window.scrollTo({top: 0, behavior: 'smooth'});
    let found = document.getElementsByClassName('selectedComponent')[0]
    found.classList.remove('selectedComponent')
    setTimeout(() => {
      found.classList.add('displayNone')
      document.getElementById(ref + 'Component').classList.remove('displayNone')
      document.getElementById(ref + 'Component').classList.add('selectedComponent')

    }, 100)
    
    // ref.current.scrollIntoView()
  }

  setSelectedStats () {
    let selection = {}
    let selectionCount = 0

    selection['complete'] = false

    this.bookNames.forEach(bookName => {
      console.log(bookName)

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
        // console.log('el:', element)
        
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
    console.log('stored data', data)
    let keys = Object.keys(data)
    let retreivedState = {}
    
    keys.forEach(key => {
      retreivedState[key] = data[key]
    });
    retreivedState['storedData'] = data
    this.setState(retreivedState);
    console.log('App state', this.state)
    // window.document.body.addEventListener('scroll', () => this.handleScroll());
    // this.interval = setInterval(() => console.log('App state', this.state), 100000);
    
 }

 componentWillUnmount () {
  clearInterval(this.interval);
  // window.document.body.removeEventListener('scroll', this.handleScroll);
}

  changeScroller(int, title) {
    if (int) {
      let ob1 = document.getElementById('v2AboveSelection')
      
      let ob2 = document.getElementById('vBelowSelection')
      
      let ob3 = document.getElementById('vSelection')
      
      let ob4 = document.getElementById('v2BelowSelection')
      
      let ob5 = document.getElementById('v3BelowSelection')
      
      let ob6 = document.getElementById('vAboveSelection')
      
    

      ob5.id = 'v2AboveSelection'
      ob1.id = 'vAboveSelection'
      ob3.id = 'vBelowSelection'
      ob6.id = 'vSelection'
      ob2.id = 'v2BelowSelection'
      ob4.id = 'v3BelowSelection'
      
    } else {
      
      let ob1 = document.getElementById('v2AboveSelection')
      
      let ob2 = document.getElementById('vAboveSelection')
      
      let ob3 = document.getElementById('vSelection')
      
      let ob4 = document.getElementById('vBelowSelection')
      
      let ob5 = document.getElementById('v2BelowSelection')
      
      let ob6 = document.getElementById('v3BelowSelection')

      ob1.id = 'v3BelowSelection'
      ob2.id = 'v2AboveSelection'
      ob3.id = 'vAboveSelection'
      ob4.id = 'vSelection'
      ob5.id = 'vBelowSelection'
      ob6.id = 'v2BelowSelection'
      
    }

    this.setState({book: title})
    this.scrollTo(title);
  }

  scrollTo(title) {
    this.executeScroll(this.bookTags[this.bookNames.indexOf(title)])
  }

  changePage(value) {
    let bookIndex = this.bookNames.indexOf(this.state.book)
    let currentChoices = this.state.choiceValues
    currentChoices[this.bookTags[bookIndex]] = {}

    let selectedItemBoxes = document.getElementsByClassName('selectedItem')
    
    for (let item of selectedItemBoxes) {
      if (item.classList.contains(this.bookTags[bookIndex])) {
        item.classList.remove('selectedItem')
      }
    }

    this.updateParentState({choiceValues: currentChoices})
    
    document.getElementById(this.bookTags[bookIndex] +'PageContent').classList.add('closedPage')

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

    }, 100)
}
  
  menuList = ['start-core', 'start-io']
  render () {
      return (
        
      <Router>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <div className='headerMenu'>
            <nav> 
              <Link onClick={() => {let e = document.getElementsByClassName("animatedMenuSlide")[0]; e.classList.remove(...this.menuList); e.classList.add('start-core')}} to="/">Core</Link>
              <Link onClick={() => {let e = document.getElementsByClassName("animatedMenuSlide")[0]; e.classList.remove(...this.menuList); e.classList.add('start-io')}} to="/io">Import/Export</Link>
              <div className="animatedMenuSlide start-core"></div>
            </nav>
            <div className='headControl'>
              <div className="leftControls">
                  
                    <div id="scrollerBackground">
                      <div onClick={(e) => (this.changeScroller(e.target.id === 'vAboveSelection' ? 1 : e.target.id === 'vBelowSelection' ? 0 : -1, e.target.innerText))} id='v2AboveSelection' className='vSelectScroll'>Trials and Travails</div>
                      <div onClick={(e) => (this.changeScroller(e.target.id === 'vAboveSelection' ? 1 : e.target.id === 'vBelowSelection' ? 0 : -1, e.target.innerText))} id='vAboveSelection' className='vSelectScroll'>Motivation</div>
                      <div onClick={(e) => (this.changeScroller(e.target.id === 'vAboveSelection' ? 1 : e.target.id === 'vBelowSelection' ? 0 : -1, e.target.innerText))} id='vSelection' className='vSelectScroll'>Career</div>
                      <div onClick={(e) => (this.changeScroller(e.target.id === 'vAboveSelection' ? 1 : e.target.id === 'vBelowSelection' ? 0 : -1, e.target.innerText))} id='vBelowSelection' className='vSelectScroll' >Homeworld</div>
                      <div onClick={(e) => (this.changeScroller(e.target.id === 'vAboveSelection' ? 1 : e.target.id === 'vBelowSelection' ? 0 : -1, e.target.innerText))} id='v2BelowSelection' className='vSelectScroll'>Birthright</div>
                      <div onClick={(e) => (this.changeScroller(e.target.id === 'vAboveSelection' ? 1 : e.target.id === 'vBelowSelection' ? 0 : -1, e.target.innerText))} id='v3BelowSelection' className='vSelectScroll'>Lure of The Void</div>
                    </div>


              </div>
              <StatsBar
                scorePlacementMode={this.state.scorePlacementMode}
                unallocatedValues={this.state.unallocatedValues}
                allocatedValues={this.state.allocatedValues}
                baseRolls={this.state.baseRolls}
                updateParentState={this.updateParentState}
                skillBonusSum={this.state.skillBonusSum}
                skillPenaltySum={this.state.skillPenaltySum}
                finalScores={this.state.finalScores}
                />
            </div>

        </div>
        <div className='App'>
        <div style={{top: document.body.clientHeight/2}} id="leftArrow"><NavigateBeforeIcon style={{fontSize:'40px'}} onClick={() => this.changePage(-1)}/></div>
        <div style={{top: document.body.clientHeight/2}} id="rightArrow"><NavigateNextIcon style={{fontSize:'40px'}} onClick={() => this.changePage(1)}/></div>
          <Button onClick={() => {ls.clear()}}>Clear Storage</Button>

            <Switch>
              <Route path="/io">
                <ImportExport />
              </Route>
              <Route path="/users">
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
                />
              </Route>
            </Switch>
          </div>
        </Router>
    );
  }
}

