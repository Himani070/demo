import React from "react";
import "../styles/global.css";

function StatusLegend() {
    return (
        <div className="status-container">
            <div className="load-legend">
                <div className="status-item">
                    <span className="status-label no-load">No Load</span>&nbsp;&nbsp;
                    <span className="status-description">Below (kerbweight + 15% GVW)</span>
                </div>
                <div className="status-item">
                    <span className="status-label part-load">Part Load</span>&nbsp;&nbsp;
                    <span className="status-description">Between No Load & Full Load</span>
                </div>
                <div className="status-item">
                    <span className="status-label full-load">Full Load</span>&nbsp;&nbsp;
                    <span className="status-description">Above (GVW - 15% GVW)</span>
                </div>
            </div>

            
        </div>
    );
}

export default StatusLegend;

