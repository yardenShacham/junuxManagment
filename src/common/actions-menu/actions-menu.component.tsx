import * as React from 'react'

export const ActionsMenu = () => {
    return (
        <div className="action-menu-container">
            <ul>
                <li>
                    <div className="action-container">
                        <svg baseProfile="full" width="25" height="25" viewBox="0 0 25 25">
                            <path
                                d="M19.5 5.5v14h-14v-14h14m0-5h-14a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-14a5 5 0 0 0-5-5z">
                            </path>
                        </svg>
                        <div className="action-name">Add Background</div>
                    </div>
                </li>
                <li>
                    <div className="action-container">
                        <svg width="33" height="33">
                            <g>
                                <rect fill="#fff" height="35" width="35" y="-1" x="-1"/>
                                <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%">
                                    <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%"
                                          width="100%"/>
                                </g>
                            </g>
                            <g>
                                <g stroke="null">
                                    <ellipse stroke="#000" ry="14.707692" rx="15.353847" cy="16.430771"
                                             cx="16.500002" strokeWidth="1.5" fill="#fff"/>
                                    <text stroke="#000"
                                          transform="matrix(1.5200463559694368,0,0,0.8863568969438368,-351.66806137395304,-116.07422172229954) "
                                          textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24"
                                          y="158.4703" x="235.218682" strokeWidth="0" fill="#000000">F
                                    </text>
                                </g>
                            </g>
                        </svg>
                        <div className="action-name">Fields</div>
                    </div>
                </li>
                <li>
                    <div className="action-container">
                        <svg width="33" height="33">
                            <g>
                                <rect fill="#fff" id="canvas_background" height="35" width="35" y="-1" x="-1"/>
                                <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%">
                                    <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%"
                                          width="100%"/>
                                </g>
                            </g>
                            <g>
                                <ellipse stroke="#000" ry="14.707692" rx="15.353847" cy="16.430771"
                                         cx="16.500002" strokeWidth="1.5" fill="#fff"/>
                                <text stroke="#000"
                                      transform="matrix(1.5200463559694368,0,0,0.8863568969438368,-351.66806137395304,-116.07422172229954) "
                                      textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24"
                                      y="158.643871" x="238.761077" strokeWidth="0" fill="#000000">I
                                </text>
                            </g>
                        </svg>
                        <div className="action-name">Inputs</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}