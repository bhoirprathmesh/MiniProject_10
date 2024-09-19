/* eslint-disable react/no-unescaped-entities */
import React from "react";
// import { news, notifications, report } from "../data/Notifications";
import './Rules.css'; // Importing custom CSS

const Rules = () => {
  return (
    <div className="container my-5">
      <div className="w-100 mx-auto mb-4">
        <h2 className="text-success fw-bold mb-4">
          Latest Indian E-Waste Management Rules
        </h2>
        <p>
          <strong>Ministry of Environment, Forest and Climate Change</strong>
        </p>
        <p><strong>(EP Division)</strong></p>
        <p><strong>Dated the 16th March, 2022</strong></p>
        <p><strong>S.O. 1047(E)</strong></p>
        <p>
          <strong>Subject: The E-Waste (Management) Rules, 2022</strong>
        </p>
        <p className="mb-4">
          In exercise of the powers conferred by section 6, 8, and 25 of the
          Environment (Protection) Act, 1986 (29 of 1986), the Central
          Government hereby makes the following rules, namely:
        </p>

        <hr className="my-5" />

        <h3 className="text-success fw-bold mb-3">CHAPTER I</h3>
        <p><strong>Preliminary</strong></p>

        <p><strong>1. Short title and commencement.</strong></p>
        <p>
          (1) These rules may be called the E-Waste (Management) Rules, 2022.
        </p>
        <p>
          (2) They shall come into force on the date of their publication in the
          Official Gazette.
        </p>

        <p><strong>2. Definitions.</strong></p>
        <p>In these rules, unless the context otherwise requires,-</p>
        <ul className=" mb-4">
          <li className="list-group-item">
            (a) "Act" means the Environment (Protection) Act, 1986 (29 of 1986);
          </li>
          <li className="list-group-item">
            (b) "Appliance" means any electrical or electronic equipment that is
            designed for household use;
          </li>
          <li className="list-group-item">
            (c) "Authorized dismantler" means a person or entity authorized by
            the State Pollution Control Board to dismantle or disassemble
            e-waste;
          </li>
        </ul>

        <hr className="my-5" />

        <h3 className="text-success fw-bold mb-3">CHAPTER II</h3>
        <p><strong>Responsibility of Producers</strong></p>

        <p><strong>3. Extended producer responsibility.</strong></p>
        <p>
          (1) Every producer shall be responsible for establishing a system to
          collect, refurbish, recycle, or dispose of e-waste generated from his
          products in an environmentally sound manner.
        </p>

        <p><strong>4. Collection of E-Waste from Consumers.</strong></p>
        <p>
          (1) Producers shall set up collection centers for the return of
          end-of-life electronic products from consumers.
        </p>
        <p>
          (2) Producers shall provide information to consumers about the
          location of collection centers and the procedures to return
          end-of-life electronic products.
        </p>

        <p><strong>5. Recycling Targets.</strong></p>
        <p>
          (1) Producers shall achieve the recycling targets specified in
          Schedule II of these rules.
        </p>
        <p>
          (2) Producers failing to meet the recycling targets shall pay a
          financial penalty as specified by the Central Pollution Control Board.
        </p>

        <p><strong>6. Labeling of Electronic Products.</strong></p>
        <p>
          (1) Every electronic product shall be labeled with information about
          environmentally hazardous substances contained in the product and the
          safe disposal practices.
        </p>
        <p>
          (2) The Central Pollution Control Board shall prescribe the manner and
          form of labeling.
        </p>

        <p><strong>7. Annual Reporting.</strong></p>
        <p>
          (1) Producers shall submit an annual report to the State Pollution
          Control Board regarding the collection and recycling of e-waste.
        </p>
        <p>
          (2) The format and details of the annual report shall be specified by
          the Central Pollution Control Board.
        </p>

        <p><strong>8. Transportation and Handling of E-Waste.</strong></p>
        <p>
          (1) Producers and authorized dismantlers shall ensure safe and
          environmentally sound transportation and handling of e-waste.
        </p>
        <p>
          (2) The vehicles used for transportation shall comply with the
          guidelines provided by the Central Pollution Control Board.
        </p>

        <p><strong>9. Awareness Programs.</strong></p>
        <p>
          (1) Producers shall organize and participate in awareness programs to
          educate consumers and the general public about the proper disposal of
          e-waste.
        </p>
        <p>
          (2) The programs shall highlight the environmental impact of improper
          e-waste disposal and promote responsible recycling practices.
        </p>

        <p><strong>10. Prohibition of Unauthorized Handling.</strong></p>
        <p>
          (1) Unauthorized handling, including dismantling and recycling of
          e-waste, is strictly prohibited.
        </p>
        <p>
          (2) Violation of this rule may lead to legal consequences, including
          fines and penalties.
        </p>

        <p>
          <strong>
            11. Collaboration with Authorized Treatment and Disposal Facilities.
          </strong>
        </p>
        <p>
          (1) Producers shall collaborate with authorized treatment and disposal
          facilities for the environmentally safe processing of e-waste.
        </p>
        <p>
          (2) The facilities must comply with the standards set by regulatory
          authorities.
        </p>
      </div>

      <hr className="my-5" />

      {/* <hr className="my-5" />

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <h2 className="card-header bg-success text-white">Notification</h2>
            <div className="card-body overflow-auto">
              {notifications.map((notification, index) => (
                <div key={index} className="mb-3">
                  <h3 className="h5">{notification.title}</h3>
                  <a
                    href={notification.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-decoration-underline"
                  >
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <h2 className="card-header bg-success text-white">News</h2>
            <div className="card-body overflow-auto">
              {news.map((notification, index) => (
                <div key={index} className="mb-3">
                  <h3 className="h5">{notification.title}</h3>
                  <p className="mb-1">{notification.date}</p>
                  <p>{notification.content}</p>
                  <a
                    href={notification.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-decoration-underline"
                  >
                    Read More
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <h2 className="card-header bg-success text-white">
              E-waste Annual Report for Maharashtra
            </h2>
            <div className="card-body overflow-auto">
              {report.map((notification, index) => (
                <div key={index} className="mb-3">
                  <h3 className="h5">{notification.title}</h3>
                  <a
                    href={notification.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-decoration-underline"
                  >
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" /> */}
    </div>
  );
};

export default Rules;
