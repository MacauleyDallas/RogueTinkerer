import React from 'react';
import StatsBar from '../components/StatsBar'
import BaseRoll from './BaseRoll'
import CareerSelector from '../components/CareerSelector'
import ls from 'local-storage'
import './core.css'
import HomeworldSelector from '../components/HomeworldSelector';

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
                <div>
                    <section className={'bookBuffer'}></section>

                    <section className={'boundBox'} id='careerUpperBound'></section>
                        <h1 id="careerComponent" style={{paddingTop:'140px'}} ref={this.props.careerRef}>Career</h1>
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
                    <section className={'boundBox'} id='careerLowerBound'></section>
                        
                    <section className={'bookBuffer'}></section>



                    <section className={'boundBox'} id='homeworldUpperBound'></section>
                        <h1 id="homeworldComponent" style={{paddingTop:'140px'}} ref={this.props.homeworldRef}>Homeworld</h1>
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
                    <section className={'boundBox'} id='homeworldLowerBound'></section>





                    <section className={'bookBuffer'}></section>

                    <section className={'boundBox'} id='birthrightUpperBound'></section>
                        <h1 id="birthrightComponent" style={{paddingTop:'140px'}} ref={this.props.birthrightRef}>Birthright</h1>
                        
                        <div style={{height:'1000px'}}>
                        </div>
                    <section className={'boundBox'} id='birthrightLowerBound'></section>

                    <section className={'bookBuffer'}></section>
                    




                    <section className={'boundBox'} id='lureOfTheVoidUpperBound'></section>
                        <h1 id="lureOfTheVoidComponent" style={{paddingTop:'140px'}} ref={this.props.lureOfTheVoidRef}>Lure of The Void</h1>
                        
                        <div style={{height:'1000px'}}>
                        </div>
                    <section className={'boundBox'} id='lureOfTheVoidLowerBound'></section>

                    <section className={'bookBuffer'}></section>

                    <section className={'boundBox'} id='trialsAndTravailsUpperBound'></section>
                        <h1 id="trialsAndTravailsComponent" style={{paddingTop:'140px'}} ref={this.props.trialsAndTravailsRef}>TRIALS AND TRAVAILS</h1>
                        
                        <div style={{height:'1000px'}}>
                        </div>
                    <section className={'boundBox'} id='trialsAndTravailsLowerBound'></section>

                    <section className={'bookBuffer'}></section>

                    <section className={'boundBox'} id='motivationUpperBound'></section>
                        <h1 id="motivationComponent" style={{paddingTop:'140px'}} ref={this.props.motivationRef}>Motivation</h1>
                        
                        <div style={{height:'1000px'}}>
                        </div>
                    <section className={'boundBox'} id='motivationLowerBound'></section>
                        
                    <section className={'bookBuffer'}></section>

                </div>
            )
            
        } else {
            return (
                <BaseRoll updateParentState={this.props.updateParentState}/>
            )
        }
    }

}