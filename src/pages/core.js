import React from 'react';
import StatsBar from '../components/StatsBar'
import BaseRoll from './BaseRoll'
import CareerSelector from '../components/CareerSelector'
import ls from 'local-storage'
import './core.css'
import HomeworldSelector from '../components/HomeworldSelector';
import BirthrightSelector from '../components/BirthrightSelector'

export default class Core extends React.Component {
    constructor(props) {
        super(props);

        // this.handleOnClick = this.handleOnClick.bind(this)
        this.state = {
        }
    }

    componentDidMount() {
        console.log('core props: ', this.props)
    }
    
    render () {
        if (this.props.baseRolled) {
            return (
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


                    <div id="lureOfTheVoidComponent" class={'mainComponent displayNone displayNone'}>
                        <h1 style={{paddingTop:'140px'}} ref={this.props.lureOfTheVoidRef}>Lure of The Void</h1>
                        
                        <div style={{height:'1000px'}}>
                        </div>
                    </div>

                    <div id="trialsAndTravailsComponent" class={'mainComponent displayNone'}>
                        <h1 style={{paddingTop:'140px'}} ref={this.props.trialsAndTravailsRef}>TRIALS AND TRAVAILS</h1>
                        
                        <div style={{height:'1000px'}}>
                        </div>
                    </div>

                    <div id="motivationComponent" class={'mainComponent displayNone'}>
                        <h1 style={{paddingTop:'140px'}} ref={this.props.motivationRef}>Motivation</h1>
                        
                        <div style={{height:'1000px'}}>
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