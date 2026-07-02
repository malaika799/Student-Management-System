'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStudents, deleteStudent } from '../../lib/api';
import toast from 'react-hot-toast';
import ProtectedRoute from '../components/ProtectedRoute';
import ConfirmModal from '../components/ConfirmModal';

export default function DashboardPage() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    try {
      await deleteStudent(studentToDelete.id);
      toast.success('Student removed');
      fetchStudents();
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setStudentToDelete(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="page-wrapper">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-brand">
            <div className="navbar-brand-icon">
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div>
              <div className="navbar-title">Student MS</div>
              <div className="navbar-subtitle">Management System</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost-dark">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </nav>

        <div className="content-container">
          {/* Page Header */}
          <div className="page-header animate-fade-in">
            <div>
              <h2 className="page-title">Students</h2>
              <p className="page-subtitle">Manage enrolled students and their details</p>
            </div>
            <button onClick={() => router.push('/students/add')} className="btn btn-primary">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Student
            </button>
          </div>

          {/* Stat Card */}
          <div className="animate-fade-in animate-fade-in-delay-1" style={{ marginBottom: '1.5rem' }}>
            <div className="stat-card" style={{ maxWidth: '280px' }}>
              <div className="stat-icon stat-icon-violet">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <div>
                <div className="stat-label">Total Enrolled</div>
                <div className="stat-value">{students.length}</div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="animate-fade-in animate-fade-in-delay-2">
            {loading ? (
              <div className="data-table-wrapper">
                <div className="loading-state">
                  <div className="spinner" />
                  <span style={{ fontSize: '0.875rem' }}>Loading students…</span>
                </div>
              </div>
            ) : students.length === 0 ? (
              <div className="data-table-wrapper">
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    </svg>
                  </div>
                  <p style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>No students yet</p>
                  <p style={{ fontSize: '0.875rem' }}>Add your first student to get started.</p>
                </div>
              </div>
            ) : (
              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Course</th>
                      <th>Enrolled</th>
                      <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, index) => (
                      <tr key={s.id}>
                        <td className="td-index">{index + 1}</td>
                        <td className="td-name">{s.name}</td>
                        <td className="td-email">{s.email}</td>
                        <td>
                          <span className={`badge ${s.gender === 'Female' ? 'badge-female' : 'badge-male'}`}>
                            {s.gender}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-course">{s.course}</span>
                        </td>
                        <td style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
                          {new Date(s.enrollmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            <button onClick={() => router.push(`/students/${s.id}`)} className="btn btn-info btn-sm">
                              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                              </svg>
                              View
                            </button>
                            <button onClick={() => router.push(`/students/edit/${s.id}`)} className="btn btn-warning btn-sm">
                              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                              Edit
                            </button>
                            <button onClick={() => handleDeleteClick(s)} className="btn btn-danger btn-sm">
                              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Custom Delete Modal */}
        <ConfirmModal
          isOpen={showModal}
          onConfirm={handleConfirmDelete}
          onCancel={() => { setShowModal(false); setStudentToDelete(null); }}
          studentName={studentToDelete?.name}
        />

      </div>
    </ProtectedRoute>
  );
}