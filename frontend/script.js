// Global variables
const API_BASE_URL = 'http://localhost:8000/api/v1';
let currentModal = null;

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    checkSystemStatus();
});

// Initialize event listeners
function initializeEventListeners() {
    // Feature card click event
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function() {
            const cardType = this.dataset.type;
            openModal(cardType);
        });
    });

    // Main action buttons
    document.getElementById('analyzeBtn').addEventListener('click', () => openModal('analyze'));
    document.getElementById('generateBtn').addEventListener('click', () => openModal('generate'));
    document.getElementById('communityBtn').addEventListener('click', () => openModal('community'));
    
    // Add market research button
    const researchBtn = document.getElementById('researchBtn');
    if (researchBtn) {
        researchBtn.addEventListener('click', () => openModal('research'));
    }

    // Modal close event
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-btn')) {
            closeModal();
        }
    });

    // ESC key Close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentModal) {
            closeModal();
        }
    });
}

// Check system status
async function checkSystemStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/status`);
        const data = await response.json();
        
        if (data.status === 'operational' || data.status === 'healthy') {
            updateStatusBadges('Operational');
        } else {
            updateStatusBadges('Offline');
        }
    } catch (error) {
        console.error('System status check failed:', error);
        updateStatusBadges('Offline');
    }
}

// Update status badges
function updateStatusBadges(status) {
    document.querySelectorAll('.status-badge').forEach(badge => {
        badge.textContent = status;
        badge.className = status === 'Operational' ? 'status-badge' : 'status-badge offline';
    });
}

// Open modal
function openModal(type) {
    const modalContent = getModalContent(type);
    
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">${modalContent.title}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    ${modalContent.body}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    currentModal = document.querySelector('.modal-overlay:last-child');
    
    // Show modal
    setTimeout(() => {
        currentModal.style.opacity = '1';
        currentModal.style.visibility = 'visible';
    }, 10);
    
    // Bind form submit event
    const form = currentModal.querySelector('form');
    if (form) {
        console.log(form)
        form.addEventListener('submit', (e) => handleFormSubmit(e, type));
    }
}

// Close modal
function closeModal() {
    if (currentModal) {
        currentModal.style.opacity = '0';
        currentModal.style.visibility = 'hidden';
        setTimeout(() => {
            currentModal.remove();
            currentModal = null;
        }, 300);
    }
}

// Get modal content
function getModalContent(type) {
    const contents = {
        analyze: {
            title: '🔍 User Analysis',
            body: `
                <form id="analyzeForm">
                    <div class="form-group">
                        <label class="form-label">GitHub Username</label>
                        <input type="text" class="form-input" name="username" placeholder="e.g.: octocat" required>
                        <div class="form-help">Enter the GitHub username to analyze</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Analysis depth</label>
                        <select class="form-select" name="depth">
                            <option value="basic">Basic Analysis</option>
                            <option value="deep">Deep Analysis</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Report language</label>
                        <select class="form-select" name="language">
                            <option value="zh">Chinese</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <span class="btn-icon">🚀</span>
                        Start Analysis
                    </button>
                </form>
                <div class="form-group">
    <label class="form-label">Language</label>
    <select class="form-select" name="language">
        <option value="zh">Chinese</option>
        <option value="en">English</option> // <--- MODIFY THIS
    </select>
</div>

// TO THIS:
<div class="form-group">
    <label class="form-label">Language</label>
    <select class="form-select" name="language">
        <option value="zh">Chinese</option>
        <option value="en" selected>English</option> // ADD 'selected'
    </select>
</div>
            `
        },
        generate: {
            title: '✨ AI Content Generation',
            body: `
                <form id="generateForm">
                    <div class="form-group">
                        <label class="form-label">Content type</label>
                        <select class="form-select" name="content_type" required>
                            <option value="">Select Content type</option>
                            <option value="blog_post">Blog Post</option>
                            <option value="social_media">Social Media</option>
                            <option value="email">Email Marketing</option>
                            <option value="documentation">Technical Documentation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Topic</label>
                        <input type="text" class="form-input" name="topic" placeholder="e.g.: React Best Practices" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Target audience</label>
                        <input type="text" class="form-input" name="target_audience" placeholder="e.g.: Front-end Developers">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Keywords</label>
                        <input type="text" class="form-input" name="keywords" placeholder="Separate by comma, e.g.: React, performance optimization, best practices">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Language</label>
                        <select class="form-select" name="language">
                            <option value="zh">Chinese</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <span class="btn-icon">✨</span>
                        Generate content
                    </button>
                </form>
            `
        },
        community: {
            title: '🤝 Community Interaction',
            body: `
                <form id="communityForm">
                    <div class="form-group">
                        <label class="form-label">Target repository</label>
                        <input type="text" class="form-input" name="repository" placeholder="e.g.: facebook/react" required>
                        <div class="form-help">Format: owner/repo</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Interaction type</label>
                        <select class="form-select" name="interaction_types" multiple>
                            <option value="star">Star Project</option>
                            <option value="follow">Follow User</option>
                            <option value="comment">Comment Interaction</option>
                            <option value="issue">Create Issue</option>
                        </select>
                        <div class="form-help">Hold Ctrl/Cmd to select multiple</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Lookback days</label>
                        <input type="number" class="form-input" name="lookback_days" value="30" min="1" max="365">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Language</label>
                        <select class="form-select" name="language">
                            <option value="zh">Chinese</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <span class="btn-icon">🤝</span>
                        Start interaction
                    </button>
                </form>
            `
        },
        campaign: {
            title: '📈 Marketing Campaign',
            body: `
                <form id="campaignForm">
                    <div class="form-group">
                        <label class="form-label">Campaign name</label>
                        <input type="text" class="form-input" name="campaign_name" placeholder="e.g.: React Developer Promotion Campaign" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Target audience</label>
                        <textarea class="form-textarea" name="target_audience" placeholder="Describe your target audience..."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Marketing goals</label>
                        <select class="form-select" name="goals" multiple>
                            <option value="brand_awareness">Brand Awareness</option>
                            <option value="user_acquisition">User Acquisition</option>
                            <option value="community_growth">Community Growth</option>
                            <option value="engagement">User Engagement</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Budget range</label>
                        <select class="form-select" name="budget">
                            <option value="low">Low Budget (< $1000)</option>
                            <option value="medium">Medium Budget ($1000-$5000)</option>
                            <option value="high">High Budget (> $5000)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Language</label>
                        <select class="form-select" name="language">
                            <option value="zh">Chinese</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <span class="btn-icon">📈</span>
                        Create campaign
                    </button>
                </form>
            `
        },
        research: {
            title: '📊 Market Research',
            body: `
                <form id="researchForm">
                    <div class="form-group">
                        <label class="form-label">Research type</label>
                        <select class="form-select" name="research_type" required>
                            <option value="">Select Research type</option>
                            <option value="competitor">Competitor Analysis</option>
                            <option value="technology">Technology Trend Research</option>
                            <option value="market">Market Trend Analysis</option>
                            <option value="user_feedback">User Feedback Analysis</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Research target</label>
                        <input type="text" class="form-input" name="target" placeholder="e.g.: Great Expectations, Data Quality Assessment" required>
                        <div class="form-help">Enter the specific target or Keywords for research</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Research depth</label>
                        <select class="form-select" name="depth">
                            <option value="shallow">Shallow Research (Quick)</option>
                            <option value="medium">Medium Depth</option>
                            <option value="deep">Deep Research (Detailed)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Report language</label>
                        <select class="form-select" name="language">
                            <option value="zh">Chinese</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Additional requirements (Optional)</label>
                        <textarea class="form-textarea" name="requirements" placeholder="e.g.: Focus on open source projects, include price comparison, etc."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <span class="btn-icon">🔍</span>
                        Start research
                    </button>
                </form>
            `
        }
    };
    
    return contents[type] || { title: 'Functionality', body: '<p>Functionality under development...</p>' };
}

// Handle form submit
async function handleFormSubmit(e, type) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Process special field mapping for User Analysis
    if (type === 'analyze') {
        // Convert username to user_list array
        if (data.username) {
            data.user_list = [data.username.trim()];
            delete data.username;
        }
        // Map depth to analysis_depth
        if (data.depth) {
            data.analysis_depth = data.depth;
            delete data.depth;
        }
    }
    
    // Process multi-select fields
    if (data.interaction_types) {
        data.interaction_types = formData.getAll('interaction_types');
    }
    if (data.goals) {
        data.goals = formData.getAll('goals');
    }
    
    // Process Keywords field (convert to array)
    if (data.keywords && typeof data.keywords === 'string') {
        data.keywords = data.keywords.split(',').map(k => k.trim()).filter(k => k);
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"><span class="spinner"></span>Processing...</span>';
    submitBtn.disabled = true;
    
    try {
        const result = await callAPI(type, data);
        // First close the current form modal
        closeModal();
        // Then show the results modal
        showResult(result, type);
    } catch (error) {
        // Improve error handling, ensuring the correct error message is displayed
        let errorMessage = 'Operation failed';
        if (typeof error === 'string') {
            errorMessage = error;
        } else if (error && error.message) {
            errorMessage = error.message;
        } else if (error && typeof error === 'object') {
            errorMessage = JSON.stringify(error);
        }
        showError(errorMessage);
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// API Call
async function callAPI(type, data) {
    const endpoints = {
        analyze: '/github/analyze',
        generate: '/content/generate',
        community: '/community/engage',
        campaign: '/marketing/comprehensive',
        research: '/research/enhanced'
    };
    
    const endpoint = endpoints[type];
    if (!endpoint) {
        throw new Error('Unknown operation type');
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        let errorMessage = `Request failed: ${response.status}`;
        try {
            const errorData = await response.json();
            if (errorData.detail) {
                errorMessage = errorData.detail;
            } else if (errorData.message) {
                errorMessage = errorData.message;
            } else if (typeof errorData === 'string') {
                errorMessage = errorData;
            }
        } catch (parseError) {
            // JSON parsing failed, use default error message
            console.error('Error parsing response:', parseError);
        }
        throw new Error(errorMessage);
    }
    
    return await response.json();
}

// Show results
function showResult(result, type) {
    // Format result content
    let resultContent = '';
    
    if (type === 'research' && result.result) {
        // Market Research results
        resultContent = `
            <div class="result-summary">
                <h4>📊 Research Summary</h4>
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="label">Research ID:</span>
                        <span class="value">${result.research_id || 'Unknown'}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Status:</span>
                        <span class="value status-${result.status}">${result.status === 'completed' ? 'Completed' : result.status}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Research type:</span>
                        <span class="value">${result.research_type || 'Unknown'}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Target:</span>
                        <span class="value">${result.target || 'Unknown'}</span>
                    </div>
                </div>
            </div>
            <div class="result-details">
                <h4>📋 Research Report</h4>
                <div class="research-content">
                    <pre>${result.result}</pre>
                </div>
            </div>
            ${result.metadata ? `
                <div class="result-details">
                    <h4>📊 Research Metadata</h4>
                    <div class="metadata-content">
                        <pre>${JSON.stringify(result.metadata, null, 2)}</pre>
                    </div>
                </div>
            ` : ''}
        `;
    } else if (result.engagement_result) {
        // Community Interaction results - Check first, as it might also contain an insights field
        const engagement = result.engagement_result;
        const config = engagement.config || {};
        // Process nested engagement_result structure
        const engagementData = engagement.engagement_result || engagement;
        
        resultContent = `
            <div class="result-summary">
                <h4>🤝 Engagement Summary</h4>
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="label">Target repository:</span>
                        <span class="value">${config.repository || 'Unknown'}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Interaction type:</span>
                        <span class="value">${config.interaction_types?.join(', ') || 'Unknown'}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Analysis time frame:</span>
                        <span class="value">${config.lookback_days || 30} days</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Target user count:</span>
                        <span class="value">${config.target_count || 10}</span>
                    </div>
                </div>
            </div>
            ${result.insights ? `
                <div class="result-details">
                    <h4>💡 Execution Insights</h4>
                    <div class="insights-content">
                        <p>${result.insights}</p>
                    </div>
                </div>
            ` : ''}
            ${result.recommendations ? `
                <div class="result-details">
                    <h4>📋 Recommendations</h4>
                    <div class="recommendations-content">
                        <ul>
                            ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            ` : ''}
            ${engagementData.raw ? `
                <div class="result-details">
                    <h4>📋 Detailed Engagement Report</h4>
                    <div class="activity-content">
                        <pre>${engagementData.raw}</pre>
                    </div>
                </div>
            ` : ''}
            ${engagementData.tasks_output && engagementData.tasks_output.length > 0 ? `
                <div class="result-details">
                    <h4>📊 Task Execution Details</h4>
                    <div class="tasks-content">
                        ${engagementData.tasks_output.map((task, index) => `
                            <div class="task-item">
                                <h5>Task ${index + 1}: ${task.agent || 'Unknown Agent'}</h5>
                                <div class="task-description">
                                    <strong>Expected Output:</strong> ${task.expected_output || 'Unknown'}
                                </div>
                                ${task.raw ? `
                                    <div class="task-output">
                                        <strong>Execution Result:</strong>
                                        <pre>${task.raw}</pre>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            ${engagementData.token_usage ? `
                <div class="result-details">
                    <h4>📊 Resource Usage</h4>
                    <div class="token-usage">
                        <div class="usage-grid">
                            <div class="usage-item">
                                <span class="label">Total Tokens:</span>
                                <span class="value">${engagementData.token_usage.total_tokens?.toLocaleString() || 0}</span>
                            </div>
                            <div class="usage-item">
                                <span class="label">Successful Requests:</span>
                                <span class="value">${engagementData.token_usage.successful_requests || 0}</span>
                            </div>
                            <div class="usage-item">
                                <span class="label">Prompt Tokens:</span>
                                <span class="value">${engagementData.token_usage.prompt_tokens?.toLocaleString() || 0}</span>
                            </div>
                            <div class="usage-item">
                                <span class="label">Completion Tokens:</span>
                                <span class="value">${engagementData.token_usage.completion_tokens?.toLocaleString() || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}
        `;
    } else if (result.insights) {
        // User Analysis results
        const insights = result.insights;
        resultContent = `
            <div class="result-summary">
                <h4>📊 Analysis Summary</h4>
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="label">Users Analyzed:</span>
                        <span class="value">${insights.total_users || 0}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Analysis depth:</span>
                        <span class="value">${insights.analysis_depth || 'Basic'}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Report language:</span>
                        <span class="value">${insights.language === 'zh' ? 'Chinese' : 'English'}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Completion Time:</span>
                        <span class="value">${insights.completion_time || 'Unknown'}</span>
                    </div>
                </div>
            </div>
            ${insights.analysis_results ? `
                <div class="result-details">
                    <h4>📋 Detailed Analysis</h4>
                    <div class="analysis-content">
                        ${formatAnalysisResults(insights.analysis_results)}
                    </div>
                </div>
            ` : ''}
        `;
    } else if (result.content) {
        // Content Generation results
        resultContent = `
            <div class="result-details">
                <h4>✨ Generated Content</h4>
                <div class="generated-content">
                    <pre>${result.content}</pre>
                </div>
            </div>
        `;
    } else {
        // General result display
        resultContent = `
            <div class="result-details">
                <h4>📋 Execution Result</h4>
                <pre>${JSON.stringify(result, null, 2)}</pre>
            </div>
        `;
    }

    const resultModal = `
        <div class="modal-overlay">
            <div class="modal result-modal">
                <div class="modal-header">
                    <h3 class="modal-title">✅ Operation Successful</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="result-content">
                        <div class="basic-info">
                            <p><strong>Task ID:</strong> <code>${result.task_id || 'Unknown'}</code></p>
                            <p><strong>Status:</strong> <span class="status-success">${result.status || 'Submitted'}</span></p>
                            ${result.message ? `<p><strong>Message:</strong> ${result.message}</p>` : ''}
                        </div>
                        ${resultContent}
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-secondary close-modal-btn">Close</button>
                        <button class="btn btn-primary copy-result-btn">Copy Result</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', resultModal);
    currentModal = document.querySelector('.modal-overlay:last-child');
    
    // Bind all close events
    const closeBtn = currentModal.querySelector('.close-btn');
    const closeModalBtn = currentModal.querySelector('.close-modal-btn');
    const copyBtn = currentModal.querySelector('.copy-result-btn');
    const overlay = currentModal;
    
    // Close button event
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Copy button event
    if (copyBtn) {
        copyBtn.addEventListener('click', copyResultToClipboard);
    }
    
    // Click overlay to close
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
}

// Format analysis results
function formatAnalysisResults(results) {
    if (typeof results === 'string') {
        return `<div class="analysis-text">${results}</div>`;
    } else if (Array.isArray(results)) {
        return results.map(item => `<div class="analysis-item">${JSON.stringify(item, null, 2)}</div>`).join('');
    } else {
        return `<pre>${JSON.stringify(results, null, 2)}</pre>`;
    }
}

// Copy Result to clipboard
function copyResultToClipboard() {
    const resultContent = currentModal.querySelector('.result-content');
    if (resultContent) {
        const text = resultContent.innerText;
        copyToClipboard(text);
    }
}

// Show error
function showError(message) {
    const errorModal = `
        <div class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">❌ Operation failed</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="error-content">
                        <p style="color: #dc2626;">${message}</p>
                    </div>
                    <div style="margin-top: 1rem;">
                        <button class="btn btn-secondary close-modal-btn">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', errorModal);
    currentModal = document.querySelector('.modal-overlay:last-child');
    
    // Bind close events
    const closeBtn = currentModal.querySelector('.close-btn');
    const closeModalBtn = currentModal.querySelector('.close-modal-btn');
    const overlay = currentModal;
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Click overlay to close
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
}

// Utility function: Format number
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Utility function: Copy to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard');
    } catch (err) {
        console.error('Copy failed:', err);
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : '#dc2626'};
        color: white;
        padding: 1rem;
        border-radius: 6px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .result-details pre {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 6px;
        overflow-x: auto;
        font-size: 0.875rem;
        max-height: 300px;
        overflow-y: auto;
    }
    
    .status-badge.offline {
        background: #fee2e2;
        color: #dc2626;
    }
    
    /* Result modal styles */
    .result-modal {
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .basic-info {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 6px;
        margin-bottom: 1rem;
    }
    
    .basic-info code {
        background: #e5e7eb;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: monospace;
        font-size: 0.875rem;
    }
    
    .status-success {
        color: #059669;
        font-weight: 600;
    }
    
    .result-summary {
        margin-bottom: 1.5rem;
    }
    
    .summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 0.5rem;
    }
    
    .summary-item {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        padding: 0.75rem;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .summary-item .label {
        font-weight: 500;
        color: #6b7280;
    }
    
    .summary-item .value {
        font-weight: 600;
        color: #111827;
    }
    
    .result-details {
        margin-top: 1.5rem;
    }
    
    .result-details h4 {
        margin-bottom: 0.75rem;
        color: #374151;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 0.5rem;
    }
    
    .analysis-content, .generated-content, .activity-content {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        padding: 1rem;
        max-height: 400px;
        overflow-y: auto;
    }
    
    .analysis-text {
        line-height: 1.6;
        white-space: pre-wrap;
    }
    
    .analysis-item {
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: #ffffff;
        border-radius: 4px;
        border-left: 3px solid #059669;
    }
    
    .modal-actions {
        margin-top: 1.5rem;
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;
    }
    
    .modal-actions .btn {
        min-width: 100px;
    }
    
    /* New styles */
    .insights-content {
        background: #f0f9ff;
        border: 1px solid #0ea5e9;
        border-radius: 6px;
        padding: 1rem;
        color: #0c4a6e;
        line-height: 1.6;
    }
    
    .recommendations-content {
        background: #f0fdf4;
        border: 1px solid #22c55e;
        border-radius: 6px;
        padding: 1rem;
    }
    
    .recommendations-content ul {
        margin: 0;
        padding-left: 1.5rem;
    }
    
    .recommendations-content li {
        margin-bottom: 0.5rem;
        color: #166534;
    }
    
    .token-usage {
        background: #fef3c7;
        border: 1px solid #f59e0b;
        border-radius: 6px;
        padding: 1rem;
    }
    
    .usage-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 0.75rem;
    }
    
    .usage-item {
        background: #ffffff;
        border: 1px solid #d97706;
        padding: 0.5rem;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .usage-item .label {
        font-weight: 500;
        color: #92400e;
        font-size: 0.875rem;
    }
    
    .usage-item .value {
        font-weight: 600;
        color: #451a03;
    }
    
    /* New task details styles */
    .tasks-content {
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        padding: 1rem;
        max-height: 500px;
        overflow-y: auto;
    }
    
    .task-item {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 1rem;
        margin-bottom: 1rem;
        border-left: 4px solid #3b82f6;
    }
    
    .task-item:last-child {
        margin-bottom: 0;
    }
    
    .task-item h5 {
        margin: 0 0 0.75rem 0;
        color: #1e40af;
        font-size: 1rem;
        font-weight: 600;
    }
    
    .task-description {
        background: #eff6ff;
        border: 1px solid #bfdbfe;
        border-radius: 4px;
        padding: 0.75rem;
        margin-bottom: 0.75rem;
        color: #1e40af;
        font-size: 0.875rem;
    }
    
    .task-output {
        background: #f1f5f9;
        border: 1px solid #cbd5e1;
        border-radius: 4px;
        padding: 0.75rem;
    }
    
    .task-output strong {
        color: #475569;
        font-size: 0.875rem;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .task-output pre {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        padding: 0.75rem;
        margin: 0;
        font-size: 0.8rem;
        line-height: 1.4;
        max-height: 200px;
        overflow-y: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
`;
document.head.appendChild(style); 
