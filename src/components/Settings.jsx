import React, { useContext } from 'react';
import ReactSlider from 'react-slider';
import '../styles/Settings.css'
import '../styles/Slider.css'
import SettingsContext from './SettingsContext';

const Settings = () => {
    const settingsInfo = useContext(SettingsContext) 
  return (
      <div className="accordion" id="accordionExample">
          <div className="accordion-item container-settings">
              <h2 class="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <i className="bi bi-gear-fill me-2" />
                      Configuración
                  </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                      <label>Work: {settingsInfo.workMin}:00</label>
                      <ReactSlider
                        className={'slider'}
                        thumbClassName={'thumb'}
                        trackClassName={'track'}
                        value={settingsInfo.workMin}
                        min={1}
                        max={120}
                        onChange={newValue => settingsInfo.setWorkMin(newValue)}
                        />
                      <br />
                      <label>Break: {settingsInfo.breakMin}:00</label>
                      <ReactSlider
                        className={'slider blue'}
                        thumbClassName={'thumb'}
                        trackClassName={'track'}
                        value={settingsInfo.breakMin}
                        min={1}
                        max={120}
                        onChange={newValue => settingsInfo.setBreakMin(newValue)}
                        />
                  </div>
              </div>
          </div>
        </div>
  )
}

export default Settings;