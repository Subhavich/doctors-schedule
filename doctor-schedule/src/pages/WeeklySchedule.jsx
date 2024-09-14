import WorkHistoryModal from "./WorkHistoryModal";
import { useState } from "react";
const scheduleData = {
  weekStartDate: "2024-09-09",
  workTypes: ["Morning ER", "Night ER", "IPD"],
  schedule: [
    {
      date: "SEP-09",
      work: {
        "Morning ER": ["Dr. Alice Smith", "Dr. Carol Lee"],
        "Night ER": ["Dr. Bob Jones"],
        IPD: ["Dr. Alice Smith"],
      },
    },
    {
      date: "SEP-10",
      work: {
        "Morning ER": ["Dr. Carol Lee"],
        "Night ER": ["Dr. Alice Smith", "Dr. Bob Jones"],
        IPD: [],
      },
    },
    {
      date: "SEP-11",
      work: {
        "Morning ER": ["Dr. Bob Jones"],
        "Night ER": ["Dr. Carol Lee"],
        IPD: ["Dr. Alice Smith"],
      },
    },
    {
      date: "SEP-12",
      work: {
        "Morning ER": ["Dr. Alice Smith"],
        "Night ER": ["Dr. Bob Jones"],
        IPD: ["Dr. Carol Lee"],
      },
    },
    {
      date: "SEP-13",
      work: {
        "Morning ER": ["Dr. Carol Lee"],
        "Night ER": ["Dr. Alice Smith"],
        IPD: ["Dr. Bob Jones"],
      },
    },
    {
      date: "SEP-14",
      work: {
        "Morning ER": ["Dr. Bob Jones", "Dr. Carol Lee"],
        "Night ER": ["Dr. Alice Smith"],
        IPD: [],
      },
    },
    {
      date: "SEP-15",
      work: {
        "Morning ER": ["Dr. Alice Smith"],
        "Night ER": ["Dr. Carol Lee"],
        IPD: ["Dr. Bob Jones"],
      },
    },
  ],
};

const WeeklySchedule = () => {
  const { weekStartDate, workTypes, schedule } = scheduleData;
  // Modal related
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [workHistory, setWorkHistory] = useState([]);

  // Handle cell click
  const handleCellClick = (doctorName, workType, date) => {
    // Find work history for the selected doctor
    const history = schedule.flatMap(
      (day) =>
        day.work[workType]
          ?.filter((doctor) => doctor === doctorName)
          .map(() => ({
            date: day.date,
            workType: workType,
          })) || []
    );

    setSelectedDoctor(doctorName);
    setWorkHistory(history);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setWorkHistory([]);
  };

  const dates = schedule.map((day) => day.date);

  return (
    <div className="table-container">
      <h1>Weekly Schedule (Starting {weekStartDate})</h1>
      <table>
        <thead>
          <tr>
            <th>Work Type</th>
            {dates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {workTypes.map((workType) => (
            <tr key={workType}>
              <td>{workType}</td>
              {dates.map((date) => {
                const daySchedule = schedule.find((day) => day.date === date);
                const doctors = daySchedule
                  ? daySchedule.work[workType] || []
                  : [];
                return (
                  <td key={date}>
                    {doctors.length > 0
                      ? doctors.map((doctor) => (
                          <div
                            className="table-cell"
                            key={doctor}
                            onClick={() =>
                              handleCellClick(doctor, workType, date)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {doctor}
                          </div>
                        ))
                      : "No doctors"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for displaying work history */}
      <WorkHistoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        doctorName={selectedDoctor}
        workHistory={workHistory}
      />
    </div>
  );
};

export default WeeklySchedule;
