const PortalApp = (() => {
  const USER_KEY = 'summitPortalUsers';
  const SESSION_KEY = 'summitPortalSession';
  const SETTINGS_KEY = 'summitPortalSiteSettings';

  const defaultSiteSettings = {
    tagline: 'Elevated property performance engineered for people.',
    highlight: 'Now leasing: Harborfront Lofts — 98% occupancy milestone',
    maintenance: false,
    autoUpdates: true,
  };

  const defaultUsersSeed = [
    {
      id: 'user-1001',
      name: 'Avery Chen',
      email: 'owner@summitpm.com',
      role: 'Portfolio Owner',
      title: 'Managing Director, Lattice Capital',
      phone: '(312) 555-0198',
      status: 'Active',
      passwordHash: null,
      lastLogin: '2024-09-12T14:05:00.000Z',
      previousLogin: '2024-09-05T08:12:00.000Z',
      preferences: {
        digest: true,
        critical: true,
        townhall: true,
      },
      dashboard: {
        occupancy: 0.97,
        occupancyTrend: 1.4,
        noi: 1220000,
        noiTrend: 12,
        tickets: 3,
        ticketsResolved: 18,
        renewals: 6,
      },
      securityLog: [
        {
          device: 'Chrome on macOS',
          location: 'Chicago, IL',
          time: '2024-09-12T14:05:00.000Z',
        },
        {
          device: 'SummitPM Mobile',
          location: 'Chicago, IL',
          time: '2024-09-05T08:12:00.000Z',
        },
      ],
    },
  ];

  const mockResidentUpdates = [
    {
      title: 'Concierge wellness series announced',
      detail: 'Three-part rooftop wellness program scheduled for October residents.',
      time: '2024-09-11T15:24:00.000Z',
    },
    {
      title: 'Sustainability dashboard live',
      detail: 'Energy consumption report ready for board review before quarterly meeting.',
      time: '2024-09-10T11:00:00.000Z',
    },
    {
      title: 'Amenity booking surge',
      detail: 'Infinity pool reservations now at 86% capacity for the weekend.',
      time: '2024-09-09T08:45:00.000Z',
    },
    {
      title: 'Harborfront Lofts feedback',
      detail: 'Post-renovation satisfaction survey response rate crossed 92%.',
      time: '2024-09-08T19:10:00.000Z',
    },
  ];

  const mockTasks = [
    {
      title: 'Approve fall resident engagement campaign',
      due: '2024-09-15',
      priority: 'High',
    },
    {
      title: 'Upload August financial statements',
      due: '2024-09-13',
      priority: 'Medium',
    },
    {
      title: 'Review concierge staffing coverage',
      due: '2024-09-18',
      priority: 'Medium',
    },
    {
      title: 'Sign off on vendor sustainability proposal',
      due: '2024-09-20',
      priority: 'Low',
    },
  ];

  const state = {
    users: [],
    currentUser: null,
    siteSettings: null,
  };

  const elements = {};

  const authCopy = {
    login: {
      title: 'Welcome back',
      subtitle: 'Log in to access your personalized dashboard.',
    },
    signup: {
      title: 'Create your secure portal access',
      subtitle:
        'Set up a login to track performance and control the public-facing experience.',
    },
    forgot: {
      title: 'Reset your password',
      subtitle: 'Enter the email associated with your account to receive a reset link.',
    },
  };

  const clone = (value) => JSON.parse(JSON.stringify(value));

  const bufferToHex = (buffer) => {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return bufferToHex(hashBuffer);
  };

  const ensureDefaultUsers = async () => {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) {
      const seededUsers = clone(defaultUsersSeed);
      seededUsers[0].passwordHash = await hashPassword('Summit@123');
      localStorage.setItem(USER_KEY, JSON.stringify(seededUsers));
    }
  };

  const loadUsers = () => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      if (!stored) {
        state.users = clone(defaultUsersSeed);
        return;
      }
      state.users = JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse stored portal users', error);
      state.users = clone(defaultUsersSeed);
    }
  };

  const saveUsers = () => {
    localStorage.setItem(USER_KEY, JSON.stringify(state.users));
  };

  const loadSiteSettings = () => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (!stored) {
        state.siteSettings = clone(defaultSiteSettings);
        return;
      }
      state.siteSettings = { ...clone(defaultSiteSettings), ...JSON.parse(stored) };
    } catch (error) {
      console.error('Failed to parse stored site settings', error);
      state.siteSettings = clone(defaultSiteSettings);
    }
  };

  const saveSiteSettings = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.siteSettings));
  };

  const getSessionUserId = () =>
    localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);

  const persistSession = (userId, remember) => {
    if (remember) {
      localStorage.setItem(SESSION_KEY, userId);
      sessionStorage.removeItem(SESSION_KEY);
    } else {
      sessionStorage.setItem(SESSION_KEY, userId);
      localStorage.removeItem(SESSION_KEY);
    }
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const findUserByEmail = (email) =>
    state.users.find((user) => user.email.toLowerCase() === email.toLowerCase());

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const formatPercent = (value) => `${(value * 100).toFixed(0)}%`;

  const formatTrend = (value) =>
    `${value >= 0 ? '+' : ''}${value.toFixed(1)}% vs last period`;

  const formatRelative = (isoString) => {
    if (!isoString) return '—';
    const now = new Date();
    const date = new Date(isoString);
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    return date.toLocaleDateString();
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'First access';
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getDeviceFingerprint = () => {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) {
      return 'SummitPM Mobile';
    }
    if (/Macintosh/i.test(ua)) {
      return 'Browser on macOS';
    }
    if (/Windows/i.test(ua)) {
      return 'Browser on Windows';
    }
    return 'Secure browser session';
  };

  const renderDashboard = (user) => {
    const { dashboard } = user;
    if (!dashboard) return;
    elements.metricOccupancy.textContent = formatPercent(dashboard.occupancy);
    elements.metricOccupancyTrend.textContent = formatTrend(dashboard.occupancyTrend);
    elements.metricNoi.textContent = formatCurrency(dashboard.noi);
    elements.metricNoiTrend.textContent = `+${dashboard.noiTrend}% YoY`;
    elements.metricTickets.textContent = dashboard.tickets;
    elements.metricTicketsTrend.textContent = `${dashboard.ticketsResolved} resolved this week`;
    elements.metricRenewals.textContent = dashboard.renewals;
    elements.metricRenewalsTrend.textContent = 'Prepare retention offers';

    elements.residentUpdatesCount.textContent = `${mockResidentUpdates.length} updates queued`;
    elements.activityFeed.innerHTML = '';
    mockResidentUpdates.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="feed-title">${item.title}</div>
        <p>${item.detail}</p>
        <span class="feed-time">${formatRelative(item.time)}</span>
      `;
      elements.activityFeed.appendChild(li);
    });

    elements.taskList.innerHTML = '';
    mockTasks.forEach((task) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${task.title}</strong>
          <p>Due ${new Date(task.due).toLocaleDateString()}</p>
        </div>
        <span class="task-priority task-${task.priority.toLowerCase()}">${task.priority}</span>
      `;
      elements.taskList.appendChild(li);
    });
  };

  const populateSettingsForms = (user) => {
    const settings = state.siteSettings || defaultSiteSettings;
    elements.settingTagline.value = settings.tagline;
    elements.settingHighlight.value = settings.highlight;
    elements.settingMaintenance.checked = Boolean(settings.maintenance);
    elements.settingAutoUpdates.checked = Boolean(settings.autoUpdates);

    const prefs = user.preferences || {};
    elements.notifDigest.checked = Boolean(prefs.digest);
    elements.notifCritical.checked = Boolean(prefs.critical);
    elements.notifTownhall.checked = Boolean(prefs.townhall);
  };

  const populateProfileForm = (user) => {
    elements.profileName.value = user.name || '';
    elements.portalUserName.textContent = user.name || 'SummitPM Client';
    elements.portalUserRole.textContent = user.role || 'Client';
    elements.portalUserEmail.textContent = user.email;
    elements.profilePhone.value = user.phone || '';
    elements.profileTitle.value = user.title || '';
    elements.lastLogin.textContent = formatDate(user.previousLogin) || 'First access';
  };

  const renderSecurityLog = (user) => {
    elements.securityLog.innerHTML = '';
    (user.securityLog || []).slice(0, 5).forEach((entry) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="feed-title">${entry.device}</div>
        <p>${entry.location || 'Verified device'}</p>
        <span class="feed-time">${formatDate(entry.time)}</span>
      `;
      elements.securityLog.appendChild(li);
    });
  };

  const showFeedback = (el, message, type = 'info') => {
    if (!el) return;
    el.textContent = message;
    el.dataset.state = type;
    if (message) {
      setTimeout(() => {
        if (el.textContent === message) {
          el.textContent = '';
          el.dataset.state = '';
        }
      }, 6000);
    }
  };

  const switchAuthView = (view) => {
    elements.loginForm.classList.toggle('hidden', view !== 'login');
    elements.signupForm.classList.toggle('hidden', view !== 'signup');
    elements.forgotForm.classList.toggle('hidden', view !== 'forgot');

    document
      .querySelectorAll('.auth-toggle [data-auth]')
      .forEach((toggle) => toggle.classList.toggle('hidden', toggle.dataset.auth !== view));

    elements.authTitle.textContent = authCopy[view].title;
    elements.authSubtitle.textContent = authCopy[view].subtitle;
  };

  const enterPortal = (user, options = {}) => {
    state.currentUser = user;
    document.body.classList.add('portal-authenticated');
    elements.portalAuth.classList.add('hidden');
    elements.portalApp.classList.remove('hidden');
    populateSettingsForms(user);
    populateProfileForm(user);
    renderDashboard(user);
    renderSecurityLog(user);
    if (!options.skipScroll) {
      window.scrollTo({ top: elements.portalApp.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const logout = () => {
    clearSession();
    state.currentUser = null;
    document.body.classList.remove('portal-authenticated');
    elements.portalAuth.classList.remove('hidden');
    elements.portalApp.classList.add('hidden');
    switchAuthView('login');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    showFeedback(elements.loginFeedback, '');
    const email = elements.loginEmail.value.trim();
    const password = elements.loginPassword.value;
    const remember = elements.rememberMe.checked;

    const user = findUserByEmail(email);
    if (!user) {
      showFeedback(elements.loginFeedback, 'We could not find an account with that email.', 'error');
      return;
    }

    const hashed = await hashPassword(password);
    if (user.passwordHash !== hashed) {
      showFeedback(
        elements.loginFeedback,
        'Incorrect password. Please try again or reset your password.',
        'error',
      );
      return;
    }

    const nowIso = new Date().toISOString();
    user.previousLogin = user.lastLogin || nowIso;
    user.lastLogin = nowIso;
    const fingerprint = getDeviceFingerprint();
    user.securityLog = [
      {
        device: fingerprint,
        location: 'Secure session',
        time: nowIso,
      },
      ...(user.securityLog || []).slice(0, 4),
    ];
    saveUsers();
    persistSession(user.id, remember);
    enterPortal(user);
  };

  const generateDashboardSeed = () => ({
    occupancy: 0.94 + Math.random() * 0.05,
    occupancyTrend: 0.4 + Math.random() * 1.2,
    noi: 950000 + Math.floor(Math.random() * 400000),
    noiTrend: 8 + Math.floor(Math.random() * 6),
    tickets: Math.floor(Math.random() * 4) + 2,
    ticketsResolved: Math.floor(Math.random() * 15) + 8,
    renewals: Math.floor(Math.random() * 8) + 3,
  });

  const handleSignup = async (event) => {
    event.preventDefault();
    showFeedback(elements.signupFeedback, '');
    const name = elements.signupName.value.trim();
    const email = elements.signupEmail.value.trim();
    const password = elements.signupPassword.value;
    const confirm = elements.signupConfirm.value;

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email)) {
      showFeedback(elements.signupFeedback, 'Please provide a valid work email address.', 'error');
      return;
    }

    if (password !== confirm) {
      showFeedback(elements.signupFeedback, 'Passwords do not match. Please try again.', 'error');
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      showFeedback(
        elements.signupFeedback,
        'Use a stronger password with at least 8 characters, one capital letter, and one number.',
        'error',
      );
      return;
    }

    if (findUserByEmail(email)) {
      showFeedback(elements.signupFeedback, 'An account already exists for this email.', 'error');
      return;
    }

    const hashed = await hashPassword(password);
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'Portfolio Owner',
      title: '',
      phone: '',
      status: 'Active',
      passwordHash: hashed,
      lastLogin: new Date().toISOString(),
      previousLogin: null,
      preferences: {
        digest: true,
        critical: true,
        townhall: false,
      },
      dashboard: generateDashboardSeed(),
      securityLog: [],
    };

    state.users.push(newUser);
    saveUsers();
    persistSession(newUser.id, true);
    enterPortal(newUser, { skipScroll: false });
    showFeedback(elements.signupFeedback, 'Account created. You are now signed in.', 'success');
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    showFeedback(elements.forgotFeedback, '');
    const email = elements.forgotEmail.value.trim();
    if (!email) {
      showFeedback(elements.forgotFeedback, 'Please provide the email associated with your account.', 'error');
      return;
    }

    const user = findUserByEmail(email);
    if (!user) {
      showFeedback(
        elements.forgotFeedback,
        'If that email is registered, a reset link will arrive within a few minutes.',
        'info',
      );
      return;
    }

    showFeedback(
      elements.forgotFeedback,
      `A secure reset link has been sent to ${email}. Check your inbox for next steps.`,
      'success',
    );
  };

  const handleSiteSettings = (event) => {
    event.preventDefault();
    state.siteSettings = {
      ...state.siteSettings,
      tagline: elements.settingTagline.value.trim(),
      highlight: elements.settingHighlight.value.trim(),
      maintenance: elements.settingMaintenance.checked,
      autoUpdates: elements.settingAutoUpdates.checked,
    };
    saveSiteSettings();
    showFeedback(elements.siteSettingsFeedback, 'Site preferences updated successfully.', 'success');
  };

  const handleNotificationSettings = (event) => {
    event.preventDefault();
    if (!state.currentUser) return;
    state.currentUser.preferences = {
      digest: elements.notifDigest.checked,
      critical: elements.notifCritical.checked,
      townhall: elements.notifTownhall.checked,
    };
    saveUsers();
    showFeedback(elements.notificationFeedback, 'Notification preferences saved.', 'success');
  };

  const handleProfileUpdate = (event) => {
    event.preventDefault();
    if (!state.currentUser) return;
    state.currentUser.name = elements.profileName.value.trim();
    state.currentUser.phone = elements.profilePhone.value.trim();
    state.currentUser.title = elements.profileTitle.value.trim();
    saveUsers();
    populateProfileForm(state.currentUser);
    showFeedback(elements.profileFeedback, 'Profile updated successfully.', 'success');
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    if (!state.currentUser) return;
    const current = elements.passwordCurrent.value;
    const next = elements.passwordNew.value;
    const confirm = elements.passwordConfirm.value;
    showFeedback(elements.passwordFeedback, '');

    const hashedCurrent = await hashPassword(current);
    if (hashedCurrent !== state.currentUser.passwordHash) {
      showFeedback(elements.passwordFeedback, 'Current password is incorrect.', 'error');
      return;
    }

    if (next !== confirm) {
      showFeedback(elements.passwordFeedback, 'New passwords do not match.', 'error');
      return;
    }

    if (next.length < 8 || !/[A-Z]/.test(next) || !/[0-9]/.test(next) || !/[^A-Za-z0-9]/.test(next)) {
      showFeedback(
        elements.passwordFeedback,
        'Use at least 8 characters with a number, capital letter, and symbol.',
        'error',
      );
      return;
    }

    state.currentUser.passwordHash = await hashPassword(next);
    const nowIso = new Date().toISOString();
    state.currentUser.securityLog = [
      {
        device: 'Credential update',
        location: 'Secure session',
        time: nowIso,
      },
      ...(state.currentUser.securityLog || []).slice(0, 4),
    ];
    saveUsers();
    renderSecurityLog(state.currentUser);
    showFeedback(elements.passwordFeedback, 'Password updated successfully.', 'success');
    event.target.reset();
  };

  const bindMenu = () => {
    document.querySelectorAll('.portal-menu-link').forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.view;
        document
          .querySelectorAll('.portal-menu-link')
          .forEach((item) => item.classList.toggle('active', item === button));
        document
          .querySelectorAll('.portal-view')
          .forEach((view) => view.classList.toggle('hidden', view.dataset.view !== target));
      });
    });
  };

  const bindAuthSwitches = () => {
    document.querySelectorAll('[data-switch]').forEach((button) => {
      button.addEventListener('click', () => {
        switchAuthView(button.dataset.switch);
      });
    });
  };

  const bindEvents = () => {
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.signupForm.addEventListener('submit', handleSignup);
    elements.forgotForm.addEventListener('submit', handleForgotPassword);
    elements.siteSettingsForm.addEventListener('submit', handleSiteSettings);
    elements.notificationSettingsForm.addEventListener('submit', handleNotificationSettings);
    elements.profileForm.addEventListener('submit', handleProfileUpdate);
    elements.passwordForm.addEventListener('submit', handlePasswordUpdate);
    elements.logoutBtn.addEventListener('click', logout);
    bindMenu();
    bindAuthSwitches();
  };

  const cacheElements = () => {
    elements.portalAuth = document.getElementById('portal-auth');
    elements.portalApp = document.getElementById('portal-app');
    elements.authTitle = document.getElementById('auth-title');
    elements.authSubtitle = document.getElementById('auth-subtitle');
    elements.loginForm = document.getElementById('login-form');
    elements.signupForm = document.getElementById('signup-form');
    elements.forgotForm = document.getElementById('forgot-form');
    elements.loginEmail = document.getElementById('login-email');
    elements.loginPassword = document.getElementById('login-password');
    elements.rememberMe = document.getElementById('remember-me');
    elements.loginFeedback = document.getElementById('login-feedback');
    elements.signupName = document.getElementById('signup-name');
    elements.signupEmail = document.getElementById('signup-email');
    elements.signupPassword = document.getElementById('signup-password');
    elements.signupConfirm = document.getElementById('signup-confirm');
    elements.signupFeedback = document.getElementById('signup-feedback');
    elements.forgotEmail = document.getElementById('forgot-email');
    elements.forgotFeedback = document.getElementById('forgot-feedback');
    elements.metricOccupancy = document.getElementById('metric-occupancy');
    elements.metricOccupancyTrend = document.getElementById('metric-occupancy-trend');
    elements.metricNoi = document.getElementById('metric-noi');
    elements.metricNoiTrend = document.getElementById('metric-noi-trend');
    elements.metricTickets = document.getElementById('metric-tickets');
    elements.metricTicketsTrend = document.getElementById('metric-tickets-trend');
    elements.metricRenewals = document.getElementById('metric-renewals');
    elements.metricRenewalsTrend = document.getElementById('metric-renewals-trend');
    elements.residentUpdatesCount = document.getElementById('resident-updates-count');
    elements.activityFeed = document.getElementById('activity-feed');
    elements.taskList = document.getElementById('task-list');
    elements.settingTagline = document.getElementById('setting-tagline');
    elements.settingHighlight = document.getElementById('setting-highlight');
    elements.settingMaintenance = document.getElementById('setting-maintenance');
    elements.settingAutoUpdates = document.getElementById('setting-auto-updates');
    elements.siteSettingsForm = document.getElementById('site-settings-form');
    elements.siteSettingsFeedback = document.getElementById('site-settings-feedback');
    elements.notificationSettingsForm = document.getElementById('notification-settings-form');
    elements.notificationFeedback = document.getElementById('notification-feedback');
    elements.notifDigest = document.getElementById('notif-digest');
    elements.notifCritical = document.getElementById('notif-critical');
    elements.notifTownhall = document.getElementById('notif-townhall');
    elements.portalUserName = document.getElementById('portal-user-name');
    elements.portalUserRole = document.getElementById('portal-user-role');
    elements.portalUserEmail = document.getElementById('portal-user-email');
    elements.lastLogin = document.getElementById('last-login');
    elements.profileForm = document.getElementById('profile-form');
    elements.profileName = document.getElementById('profile-name');
    elements.profilePhone = document.getElementById('profile-phone');
    elements.profileTitle = document.getElementById('profile-title');
    elements.profileFeedback = document.getElementById('profile-feedback');
    elements.passwordForm = document.getElementById('password-form');
    elements.passwordCurrent = document.getElementById('password-current');
    elements.passwordNew = document.getElementById('password-new');
    elements.passwordConfirm = document.getElementById('password-confirm');
    elements.passwordFeedback = document.getElementById('password-feedback');
    elements.securityLog = document.getElementById('security-log');
    elements.logoutBtn = document.getElementById('logout-btn');
  };

  const restoreSessionIfPresent = () => {
    const sessionId = getSessionUserId();
    if (!sessionId) return;
    const user = state.users.find((item) => item.id === sessionId);
    if (user) {
      enterPortal(user, { skipScroll: true });
    }
  };

  const init = async () => {
    await ensureDefaultUsers();
    loadUsers();
    loadSiteSettings();
    cacheElements();
    bindEvents();
    restoreSessionIfPresent();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'portal') return;
  PortalApp.init();
});
