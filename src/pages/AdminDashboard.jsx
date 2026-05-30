import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  FiGrid, FiUser, FiCode, FiBriefcase, FiFileText, 
  FiShare2, FiLogOut, FiSave, FiPlus, FiTrash2,
  FiMenu, FiCamera, FiRefreshCw, FiEdit2,
  FiGithub, FiLinkedin, FiInstagram, FiMail, FiTwitter, FiCheck, FiAlertCircle,
  FiUpload, FiFolder, FiExternalLink, FiX, FiImage
} from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { portfolioData, updateProfile, updateAbout, updateExperience, updateSkills, updateResume, updateProjects } = useData();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Section Components
  


  const ProfileEditor = () => {
    const [localProfile, setLocalProfile] = useState(portfolioData.profile);
    const [localAbout, setLocalAbout] = useState(portfolioData.about);
    const heroInputRef = useRef(null);
    const aboutInputRef = useRef(null);

    const handleImageUpload = (e, type) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (type === 'hero') {
            setLocalProfile({ ...localProfile, image: reader.result });
          } else {
            setLocalAbout({ ...localAbout, image: reader.result });
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSave = () => {
      updateProfile(localProfile);
      updateAbout(localAbout);
      alert('Portfolio Updated Successfully!');
    };

    return (
      <div className="admin-section">
        <h2 className="section-title mono">PROFILE_MANAGEMENT</h2>
        
        <div className="editor-card glass">
          <div className="admin-field">
            <label className="mono">DISPLAY NAME</label>
            <input type="text" value={localProfile.name} onChange={e => setLocalProfile({...localProfile, name: e.target.value})} />
          </div>

          <div className="admin-field">
            <label className="mono">ABOUT DESCRIPTION</label>
            <textarea rows="5" value={localAbout.paragraph} onChange={e => setLocalAbout({...localAbout, paragraph: e.target.value})} />
          </div>

          <div className="profile-images-section">
            <h3 className="section-subtitle mono">PROFILE IMAGES</h3>
            
            <div className="upload-grid">
              {/* Hero Image Card */}
              <div className="upload-container">
                <label className="mono">Hero Profile Image</label>
                <div className="modern-preview-box glass">
                  <img src={localProfile.image || '/profile.jpg'} alt="Hero" />
                </div>
                <input 
                  type="file" 
                  ref={heroInputRef} 
                  hidden 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'hero')} 
                />
                <div className="modern-upload-box" onClick={() => heroInputRef.current.click()}>
                  <FiCamera className="upload-ico" />
                  <span className="mono">UPDATE_HERO_PIC</span>
                </div>
              </div>

              {/* About Image Card */}
              <div className="upload-container">
                <label className="mono">About Section Image</label>
                <div className="modern-preview-box glass">
                  <img src={localAbout.image || '/profile_2.jpg'} alt="About" />
                </div>
                <input 
                  type="file" 
                  ref={aboutInputRef} 
                  hidden 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'about')} 
                />
                <div className="modern-upload-box" onClick={() => aboutInputRef.current.click()}>
                  <FiCamera className="upload-ico" />
                  <span className="mono">UPDATE_ABOUT_PIC</span>
                </div>
              </div>
            </div>
          </div>

          <button className="save-btn full-width mono" onClick={handleSave} style={{marginTop: '4rem'}}>
            <FiSave /> COMMIT_CHANGES
          </button>
        </div>
      </div>
    );
  };

  const SkillsEditor = () => {
    const [skills, setSkills] = useState(portfolioData.skills);

    const removeSkill = (type, index) => {
      const newSkills = { ...skills };
      newSkills[type].splice(index, 1);
      setSkills(newSkills);
      updateSkills(newSkills);
    };

    const addSkill = (type) => {
      const name = prompt("Enter skill name:");
      if (!name) return;
      
      // Basic auto-resolve logic for icon names
      const cleanName = name.replace(/[^a-zA-Z0-9]/g, '');
      const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
      let icon = `Si${capitalized}`;
      
      // Handle known special cases
      if (name.toLowerCase() === 'c#') icon = 'SiCsharp';
      if (name.toLowerCase() === 'c++') icon = 'SiCplusplus';

      const newSkills = { ...skills };
      newSkills[type].push({ name, icon });
      setSkills(newSkills);
      updateSkills(newSkills);
    };

    return (
      <div className="admin-section">
        <h2 className="section-title mono">SKILLS_VAULT</h2>
        
        <div className="skills-manager">
          <div className="manager-col">
            <div className="col-header">
              <h3 className="mono">TECHNOLOGIES</h3>
              <button className="add-skill-btn" onClick={() => addSkill('technologies')}><FiPlus /></button>
            </div>
            <div className="skills-list">
              {skills.technologies.map((s, i) => (
                <div key={i} className="skill-row glass">
                  <span>{s.name}</span>
                  <button className="del-btn" onClick={() => removeSkill('technologies', i)}><FiTrash2 /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="manager-col">
            <div className="col-header">
              <h3 className="mono">TOOLS</h3>
              <button className="add-skill-btn" onClick={() => addSkill('tools')}><FiPlus /></button>
            </div>
            <div className="skills-list">
              {skills.tools.map((s, i) => (
                <div key={i} className="skill-row glass">
                  <span>{s.name}</span>
                  <button className="del-btn" onClick={() => removeSkill('tools', i)}><FiTrash2 /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="commit-btn-solid mono" onClick={() => updateSkills(skills)}>
          <FiSave /> COMMIT_CHANGES
        </button>
      </div>
    );
  };

  const ExperienceEditor = () => {
    const [experience, setExperience] = useState(portfolioData.experience);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [editingExp, setEditingExp] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    
    const [formData, setFormData] = useState({
      role: '',
      company: '',
      duration: '',
      description: ''
    });

    const openAddModal = () => {
      setEditingExp(null);
      setFormData({ role: '', company: '', duration: '', description: '' });
      setIsModalOpen(true);
    };

    const openEditModal = (exp) => {
      setEditingExp(exp);
      setFormData({ ...exp });
      setIsModalOpen(true);
    };

    const handleSave = () => {
      let newExp;
      if (editingExp) {
        newExp = experience.map(e => e.id === editingExp.id ? { ...formData, id: editingExp.id } : e);
      } else {
        newExp = [...experience, { ...formData, id: Date.now() }];
      }
      setExperience(newExp);
      updateExperience(newExp);
      setIsModalOpen(false);
    };

    const confirmDelete = (id) => {
      setDeleteId(id);
      setIsDeleteConfirmOpen(true);
    };

    const executeDelete = () => {
      const newExp = experience.filter(e => e.id !== deleteId);
      setExperience(newExp);
      updateExperience(newExp);
      setIsDeleteConfirmOpen(false);
    };

    return (
      <div className="admin-section">
        <div className="exp-header-row">
          <h2 className="section-title mono" style={{marginBottom: 0}}>EXPERIENCE_TIMELINE</h2>
          <button className="add-exp-btn-top mono" onClick={openAddModal}>
            <FiPlus /> ADD_NEW_EXPERIENCE
          </button>
        </div>

        <div className="exp-timeline-wrapper">
          {experience.map((exp) => (
            <div key={exp.id} className="exp-card-modern glass">
              <div className="exp-node"></div>
              
              <div className="exp-card-info">
                <h3 className="mono">{exp.role}</h3>
                <div className="company-duration-row">
                  <div className="company-name mono">{exp.company}</div>
                  <div className="duration-badge mono">[ {exp.duration} ]</div>
                </div>
              </div>
              
              <p className="exp-description">
                {exp.description || "Building scalable full-stack applications and data-driven solutions with modern web technologies and problem-solving expertise."}
              </p>

              <div className="exp-actions-bottom">
                <button className="action-btn-pill edit" onClick={() => openEditModal(exp)}>
                  <FiEdit2 /> EDIT
                </button>
                <button className="action-btn-pill delete" onClick={() => confirmDelete(exp.id)}>
                  <FiTrash2 /> DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="admin-modal-overlay">
            <div className="admin-modal-card glass">
              <h3 className="modal-title mono">{editingExp ? 'EDIT_EXPERIENCE' : 'ADD_NEW_EXPERIENCE'}</h3>
              <div className="modal-form">
                <div className="modal-field">
                  <label className="mono">ROLE TITLE</label>
                  <input 
                    type="text" 
                    value={formData.role} 
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                
                <div className="modal-grid">
                  <div className="modal-field">
                    <label className="mono">COMPANY NAME</label>
                    <input 
                      type="text" 
                      value={formData.company} 
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      placeholder="e.g. TechCorp Solutions"
                    />
                  </div>
                  <div className="modal-field">
                    <label className="mono">DURATION</label>
                    <input 
                      type="text" 
                      value={formData.duration} 
                      onChange={e => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g. May 2025 - Present"
                    />
                  </div>
                </div>

                <div className="modal-field">
                  <label className="mono">DESCRIPTION</label>
                  <textarea 
                    rows="4" 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your role and impact..."
                  />
                </div>

                <div className="modal-actions">
                  <button className="modal-btn cancel mono" onClick={() => setIsModalOpen(false)}>CANCEL</button>
                  <button className="modal-btn save mono" onClick={handleSave}>SAVE EXPERIENCE</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {isDeleteConfirmOpen && (
          <div className="admin-modal-overlay">
            <div className="admin-modal-card glass" style={{maxWidth: '450px', textAlign: 'center'}}>
              <h3 className="modal-title mono" style={{border: 'none', padding: 0}}>DELETE_CONFIRMATION</h3>
              <p className="mono" style={{color: 'rgba(255,255,255,0.7)', margin: '2rem 0'}}>
                Are you sure you want to permanently delete this experience entry?
              </p>
              <div className="modal-actions" style={{justifyContent: 'center'}}>
                <button className="modal-btn cancel mono" onClick={() => setIsDeleteConfirmOpen(false)}>CANCEL</button>
                <button className="modal-btn delete mono" onClick={executeDelete}>CONFIRM DELETE</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SocialLinksEditor = () => {
    // Temporary state — nothing updates publicly until COMMIT_CHANGES
    const initial = portfolioData.profile;
    const [temp, setTemp] = useState({
      github:    initial.github    || '',
      linkedin:  initial.linkedin  || '',
      instagram: initial.instagram || '',
      email:     initial.email     || '',
      twitter:   initial.twitter   || '',
      leetcode:  initial.leetcode  || '',
    });
    const [errors,  setErrors]  = useState({});
    const [toast,   setToast]   = useState(false);
    const [saving,  setSaving]  = useState(false);

    const urlRe   = /^https?:\/\/.+\..+/;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = () => {
      const e = {};
      if (temp.github    && !urlRe.test(temp.github))    e.github    = 'Must be a valid URL (https://…)';
      if (temp.linkedin  && !urlRe.test(temp.linkedin))  e.linkedin  = 'Must be a valid URL (https://…)';
      if (temp.instagram && !urlRe.test(temp.instagram)) e.instagram = 'Must be a valid URL (https://…)';
      if (temp.twitter   && !urlRe.test(temp.twitter))   e.twitter   = 'Must be a valid URL (https://…)';
      if (temp.leetcode  && !urlRe.test(temp.leetcode))  e.leetcode  = 'Must be a valid URL (https://…)';
      if (temp.email     && !emailRe.test(temp.email))   e.email     = 'Must be a valid email address';
      setErrors(e);
      return Object.keys(e).length === 0;
    };

    const handleCommit = () => {
      if (!validate()) return;
      setSaving(true);
      setTimeout(() => {
        updateProfile({ ...initial, ...temp });
        setSaving(false);
        setToast(true);
        setTimeout(() => setToast(false), 3500);
      }, 400);
    };

    const field = (key, label, Icon, placeholder, type = 'text') => (
      <div className="social-field-wrap">
        <label className="mono">{label}</label>
        <div className={`social-input-row ${errors[key] ? 'has-error' : ''}`}>
          <Icon className="social-input-icon" />
          <input
            type={type}
            value={temp[key]}
            placeholder={placeholder}
            onChange={e => setTemp({ ...temp, [key]: e.target.value })}
          />
        </div>
        {errors[key] && (
          <span className="social-error mono">
            <FiAlertCircle /> {errors[key]}
          </span>
        )}
      </div>
    );

    return (
      <div className="admin-section">
        {/* Success Toast */}
        {toast && (
          <div className="social-toast glass">
            <FiCheck className="toast-icon" />
            <span className="mono">Social links updated successfully!</span>
          </div>
        )}

        <h2 className="section-title mono">SOCIAL_CONNECTIONS</h2>
        <div className="editor-card glass social-editor-card">

          <div className="social-fields-grid">
            {field('github',    'GITHUB URL',    FiGithub,    'https://github.com/username')}
            {field('linkedin',  'LINKEDIN URL',  FiLinkedin,  'https://linkedin.com/in/username')}
            {field('instagram', 'INSTAGRAM URL', FiInstagram, 'https://instagram.com/username')}
            {field('email',     'EMAIL ADDRESS', FiMail,      'your@email.com', 'email')}
          </div>

          <p className="social-optional-label mono">OPTIONAL LINKS</p>
          <div className="social-fields-grid">
            {field('twitter',  'TWITTER / X URL', FiTwitter,  'https://twitter.com/username')}
            {field('leetcode', 'LEETCODE URL',    FiCode,     'https://leetcode.com/username')}
          </div>

          <button
            className={`commit-btn-solid mono ${saving ? 'saving' : ''}`}
            onClick={handleCommit}
            disabled={saving}
          >
            {saving ? 'SAVING…' : <><FiSave /> COMMIT_CHANGES</>}
          </button>
        </div>
      </div>
    );
  };

  /* ─────────────────────────────────────────
     RESUME MANAGER
  ───────────────────────────────────────── */
  const ResumeManager = () => {
    const [pendingFile, setPendingFile] = useState(null);
    const [previewName, setPreviewName] = useState(null);
    const [previewSize, setPreviewSize] = useState(null);
    const [isDragging,  setIsDragging]  = useState(false);
    const [toast,  setToast]  = useState(false);
    const [saving, setSaving] = useState(false);
    const resumeRef = useRef(null);

    const showToast = () => { setToast(true); setTimeout(() => setToast(false), 3500); };

    const handleFile = (file) => {
      if (!file) return;
      const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowed.includes(file.type)) { alert('Only PDF or DOCX files are accepted.'); return; }
      setPendingFile(file);
      setPreviewName(file.name);
      setPreviewSize((file.size / 1024).toFixed(1) + ' KB');
    };

    const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); };

    const handleCommit = () => {
      if (!pendingFile) { alert('Please select a resume file first.'); return; }
      setSaving(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          updateResume(reader.result);
          setSaving(false); showToast(); setPendingFile(null);
        }, 400);
      };
      reader.readAsDataURL(pendingFile);
    };

    const handleRemove = () => {
      if (window.confirm('Remove the current resume?')) { updateResume(null); setPendingFile(null); setPreviewName(null); }
    };

    const currentResume = portfolioData.resume;
    const uploadDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
      <div className="admin-section">
        {toast && (
          <div className="social-toast glass">
            <FiCheck className="toast-icon" />
            <span className="mono">Resume updated successfully!</span>
          </div>
        )}
        <h2 className="section-title mono">RESUME_MANAGEMENT</h2>

        {currentResume && (
          <div className="resume-current-card glass">
            <div className="resume-file-icon"><FiFileText /></div>
            <div className="resume-file-info">
              <p className="resume-filename mono">
                {typeof currentResume === 'string' && currentResume.startsWith('/')
                  ? currentResume.split('/').pop()
                  : (previewName || 'resume.pdf')}
              </p>
              <p className="resume-meta mono">Uploaded: {uploadDate}</p>
            </div>
            <span className="resume-badge mono">ACTIVE</span>
          </div>
        )}

        <div
          className={`resume-dropzone ${isDragging ? 'dragging' : ''} ${pendingFile ? 'has-file' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => resumeRef.current.click()}
        >
          <input type="file" ref={resumeRef} hidden accept=".pdf,.docx"
            onChange={(e) => handleFile(e.target.files[0])} />
          {pendingFile ? (
            <>
              <FiFileText className="dz-icon active" />
              <p className="dz-label mono">{previewName}</p>
              <p className="dz-sub mono">{previewSize} · Ready to commit</p>
            </>
          ) : (
            <>
              <FiUpload className="dz-icon" />
              <p className="dz-label mono">Drop PDF / DOCX here</p>
              <p className="dz-sub mono">or click to browse</p>
            </>
          )}
        </div>

        <div className="resume-actions">
          <button className="resume-remove-btn mono" onClick={handleRemove}>
            <FiTrash2 /> REMOVE_RESUME
          </button>
          <button
            className={`commit-btn-solid mono ${saving ? 'saving' : ''}`}
            onClick={handleCommit}
            disabled={saving}
          >
            {saving ? 'SAVING…' : <><FiSave /> COMMIT_CHANGES</>}
          </button>
        </div>
      </div>
    );
  };

  /* ─────────────────────────────────────────
     PROJECT MANAGER
  ───────────────────────────────────────── */
  const ProjectManager = () => {
    const [pendingProjects, setPending]    = useState(portfolioData.projects || []);
    const [committedSnap,   setCommitted]  = useState(JSON.stringify(portfolioData.projects || []));
    const [isModalOpen,  setModalOpen]  = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [editingProj,  setEditingProj] = useState(null);
    const [deleteId,     setDeleteId]   = useState(null);
    const [toast,  setToast]  = useState(false);
    const [saving, setSaving] = useState(false);
    const imgRef = useRef(null);

    // Lock background scroll while any modal is open, restore on close / unmount
    useEffect(() => {
      if (isModalOpen || isDeleteOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => { document.body.style.overflow = ''; };
    }, [isModalOpen, isDeleteOpen]);

    const emptyForm = { title: '', description: '', technologies: '', github: '', live: '', thumbnail: '', status: 'active' };
    const [form, setForm]           = useState(emptyForm);
    const [formErrors, setFormErrors] = useState({});

    const urlRe = /^https?:\/\/.+\..+/;

    const validateForm = () => {
      const e = {};
      if (!form.title.trim())       e.title       = 'Title is required';
      if (!form.description.trim()) e.description = 'Description is required';
      if (form.github && !urlRe.test(form.github)) e.github = 'Must be a valid URL';
      if (form.live   && !urlRe.test(form.live))   e.live   = 'Must be a valid URL';
      setFormErrors(e);
      return Object.keys(e).length === 0;
    };

    const openAdd = () => { setEditingProj(null); setForm(emptyForm); setFormErrors({}); setModalOpen(true); };
    const openEdit = (proj) => {
      setEditingProj(proj);
      setForm({
        title: proj.title, description: proj.description,
        technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies,
        github: proj.github || '', live: proj.live || '', thumbnail: proj.thumbnail || '', status: proj.status || 'active',
      });
      setFormErrors({});
      setModalOpen(true);
    };

    const handleImgUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => setForm(f => ({ ...f, thumbnail: reader.result }));
      reader.readAsDataURL(file);
    };

    const saveModal = () => {
      if (!validateForm()) return;
      const tech = form.technologies.split(',').map(t => t.trim()).filter(Boolean);
      const entry = { ...form, technologies: tech, id: editingProj ? editingProj.id : Date.now() };
      const updated = editingProj
        ? pendingProjects.map(p => p.id === editingProj.id ? entry : p)
        : [...pendingProjects, entry];
      setPending(updated);
      setModalOpen(false);
    };

    const confirmDelete = (id) => { setDeleteId(id); setDeleteOpen(true); };
    const executeDelete = () => { setPending(prev => prev.filter(p => p.id !== deleteId)); setDeleteOpen(false); };

    const commitAll = () => {
      setSaving(true);
      setTimeout(() => {
        updateProjects(pendingProjects);
        setCommitted(JSON.stringify(pendingProjects));
        setSaving(false);
        setToast(true);
        setTimeout(() => setToast(false), 3500);
      }, 400);
    };

    const hasPendingChanges = JSON.stringify(pendingProjects) !== committedSnap;

    return (
      <div className="admin-section">
        {toast && (
          <div className="social-toast glass">
            <FiCheck className="toast-icon" />
            <span className="mono">Projects updated successfully!</span>
          </div>
        )}

        <div className="exp-header-row">
          <h2 className="section-title mono" style={{ marginBottom: 0 }}>PROJECT_MANAGEMENT</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {hasPendingChanges && (
              <button
                className={`social-commit-btn mono ${saving ? 'saving' : ''}`}
                onClick={commitAll} disabled={saving} style={{ marginTop: 0 }}
              >
                {saving ? 'SAVING…' : <><FiCheck /> COMMIT_CHANGES</>}
              </button>
            )}
            <button className="add-exp-btn-top mono" onClick={openAdd}>
              <FiPlus /> ADD_NEW_PROJECT
            </button>
          </div>
        </div>

        <div className="proj-admin-grid">
          {pendingProjects.map((proj) => (
            <div key={proj.id} className="proj-admin-card glass">
              <div className="proj-admin-thumb">
                {proj.thumbnail
                  ? <img src={proj.thumbnail} alt={proj.title} />
                  : <FiImage className="proj-thumb-placeholder" />}
                <span className={`proj-status-badge mono ${proj.status || 'active'}`}>
                  {(proj.status || 'ACTIVE').toUpperCase()}
                </span>
              </div>
              <div className="proj-admin-info">
                <h3 className="mono">{proj.title}</h3>
                <div className="proj-tech-row">
                  {(Array.isArray(proj.technologies) ? proj.technologies : []).slice(0, 4).map(t => (
                    <span key={t} className="proj-tech-badge mono">{t}</span>
                  ))}
                </div>
                <p className="proj-admin-desc">{proj.description}</p>
              </div>
              <div className="proj-admin-actions">
                {proj.github && proj.github !== '#' && (
                  <a href={proj.github} target="_blank" rel="noreferrer" className="proj-link-btn mono">
                    <FiGithub /> GITHUB
                  </a>
                )}
                {proj.live && proj.live !== '#' && (
                  <a href={proj.live} target="_blank" rel="noreferrer" className="proj-link-btn mono">
                    <FiExternalLink /> LIVE
                  </a>
                )}
                <button className="action-btn-pill edit" onClick={() => openEdit(proj)}><FiEdit2 /> EDIT</button>
                <button className="action-btn-pill delete" onClick={() => confirmDelete(proj.id)}><FiTrash2 /> DELETE</button>
              </div>
            </div>
          ))}
        </div>

        {pendingProjects.length === 0 && (
          <div className="proj-empty-state glass">
            <FiFolder className="proj-empty-icon" />
            <p className="mono">No projects yet. Click + ADD_NEW_PROJECT to get started.</p>
          </div>
        )}

        {/* Add / Edit Modal */}
        {isModalOpen && (
          <div className="admin-modal-overlay">
            <div className="admin-modal-card glass" style={{ maxWidth: '760px' }}>

              {/* Fixed Header */}
              <div className="modal-header">
                <h3 className="modal-title mono">
                  {editingProj ? 'EDIT_PROJECT' : 'ADD_NEW_PROJECT'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1.4rem', flexShrink: 0 }}
                >
                  <FiX />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="modal-body">
                <div className="modal-form">
                  <div className="proj-img-upload-box" onClick={() => imgRef.current.click()}>
                    <input type="file" ref={imgRef} hidden accept="image/*" onChange={handleImgUpload} />
                    {form.thumbnail
                      ? <img src={form.thumbnail} alt="preview" className="proj-img-preview" />
                      : <><FiImage className="proj-img-placeholder" /><span className="mono">Click to upload project image</span></>}
                  </div>
                  <div className="modal-field">
                    <label className="mono">PROJECT TITLE *</label>
                    <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. E-Commerce Platform" />
                    {formErrors.title && <span className="social-error mono"><FiAlertCircle /> {formErrors.title}</span>}
                  </div>
                  <div className="modal-field">
                    <label className="mono">DESCRIPTION *</label>
                    <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short project description…" />
                    {formErrors.description && <span className="social-error mono"><FiAlertCircle /> {formErrors.description}</span>}
                  </div>
                  <div className="modal-field">
                    <label className="mono">TECHNOLOGIES (comma separated)</label>
                    <input value={form.technologies} onChange={e => setForm(f => ({ ...f, technologies: e.target.value }))} placeholder="React, Node.js, MongoDB" />
                  </div>
                  <div className="modal-grid">
                    <div className="modal-field">
                      <label className="mono">GITHUB URL</label>
                      <input value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))} placeholder="https://github.com/…" />
                      {formErrors.github && <span className="social-error mono"><FiAlertCircle /> {formErrors.github}</span>}
                    </div>
                    <div className="modal-field">
                      <label className="mono">LIVE DEMO URL</label>
                      <input value={form.live} onChange={e => setForm(f => ({ ...f, live: e.target.value }))} placeholder="https://yourproject.com" />
                      {formErrors.live && <span className="social-error mono"><FiAlertCircle /> {formErrors.live}</span>}
                    </div>
                  </div>
                  <div className="modal-field">
                    <label className="mono">STATUS</label>
                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', color: '#fff', fontFamily: 'inherit' }}>
                      <option value="active">Active</option>
                      <option value="featured">Featured</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Buttons */}
              <div className="modal-actions">
                <button className="modal-btn cancel mono" onClick={() => setModalOpen(false)}>CANCEL</button>
                <button className="modal-btn save mono" onClick={saveModal}>SAVE PROJECT</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete confirmation */}
        {isDeleteOpen && (
          <div className="admin-modal-overlay">
            <div className="admin-modal-card glass" style={{ maxWidth: '450px', textAlign: 'center' }}>
              <h3 className="modal-title mono" style={{ border: 'none', padding: 0 }}>DELETE_PROJECT</h3>
              <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', margin: '2rem 0' }}>
                Permanently delete this project? This cannot be undone.
              </p>
              <div className="modal-actions" style={{ justifyContent: 'center' }}>
                <button className="modal-btn cancel mono" onClick={() => setDeleteOpen(false)}>CANCEL</button>
                <button className="modal-btn delete mono" onClick={executeDelete}>CONFIRM DELETE</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <aside className="admin-sidebar glass">


        <nav className="sidebar-nav">

          <NavLink to="/console-portal/dashboard/profile" className={({ isActive }) => `nav-item mono ${isActive ? 'active' : ''}`}>
            <FiUser /> <span>PROFILE</span>
          </NavLink>
          <NavLink to="/console-portal/dashboard/skills" className={({ isActive }) => `nav-item mono ${isActive ? 'active' : ''}`}>
            <FiCode /> <span>SKILLS</span>
          </NavLink>
          <NavLink to="/console-portal/dashboard/experience" className={({ isActive }) => `nav-item mono ${isActive ? 'active' : ''}`}>
            <FiBriefcase /> <span>EXPERIENCE</span>
          </NavLink>
          <NavLink to="/console-portal/dashboard/socials" className={({ isActive }) => `nav-item mono ${isActive ? 'active' : ''}`}>
            <FiShare2 /> <span>SOCIAL_LINKS</span>
          </NavLink>
          <NavLink to="/console-portal/dashboard/resume" className={({ isActive }) => `nav-item mono ${isActive ? 'active' : ''}`}>
            <FiFileText /> <span>RESUME</span>
          </NavLink>
          <NavLink to="/console-portal/dashboard/projects" className={({ isActive }) => `nav-item mono ${isActive ? 'active' : ''}`}>
            <FiFolder /> <span>PROJECTS</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn mono" onClick={handleLogout}>
            <FiLogOut /> <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-container">
          <Routes>
            <Route index element={<ProfileEditor />} />
            <Route path="profile" element={<ProfileEditor />} />
            <Route path="skills" element={<SkillsEditor />} />
            <Route path="experience" element={<ExperienceEditor />} />
            <Route path="socials" element={<SocialLinksEditor />} />
            <Route path="resume" element={<ResumeManager />} />
            <Route path="projects" element={<ProjectManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
