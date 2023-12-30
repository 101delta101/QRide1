import React from "react";
import Layout1 from "../Layout1/layout1";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <Layout1>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <a
              // href="http://localhost:3000/table"
              className="ag-courses-item_link"
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Aluva - Vytilla</div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a
              // href="http://localhost:3000/table"
              className="ag-courses-item_link"
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                Thrippunithura - Thoppumpady
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a
              // href="http://localhost:3000/table"
              className="ag-courses-item_link"
            >
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">Angamaly - Vytilla</div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a
              // href="http://localhost:3000/table"
              className="ag-courses-item_link"
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                Fort Kochi - Pookkattupady
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a
              // href="http://localhost:3000/table"
              className="ag-courses-item_link"
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Aluva - Infopark</div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a
              // href="http://localhost:3000/table"
              className="ag-courses-item_link"
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                Willington island - Infopark
              </div>
            </a>
          </div>
        </div>
      </div>
      
    </Layout1>
  );
};

export default Dashboard;
