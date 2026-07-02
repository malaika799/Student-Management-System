'use client';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getStudent } from '../../../lib/api';
import toast from 'react-hot-toast';

export default function StudentDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudent(id);
        setStudent(res.data);
      } catch (err) {
        toast.error('Failed to load student');
        router.push('/dashboard');
      } finally {
        setFetching(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (fetching) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-surface)' }}>
        <div className="loading-state">
          <div className="spinner" />
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Loading student data…</span>
        </div>
      </div>
    );
  }

  if (!student) return null;

  const infoRow = (label, value) => (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0.9rem 0', borderBottom: '1px solid var(--color-border)'
    }}>
      <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>{value}</span>
    </div>
  );

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
          <button onClick={() => router.push('/dashboard')} className="btn btn-ghost-dark">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
        </nav>

        <div className="content-container" style={{ maxWidth: '680px' }}>
          <div className="animate-fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Student Details</h2>
                <p className="page-subtitle">Complete profile of the enrolled student</p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                {/* Identity badge */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.875rem',
                  padding: '1rem 1.25rem',
                  background: 'linear-gradient(135deg, #ede9fe, #f5f3ff)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--color-border)'
                }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-brand-violet), var(--color-brand-violet-glow))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '1.125rem', flexShrink: 0
                  }}>
                    {student.name ? student.name[0].toUpperCase() : '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)' }}>{student.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>ID #{student.id}</div>
                  </div>
                </div>

                {infoRow('Full Name', student.name)}
                {infoRow('Email Address', student.email)}
                {infoRow('Gender', student.gender)}
                {infoRow('Course', student.course)}
                {infoRow('Enrollment Date', new Date(student.enrollmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))}

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button onClick={() => router.push(`/students/edit/${student.id}`)} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit Student
                  </button>
                  <button type="button" onClick={() => router.push('/dashboard')} className="btn btn-secondary btn-lg" style={{ flex: 1 }}>
                    Back to List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
