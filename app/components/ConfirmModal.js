'use client';

export default function ConfirmModal({ isOpen, onConfirm, onCancel, studentName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* Icon */}
        <div className="modal-icon-ring">
          <svg width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </div>

        <h3 className="modal-title">Delete Student?</h3>
        <p className="modal-desc">
          <strong>{studentName}</strong> ko permanently delete karna chahti hain?
          <br />Yeh action undo nahi ho sakta.
        </p>

        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}