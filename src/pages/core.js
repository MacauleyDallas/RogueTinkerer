import React from 'react';
import StatsBar from '../components/StatsBar'
import BaseRoll from './BaseRoll'
import CareerSelector from '../components/CareerSelector'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import './core.css'
import HomeworldSelector from '../components/HomeworldSelector';
import BirthrightSelector from '../components/BirthrightSelector'
import LureOfTheVoid from '../components/LureofTheVoidSelector'
import TrialsAndTravails from '../components/TrialsAndTravailsSelector'
import MotivationSelector from '../components/MotivationSelector'
import RuleBook from '../components/resources/rulebook.json'


export default class Core extends React.Component {
    constructor(props) {
        super(props);
        this.changeScroller = this.changeScroller.bind(this);
        this.changePage = this.changePage.bind(this);
        // this.handleOnClick = this.handleOnClick.bind(this)
        this.state = {
        }
    }

    componentDidMount() {
        console.log('core props: ', this.props)
    }

    changePage(value) {
        
        console.log('currentbook:', this.props.book)
        let bookIndex = this.props.bookNames.indexOf(this.props.book)
        let currentChoices = this.props.choiceValues
        currentChoices[this.props.bookTags[bookIndex]] = {}
        
        let selectedItemBoxes = document.getElementsByClassName('selectedItem')
        
        for (let item of selectedItemBoxes) {
          if (item.classList.contains(this.props.bookTags[bookIndex])) {
            item.classList.remove('selectedItem')
          }
        }
    
        
        document.getElementById(this.props.bookTags[bookIndex] +'PageContent').classList.add('closedPage')
        this.props.updateParentState({choiceValues: currentChoices})
    
        setTimeout(() => {
          let maxIndex = RuleBook[this.props.bookNames[bookIndex]].length - 1
          let newIndex = this.props.bookmarks[bookIndex] + value
    
          if (newIndex < 0) {
            newIndex = maxIndex
          } else if (newIndex > maxIndex) {
            newIndex = 0
          }
    
          document.getElementById(this.props.bookTags[bookIndex] + 'PageContent').classList.remove('closedPage')
                
          let bookmarks = this.props.bookmarks
          bookmarks[this.props.bookNames.indexOf(this.props.book)] = newIndex
          
          this.props.updateParentState({bookmarks: bookmarks})
          this.props.setSelectedStats()
    
        }, 300)
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
    
        this.props.updateParentState({book: title})
        this.scrollTo(title);
      }

  scrollTo(title) {
    this.executeScroll(this.props.bookTags[this.props.bookNames.indexOf(title)])
  }

  executeScroll = (ref) => {
    document.body.scrollTo({top: 0, behavior: 'smooth'})

    let found = document.getElementsByClassName('selectedComponent')[0]
    found.classList.remove('selectedComponent')
    setTimeout(() => {
      found.classList.add('displayNone')
      document.getElementById(ref + 'Component').classList.remove('displayNone')
      document.getElementById(ref + 'Component').classList.add('selectedComponent')
    }, 300)
  }

  

    render () {
        if (this.props.baseRolled) {
            return (
                <div>
                    <div style={{top: document.body.clientHeight/2}} id="leftArrow"><NavigateBeforeIcon style={{fontSize:'40px'}} onClick={() => this.changePage(-1)}/></div>
                    <div style={{top: document.body.clientHeight/2}} id="rightArrow"><NavigateNextIcon style={{fontSize:'40px'}} onClick={() => this.changePage(1)}/></div>

            <div id='lifepathHeader'>
              <div id='headControl'>
                <div id="leftControls">
                    
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
                  scorePlacementMode={this.props.StatsBarProps.scorePlacementMode}
                  unallocatedValues={this.props.StatsBarProps.unallocatedValues}
                  allocatedValues={this.props.StatsBarProps.allocatedValues}
                  baseRolls={this.props.StatsBarProps.baseRolls}
                  updateParentState={this.props.StatsBarProps.updateParentState}
                  skillBonusSum={this.props.StatsBarProps.skillBonusSum}
                  skillPenaltySum={this.props.StatsBarProps.skillPenaltySum}
                  finalScores={this.props.StatsBarProps.finalScores}
                  />
              </div>
          </div>

                    <div id="coreContainer">
                        <div id="careerComponent" class={'mainComponent  selectedComponent'}>
                            <h1 ref={this.props.careerRef}>Career</h1>
                            <div class="pageContainer">
                                <div class="pageSeam">
                                </div>
                                <div id="careerPageContent" class="pageContent">
                                    <CareerSelector
                                        updateParentState={this.props.updateParentState}
                                        selected={this.props.selected}
                                        careerIndex={this.props.careerIndex}
                                        choiceValues={this.props.choiceValues}
                                        setSelectedStats={this.props.setSelectedStats}
                                    />
                                </div>
                            </div>
                        </div>
    
    
    
                        <div id="homeworldComponent" class={'mainComponent displayNone'}>
                            <h1 ref={this.props.homeworldRef}>Homeworld</h1>
                            <div class="pageContainer">
                                <div class="pageSeam">
                                </div>
                                <div id="homeworldPageContent" class="pageContent">
                                    <HomeworldSelector
                                        homeworldIndex={this.props.homeworldIndex}
                                        updateParentState={this.props.updateParentState}
                                        selected={this.props.selected}
                                        choiceValues={this.props.choiceValues}
                                        setSelectedStats={this.props.setSelectedStats}
    
                                    />
                                </div>
                            </div>
                        </div>
    
    
                        <div id="birthrightComponent" class={'mainComponent displayNone'}>
                            <h1 ref={this.props.birthrightRef}>Birthright</h1>
                            
                            <div class="pageContainer">
                                <div class="pageSeam">
                                </div>
    
                                <div id="birthrightPageContent" class="pageContent">
    
                                    <BirthrightSelector
                                        updateParentState={this.props.updateParentState}
                                        selected={this.props.selected}
                                        birthrightIndex={this.props.birthrightIndex}
                                        choiceValues={this.props.choiceValues}
                                        setSelectedStats={this.props.setSelectedStats}
                                    />
                            </div>
                                    
                            </div>
                        </div>
    
    
                        <div id="lureOfTheVoidComponent" class={'mainComponent displayNone'}>
                            <h1 ref={this.props.birthrightRef}>Lure of The Void</h1>
                            
                            <div class="pageContainer">
                                <div class="pageSeam">
                                </div>
    
                                <div id="lureOfTheVoidPageContent" class="pageContent">
    
                                    <LureOfTheVoid
                                        updateParentState={this.props.updateParentState}
                                        selected={this.props.selected}
                                        lureOfTheVoidIndex={this.props.lureOfTheVoidIndex}
                                        choiceValues={this.props.choiceValues}
                                        setSelectedStats={this.props.setSelectedStats}
                                    />
                            </div>
                                    
                            </div>
                        </div>
    
                        <div id="trialsAndTravailsComponent" class={'mainComponent displayNone'}>
                            <h1 ref={this.props.birthrightRef}>Trials And Travails</h1>
                            
                            <div class="pageContainer">
                                <div class="pageSeam">
                                </div>
    
                                <div id="trialsAndTravailsPageContent" class="pageContent">
    
                                    <TrialsAndTravails
                                        updateParentState={this.props.updateParentState}
                                        selected={this.props.selected}
                                        trialsAndTravailsIndex={this.props.trialsAndTravailsIndex}
                                        choiceValues={this.props.choiceValues}
                                        setSelectedStats={this.props.setSelectedStats}
                                    />
                            </div>
                                    
                            </div>
                        </div>
    
                        <div id="motivationComponent" class={'mainComponent displayNone'}>
                            <h1 ref={this.props.birthrightRef}>Motivation</h1>
                            
                            <div class="pageContainer">
                                <div class="pageSeam">
                                </div>
    
                                <div id="motivationPageContent" class="pageContent">
                                    <MotivationSelector
                                        updateParentState={this.props.updateParentState}
                                        selected={this.props.selected}
                                        motivationIndex={this.props.motivationIndex}
                                        choiceValues={this.props.choiceValues}
                                        setSelectedStats={this.props.setSelectedStats}
                                    />
                            </div>
                                    
                            </div>
                        </div>
                    </div>
                </div>
                )
            
        } else {
            return (
                <BaseRoll updateParentState={this.props.updateParentState}/>
            )
        }
    }

}