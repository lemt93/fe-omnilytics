import React from 'react'
import Report from './Report'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: '',
      fileName: '',
      reports: [],
      generatingData: null
    }
  }
  
  generateData = () => {
    if (this.state.generatingData) {
      return
    }
    this.setState({
      generatingData: fetch('http://localhost:4000/generate', {
        method: 'POST'
      })
        .then(result => {
          if (!result.ok) throw new Error('Things went wrong') // For sake of simplicity, skip error handling!

          return result.json()
        })
        .then(({ url, fileName }) => this.setState({ fileName, link: url }))
        .catch(err => console.log(err))
        .finally(() => {
          this.setState({ generatingData: null })
        })
    })
    
  }
  getReports = () => {
    const { fileName } = this.state 
    if (!fileName) return
    
    fetch(`http://localhost:4000/reports/${fileName}`, {
      method: 'GET'
    })
      .then(result => {
        if (!result.ok) throw new Error('Things went wrong') // For sake of simplicity, skip error handling!

        return result.json()
      })
      .then(result => this.setState({ reports: result }))
      .catch(err => console.log(err)) 
  }

  render() {
    const {
      link,
      generatingData,
      reports
    } = this.state
    
    return (
        <div>
          <button onClick={this.generateData}>Generate</button>
          <p>
            {
              generatingData
                ? <span>Link ...generating</span>
                : (link && <span>Link <a target="_blank" href={link}>{link}</a></span>)
            }
          </p>
          
          <button onClick={this.getReports}>Report</button>
          <Report reports={reports} />
        </div>
    )
  }
}
