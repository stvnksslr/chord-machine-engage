import React, {useState, useRef} from "react"

import ChordOption from "./ChordOption"
import ExtensionOption from "./ExtensionOption"
import InversionOption from "./InversionOption"
import { chordData, inversionData } from "./musicTheory/chordData"
import {intervals, majorTriad, minorTriad, dimTriad, majorSeventh, minorSeventh, majorAdd9, minorAdd9, major, minor, dim, rootLookup, flavorLookup, chordBuilder, chordBuilderTwo} from "./musicTheory/chordGenerator"


const ChordForm = props =>{
    const [menuState, setMenuState] = useState({
        chord : {
            degree: "1",
            root: "60",
            flavor: "major",
            extension: "none",
            inversion: "root",       }
    })
//debugger
   const chords = ["I", "ii", "iii", "IV", "V", "vi", "vii"]


    const extensionOptions = chordData.find(
        (chord) => chord.name === menuState.chord.degree)
        ?.extensions.map((extension) => (
            <option key={extension} value={extension}>
                {extension}
            </option>
        ))

    const inversionOptions = inversionData.find(
        (extension) => extension.name === menuState.chord.extension)
        ?.inversions.map((inversion)=> (
            <option key={inversion} value={inversion}>
                {inversion}
            </option>        
            ))
        

const handleDegreeChange = (event) =>{
    const degree = event.currentTarget.value
    const root = rootLookup(degree)
    const flavor = flavorLookup(degree)
    const chord = {...menuState.chord, 
                    degree: event.currentTarget.value,
                    root: root,
                    flavor: flavor}
    if(flavor === 'dim'){
        chord.extension = "none"
    }
    setMenuState({...menuState,
                chord})
    props.handleFormChanges(props.position, chord)
}

const handleExtensionChange = (event) => {
    const chord = {...menuState.chord, extension: event.currentTarget.value, inversion: "root"}
    setMenuState({...menuState,
                chord})
    props.handleFormChanges(props.position, chord)
}

const handleInversionChange = (event) =>{
    const chord = {...menuState.chord, inversion: event.currentTarget.value}
    setMenuState({...menuState,
                chord})
    props.handleFormChanges(props.position, chord)
}



    const handleSubmit = (event) =>{
        event.preventDefault()
        const chord = menuState.chord
        const noteArray = chordBuilderTwo(chord.root, chord.flavor, chord.extension, chord.inversion)
        props.playTestInstrument(noteArray)
    }


  
    const chordOptions = chords.map((chord, index) => {
        const degree = index+1
        return(
            <ChordOption
            key={index}
            chord={chord}
            degree={degree}
            />
        )
    })

    
    return(
    <div className="cell medium-2">
        <h6>Create Your own chord</h6>
        <form onSubmit={handleSubmit} >
        <select onChange={handleDegreeChange}>
       {chordOptions}
       </select>
       <select onChange={handleExtensionChange}>
       {extensionOptions}
       </select>
       <select onChange={handleInversionChange}>
        {inversionOptions}
       </select>
       <br/>
       <button>Play me!</button>
        </form>
        
    </div>
    )
}


export default ChordForm