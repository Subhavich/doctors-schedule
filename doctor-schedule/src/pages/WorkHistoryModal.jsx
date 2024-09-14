import "./WorkHistoryModal.css";

const WorkHistoryModal = ({ isOpen, onClose, doctorName, workHistory }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Work History for {doctorName}</h2>
        <ul>
          {workHistory.map((entry, index) => (
            <li key={index}>
              <strong>Date:</strong> {entry.date} <br />
              <strong>Work Type:</strong> {entry.workType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkHistoryModal;
