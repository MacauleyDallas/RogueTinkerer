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
    this.lureOfTheVoidRef = React.createRef()
    this.trialsAndTravailsRef = React.createRef()
    this.motivationRef = React.createRef()
    this.homeworldRef = React.createRef()
    this.birthrightRef = React.createRef()
    this.careerRef = React.createRef()
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
      finalScores: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      selected: {
        
        
      },
      baseRolls: [],
      baseRolled: false,
      careerIndex: 0,
      bookmarks: [0, 0, 0, 0, 0, 0],
      isScrolling: false
    }
    
    this.bookNames = ['Lure of the Void', 'Trials and Travails', 'Motivation', 'Career', 'Homeworld', 'Birthright']
    this.bookTags = ['lureOfTheVoid', 'trialsAndTravails', 'motivation', 'career', 'homeworld', 'birthright']
  }

  executeScroll = (ref) => {
    this.setState({isScrolling: true})
    // disableScroll(ref)
    ref.current.scrollIntoView()
  }

  setSelectedStats () {
    let selection = {}
    let selectionCount = 0
    
    this.bookNames.forEach(bookName => {

      let selectedPage = RuleBook[bookName][this.state.bookmarks[this.bookNames.indexOf(bookName)]]
      console.log('looking in page ', selectedPage)
      Object.keys(selectedPage).forEach(heading => {
        if (Array.isArray(selectedPage[heading])) {
          this.findFeatures(selectedPage, heading, selection, selectionCount, bookName)
        } else if (typeof(selectedPage[heading]) === "object") {
          
        }
      });
      
      console.log(selection)
    });
    
    
    
  }

  findFeatures (selectedPage, heading, selection, selectionCount, book) {
      selectedPage[heading].forEach(element => {
        let store = 0
        let sel = false
        let attr = false
        Object.keys(element).forEach(key => {
          ['Item', 'Skill', 'Talent', 'Feature', 'Attr', 'Choice'].includes(key) && store++
          if(key === 'Choice') sel = true
          if (key === 'Attr') attr = true
        });
        
        if (store) {
          if (selection[book][heading] === undefined) selection[book][heading] = []
          if (sel) {
            selection[book][heading].push({selectionRequired: true})
            selectionCount++
  
          } else {
            selection[book][heading].push({selectionRequired: false})
          }
  
          if (attr) {
            console.log('attr', element)
          }
  
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
  

  
  finishScroll(value) {
    if (this.state.isScrolling) {
      this.scrollTo(value)
    }
  }

  handleScroll (event) {
    let viewportBreakpoint = window.innerHeight/2
    let bookNames = this.bookNames
    let bookTags = this.bookTags

    if (!this.state.isScrolling) {

          let element = this.state.book
          // console.log('ement', element)
          let ci = bookNames.indexOf(element)
          let pi = ci - 1 < 0 ? bookNames.length - 1 : ci - 1
          let ni = ci + 1 > bookNames.length - 1 ? 0 : ci + 1
          // console.log('ci: ', ci, '.  pi: ', pi, '.  ni: ', ni, '.')
          if(document.getElementById(bookTags[ci] + 'UpperBound').getBoundingClientRect()['y'] > viewportBreakpoint) {
            this.changeScroller(1, bookNames[pi])
            this.interval = setInterval(() => this.finishScroll(bookNames[pi]), 100);
            console.log('Change up to:', bookNames[pi])
          } else if (document.getElementById(bookTags[ci] + 'LowerBound').getBoundingClientRect()['y'] < viewportBreakpoint) {
            this.changeScroller(0, bookNames[ni])
            this.interval = setInterval(() => this.finishScroll(bookNames[ni]), 100);
            console.log('Change down', bookNames[ni])
          }
        

    } else {
      bookNames.forEach(element => {
        if (this.state.book === element) {
          if (Math.abs(document.getElementById(bookTags[bookNames.indexOf(element)] + 'Component').getBoundingClientRect()['y']) < 20) {
            console.log('Landed at', element)
            console.log('current book', this.state.book)
            clearInterval(this.interval);
            this.setState({isScrolling: false})
          }    
        }
      });
    }
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
    window.document.body.addEventListener('scroll', () => this.handleScroll());
    // this.interval = setInterval(() => console.log('App state', this.state), 100000);
    this.setSelectedStats()
    
 }

 componentWillUnmount () {
  clearInterval(this.interval);
  window.document.body.removeEventListener('scroll', this.handleScroll);
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
    switch (title) {
      case 'Career':
        this.executeScroll(this.careerRef);
        break;

      case 'Birthright':
        this.executeScroll(this.birthrightRef);
        break;

      case 'Motivation':
        this.executeScroll(this.motivationRef);
        break;

      case 'Trials and Travails':
        this.executeScroll(this.trialsAndTravailsRef);
        break;


      case 'Lure of The Void':
        this.executeScroll(this.lureOfTheVoidRef);
        break;


      case 'Homeworld':
        this.executeScroll(this.homeworldRef);
        break;
      default:
        break;
    }
  }

  changePage(value) {
    let pageIndex = this.bookNames.indexOf(this.state.book)
    // console.log(this.bookTags[pageIndex] +'PageContent')
    setTimeout(() => {
      let maxIndex = RuleBook[this.bookNames[pageIndex]].length - 1
      // console.log('maxIndex', maxIndex)

      let newIndex = this.state[this.bookTags[pageIndex] + 'Index'] + value

      if (newIndex < 0) {
        newIndex = maxIndex
      } else if (newIndex > maxIndex) {
        newIndex = 0
      }

      document.getElementById(this.bookTags[pageIndex] +'PageContent').classList.add('closedPage')
      console.log('Changing', this.state.book, ' to ', newIndex)
      
      document.getElementById(this.bookTags[pageIndex] + 'PageContent').classList.remove('closedPage')
      

      let ob = {}
      
      ob[this.bookTags[pageIndex] + 'Index'] = newIndex
      // console.log('Ob:', ob)
      this.updateParentState(ob)
    }, 300)
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
                  trialsAndTravailsRef={this.trialsAndTravailsRef}
                  birthrightRef={this.birthrightRef}
                  lureOfTheVoidRef={this.lureOfTheVoidRef}
                  careerRef={this.careerRef}
                  motivationRef={this.motivationRef}
                  homeworldRef={this.homeworldRef}
                  careerIndex={this.state.careerIndex}
                  homeworldIndex={this.state.homeworldIndex}
                  baseRolled={this.state.baseRolled}
                  updateParentState={this.updateParentState}
                  birthrightRef={this.birthrightRef}
                />
              </Route>
            </Switch>
          </div>
        </Router>
    );
  }
}

