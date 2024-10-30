import React, { useEffect, useState } from 'react';
import { fetchProjectStatistics } from '../services/projectService'; // Replace with your service

const Dashboard = () => {
    const [statistics, setStatistics] = useState({
        totalTasks: 0,
        overdueTasks: 0,
        projectProgress: 0, // in percentage
    });

    useEffect(() => {
        const loadStatistics = async () => {
            try {
                const data = await fetchProjectStatistics();
                setStatistics(data);
            } catch (error) {
                console.error("Error fetching project statistics:", error);
            }
        };

        loadStatistics();
    }, []);

    return (
      <div></div>
        // <div className="container mt-5">
        //     <h2 className="mb-4">Project Dashboard</h2>
        //     <div className="row">
        //         <div className="col-md-4">
        //             <div className="card text-white bg-primary mb-3">
        //                 <div className="card-header">Total Tasks</div>
        //                 <div className="card-body">
        //                     <h5 className="card-title">{statistics.totalTasks}</h5>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="col-md-4">
        //             <div className="card text-white bg-danger mb-3">
        //                 <div className="card-header">Overdue Tasks</div>
        //                 <div className="card-body">
        //                     <h5 className="card-title">{statistics.overdueTasks}</h5>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="col-md-4">
        //             <div className="card text-white bg-success mb-3">
        //                 <div className="card-header">Project Progress</div>
        //                 <div className="card-body">
        //                     <h5 className="card-title">{statistics.projectProgress}%</h5>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="row mt-4">
        //         <div className="col-md-12">
        //             <h4>Additional Statistics (optional)</h4>
        //             {/* You can add more cards or charts here */}
        //         </div>
        //     </div>
        // </div>
    );
};

export default Dashboard;
