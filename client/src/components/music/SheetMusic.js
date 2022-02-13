import React, { useRef, useEffect, useState } from 'react'
import { Score } from "./VexFlowComponent"

import noteTranslator from "./musicTheory/noteTranslator.js"

const SheetMusic = (props) => {
  const [vexNotes, setVexNotes] = useState([])
  console.log("Hello again from sheet music. ", props.notes)

  

  const translateIntegerNotes = (chordArray) =>{
    let output = []
    for (const chord of chordArray){
      const translatedArray = chord.map((note)=>{
        return noteTranslator[note]
      })
      output.push(translatedArray)
    }
    return output
  }
let firstChord = ["C/4", "G/4"]


  useEffect(()=>{
    setVexNotes(props.notes)
  },[])

  return (
    <div className="centered">
      <Score
        clef="treble"
        staves={[
          [
            {
              // TODO PUT A PROP HERE 
              keys: firstChord,
              duration: "4",
              stem_direction: -1
            },
            {
              // TODO PUT A PROP HERE 
              keys: ["C/5", "C/4"],
              duration: "4",
              stem_direction: -1
            }
          ]
        ]}
      />
    </div>
  )
}

export default SheetMusic