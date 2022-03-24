import React from 'react'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
 
class Dise extends React.Component {
    constructor(props){
        super(props)
    }
 
  render() {
    return (
      <div >
        <ReactDice
        dotColor={'#C6F6D5'}
        // defaultRoll={this.props.defaultRoll}
        outlineColor={'#fff'}
        outline={true}
        faceColor='#38A169'
        disableIndividual={this.props.disable}
          numDice={1}
          rollDone={e=>this.rollDoneCallback(e,this.props.onClick)}
          ref={dice => this.reactDice = dice}
        />
      </div>
    )
  }
 
  rollAll() {
    this.reactDice.rollAll()
  }
 
  rollDoneCallback(num,callback) {
      callback(num)
    // console.log(`You rolled a ${num}`)
  }
  
}

export default Dise;