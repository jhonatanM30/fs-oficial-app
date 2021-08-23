import React, { useState, useEffect } from 'react'
import { helpHttp } from '../helpers/helpHttp';
import { openModal } from '../helpers/modal'

export const InformationTeam = ({ stateMoreDetails, setstateMoreDetails }) => {
 
  const [players, setdataPlayers] = useState([])
  
  let apiKey = '6dd30bcfa05531435924005166a0ba3499563d457e3fc312a37ad2681138866f'
  let api = helpHttp();
  let url = `https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${stateMoreDetails[0].team_key}&APIkey=${apiKey}`

  useEffect(() => {
    api.get(url).then(resp => {
      if (!resp.err) {
        setdataPlayers(resp['result'][0].players);      
        openModal('detailsModal')
      } else {
        alert(`Error ${resp.err}`)
      }
    })
  }, [])

  const handleReset = () => {      
    setdataPlayers([]);
    setstateMoreDetails([null, false])
  };

  return (
    <div className="container">
      <div className="modal fade" id="detailsModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="reset"  onClick={handleReset} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <h1 className="card-title">{stateMoreDetails[0].team_name}</h1>
                <img src={stateMoreDetails[0].team_logo} alt="logo" />
                <h5>Entrenador</h5>
                {stateMoreDetails[0].manager}
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Atras</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
