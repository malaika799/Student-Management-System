'use client';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getStudent, updateStudent } from '../../../../lib/api';
import toast from 'react-hot-toast';

export default function EditStudentPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', gender: '', course: '' });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudent(id);
        const s = res.data;
        setForm({ name: s.name, email: s.email, gender: s.gender, course: s.course });
      } catch (err) {
        toast.error('Failed to load student');
        router.push('/dashboard');
      } finally {
        setFetching(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateStudent(id, form);
      toast.success('Student updated!');
      router.push('/dashboard');
    } catch (err) {
      toast.error('Failed to update student');
    } finally {
      setLoading(false);
    }
  };

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
                <h2 className="page-title">Edit Student</h2>
                <p className="page-subtitle">Update the student's enrollment details</p>
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
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-brand-violet), var(--color-brand-violet-glow))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0
                  }}>
                    {form.name ? form.name[0].toUpperCase() : '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{form.name || 'Student'}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>ID #{id}</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Full Name</label>
                      <div style={{ position: 'relative' }}>
                        <span className="form-input-icon">
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                          </svg>
                        </span>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required className="form-input form-input-with-icon" />
                      </div>
                    </div>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Email Address</label>
                      <div style={{ position: 'relative' }}>
                        <span className="form-input-icon">
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                          </svg>
                        </span>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required className="form-input form-input-with-icon" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select name="gender" value={form.gender} onChange={handleChange} required className="form-input" style={{ cursor: 'pointer' }}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Course</label>
                      <select name="course" value={form.course} onChange={handleChange} required className="form-input" style={{ cursor: 'pointer' }}>
                        <option value="">Select course</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-divider" />

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                      {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <svg className="spinner" style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" />
                          Saving…
                        </span>
                      ) : (
                        <>
                          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button type="button" onClick={() => router.push('/dashboard')} className="btn btn-secondary btn-lg" style={{ flex: 1 }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
