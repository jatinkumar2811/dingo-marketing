Here is the English translation of the **Dingo Marketing** project documentation.

-----

# Dingo Marketing

AI-powered marketing automation platform for GitHub-based projects.

## 🚀 Core Features

  - **Intelligent User Analysis**: Analyze user behavior and interests based on GitHub activity.
  - **Automated Content Generation**: Generate personalized marketing content using AI.
  - **Community Interaction Suggestions**: Intelligently recommend the best interaction strategies.
  - **Marketing Campaign Automation**: Automatically execute marketing tasks and follow-ups.
  - **Market Research**: Real-time web search, competitor analysis, technology trend monitoring, and user feedback analysis.

> 💡 **Technical Architecture**: To understand the system's detailed technical architecture and design philosophy, please refer to the [Architecture Design Document](https://www.google.com/search?q=docs/ARCHITECTURE.md).

## 📋 Deployment Features

  - **Local-First**: Supports simple local deployment without complex configurations.
  - **Lightweight**: Minimized dependencies for fast startup.
  - **Easy Configuration**: Simple environment variable setup.
  - **Real-time Data**: Integrated web search to access the latest market information.

## 🏃‍♂️ Quick Start

### Requirements

  - Python 3.10+ (Recommended 3.12)
  - Git

### 1\. Clone the Project

```bash
git clone https://github.com/your-username/dingo-marketing.git
cd dingo-marketing
```

### 2\. Install Dependencies

```bash
# Install dependencies using pip
pip install -r requirements.txt

# Or use a conda environment (Recommended)
conda create -n dingo-marketing python=3.12 -y
conda activate dingo-marketing
pip install -r requirements.txt
```

### 3\. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file and fill in the necessary API keys
# Required Configuration:
# - OPENAI_API_KEY: AI Service API Key (Supports DeepSeek, Qwen, OpenAI, etc.)
# - GITHUB_TOKEN: GitHub Personal Access Token
# - GITHUB_REPOSITORY: Target GitHub Repository

# Enhanced Features Configuration:
# - SERPER_API_KEY: Web Search API Key (For real-time market research)

# Optional Configuration:
# - TWITTER_API_KEY: Twitter API Key (For social media features)
# - LINKEDIN_API_KEY: LinkedIn API Key (For professional networking)
```

### 4\. Start the Service

```bash
# Start local service
python run.py

# Development mode (Auto-reload)
python run.py --debug --reload

# Specify host and port
python run.py --host 0.0.0.0 --port 8080
```

### 5\. Access the Service

  - API Service: http://localhost:8080
  - API Documentation: https://www.google.com/search?q=http://localhost:8080/docs
  - Health Check: http://localhost:8080/api/v1/status

## 🖥️ Web Interface

To make AI marketing features accessible to non-technical users, we provide an intuitive and easy-to-use Web interface.

### Start Web Interface

```bash
# Method 1: Open directly (Recommended)
cd frontend
open index.html  # macOS
start index.html  # Windows

# Method 2: Use HTTP Server
cd frontend
python -m http.server 3000
# Then access http://localhost:3000
```

### Interface Preview

*The Web interface provides an intuitive dashboard supporting core functions like user analysis, content generation, and community interaction.*

## 🛠️ Management Commands

```bash
# View Help
python run.py --help

# Start Service (Production Mode)
python run.py --host 0.0.0.0 --port 8080

# Start Service (Development Mode)
python run.py --debug --reload --log-level debug
```

## 🚀 API Usage Examples

### 🎯 Core Usage Scenarios

#### Scenario 1: Automated Promotion & Outreach

Targeted automated expansion based on product features and locations of potential users.

**1. Comprehensive Marketing Campaign - One-stop Solution**

```bash
curl -X POST "http://localhost:8080/api/v1/campaigns/comprehensive" \
  -H "Content-Type: application/json" \
  -d '{
    "target_users": ["TargetUser1", "TargetUser2"],
    "target_repositories": ["Your Product Repo"],
    "duration": "30 days",
    "budget": "standard",
    "metrics": ["engagement", "conversion", "awareness"],
    "language": "en"
  }'
```

**Auto Execution:** User Analysis → Content Creation → Community Engagement → Effect Evaluation

**2. Targeted Community Interaction**

```bash
curl -X POST "http://localhost:8080/api/v1/community/engage" \
  -H "Content-Type: application/json" \
  -d '{
    "repository": "Target Project/Repo Name",
    "interaction_types": ["comment", "issue", "star", "follow"],
    "target_count": 20,
    "lookback_days": 30,
    "language": "en"
  }'
```

**Auto Execution:** Identify Targets → Smart Interaction → Build Relationships → Track Results

**3. Content Marketing Campaign**

```bash
curl -X POST "http://localhost:8080/api/v1/campaigns/content" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Launch Campaign",
    "target_audience": "Python Developers and Data Engineers",
    "topics": ["Data Quality", "Python Tools", "Open Source"],
    "content_types": ["blog", "social", "email", "tutorial"],
    "duration": "2 weeks",
    "keywords": ["data quality", "python", "open source"],
    "language": "en"
  }'
```

**Auto Execution:** Content Strategy → Multi-format Content Generation → Publishing Schedule → SEO Optimization

#### Scenario 2: Market Research & Analysis

Gain deep insights into market dynamics, competitors, and user needs to support product decisions.

**1. Competitor Analysis**

```bash
curl -X POST "http://localhost:8080/api/v1/research/enhanced" \
  -H "Content-Type: application/json" \
  -d '{
    "research_type": "competitor",
    "target": "Great Expectations",
    "depth": "medium",
    "language": "en",
    "requirements": "Focus on feature comparison and pricing strategy"
  }'
```

**2. Technology Trend Research**

```bash
curl -X POST "http://localhost:8080/api/v1/research/enhanced" \
  -H "Content-Type: application/json" \
  -d '{
    "research_type": "technology",
    "target": "Data Quality Assessment Tools",
    "depth": "deep",
    "language": "en",
    "requirements": "Analyze latest tech developments and implementation schemes"
  }'
```

**3. Market Trend Analysis**

```bash
curl -X POST "http://localhost:8080/api/v1/research/enhanced" \
  -H "Content-Type: application/json" \
  -d '{
    "research_type": "market",
    "target": "Data Quality Tool Market",
    "depth": "medium",
    "language": "en",
    "requirements": "Focus on market size and growth trends"
  }'
```

**4. User Feedback Analysis**

```bash
curl -X POST "http://localhost:8080/api/v1/research/enhanced" \
  -H "Content-Type: application/json" \
  -d '{
    "research_type": "user_feedback",
    "target": "Open Source Data Tool UX",
    "depth": "shallow",
    "language": "en",
    "requirements": "Collect user pain points and feature requests"
  }'
```

### 🔧 Auxiliary Functions

#### User Analysis

```bash
# Quick User Persona Analysis
curl -X POST "http://localhost:8080/api/v1/analyze/users" \
  -H "Content-Type: application/json" \
  -d '{
    "user_list": ["octocat", "gvanrossum"],
    "analysis_depth": "basic",
    "language": "en"
  }'
```

#### Content Generation

```bash
# Generate Technical Blog
curl -X POST "http://localhost:8080/api/v1/content/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "content_type": "blog",
    "topic": "How to use Dingo to improve data quality",
    "target_audience": "Data Engineers",
    "language": "en",
    "keywords": ["data quality", "Python", "automation"]
  }'
```

#### System Status Check

```bash
# Check system status
curl http://localhost:8080/api/v1/status
```

### 💡 Usage Recommendations

#### Promotion Strategy

1.  **Launch Phase**: Use Comprehensive Marketing Campaigns for broad promotion.
2.  **Growth Phase**: Combine Community Interaction and Content Marketing to sustain influence.
3.  **Optimization Phase**: Adjust strategies based on Market Research results.

#### Research Depth Selection

  - `shallow`: Quick overview, suitable for daily monitoring.
  - `medium`: Standard analysis, balancing efficiency and detail.
  - `deep`: In-depth analysis, suitable for major decision-making.

#### Language and Audience

  - Select the appropriate language (zh/en) based on the target market.
  - Clearly specify the technical background of the target audience.
  - Use relevant industry keywords to improve precision.

## 📁 Project Structure

```
dingo-marketing/
├── src/                   # Source Code
│   ├── agents/            # AI Agents
│   ├── api/               # API Routes
│   ├── config/            # Configuration Management
│   ├── core/              # Core Functionality
│   ├── models/            # Data Models
│   ├── services/          # Business Services
│   └── tools/             # Tool Modules
├── tests/                 # Test Files
├── docs/                  # Documentation
├── logs/                  # Log Files
├── run.py                 # Application Entry Point
└── requirements.txt       # Python Dependencies
```

## 🔮 Feature Support

### Core Features

  - [x] Intelligent User Analysis (GitHub User Personas)
  - [x] AI Content Generation (Blogs, Social Media, Emails)
  - [x] Community Interaction Automation (GitHub Interactions)
  - [x] Marketing Campaign Management (Comprehensive Strategies)
  - [x] Web Interface (User-friendly GUI)
  - [x] API Interface (RESTful API)
  - [x] Multi-language Support (Chinese/English)
  - [x] **Market Research** (Real-time web search, Competitor analysis, Tech trends)
  - [x] **Web Data Acquisition** (Web search, Content scraping, Data analysis)

### Market Research Features

  - [x] **Competitor Analysis** (Feature comparison, Pricing strategy, User reviews)
  - [x] **Tech Research** (Tech principles, Implementation schemes, Performance comparison)
  - [x] **Market Trend Monitoring** (Industry development, Market size, Tech trends)
  - [x] **User Feedback Analysis** (Review analysis, Demand mining, Satisfaction surveys)
  - [x] **Real-time Web Search** (Google Search integration, Multi-language support)
  - [x] **Web Content Scraping** (Smart content extraction, Structured data)

### Technical Architecture

  - [x] Multi-Agent Collaboration System (CrewAI Framework)
  - [x] Modular Design (Extensible Architecture)
  - [x] Configuration Management (Env Variables)
  - [x] Logging System (Structured Logs)
  - [x] Error Handling (Graceful Exception Handling)
  - [x] **Network Integration** (Serper API, Web Scraping)

### AI Model Support

  - [x] DeepSeek API
  - [x] Qwen API
  - [x] OpenAI API
  - [ ] Claude API
  - [ ] Gemini API
  - [ ] Local Model Support (Ollama)

### Platform Integration

  - [x] GitHub (User Analysis, Community Interaction)
  - [x] **Google Search** (Real-time Info Acquisition)
  - [x] **Web Scraping** (Content Extraction & Analysis)
  - [ ] Twitter/X (Social Media Marketing)
  - [ ] LinkedIn (Professional Networking)
  - [ ] Discord (Community Management)
  - [ ] Slack (Team Collaboration)

### Content Types

  - [x] Technical Blog Posts
  - [x] Social Media Content
  - [x] Email Marketing Content
  - [x] Technical Documentation
  - [x] **Market Research Reports** (Competitor Analysis, Trend Reports)
  - [ ] Video Scripts
  - [ ] Podcast Outlines
  - [ ] Press Releases

### Analysis Capabilities

  - [x] User Tech Stack Analysis
  - [x] Community Activity Analysis
  - [x] Contributor Identification
  - [x] **Real-time Competitor Analysis** (Feature comparison, Market position, Pricing)
  - [x] **Tech Trend Monitoring** (Tech development, Market dynamics)
  - [x] **User Feedback Mining** (Review analysis, Demand ID)
  - [x] **Market Size Assessment** (Market capacity, Growth trends)
  - [ ] Marketing Effect Analysis
  - [ ] A/B Testing Support
  - [ ] Data Visualization Dashboard

### Deployment Methods

  - [x] Local Deployment
  - [x] Development Mode (Hot Reload)
  - [ ] Docker Containerization
  - [ ] Cloud Platform Deployment (AWS/Azure/GCP)
  - [ ] Kubernetes Support

### User Experience

  - [x] Intuitive Web Interface
  - [x] Real-time Status Display
  - [x] Detailed Execution Reports
  - [x] **Structured Research Reports** (Markdown format, Easy to read)
  - [ ] Mobile Adaptation
  - [ ] Dark Mode
  - [ ] Multi-user Support
  - [ ] Permission Management

### Development Tools

  - [x] Interactive Demo Scripts (`demo_scenarios.py`)
  - [x] System Status Monitoring
  - [x] Configuration Management Tools
  - [x] Logging System
  - [x] Error Handling Mechanism
  - [x] **API Testing Tools** (cURL examples, Postman collection)
  - [ ] Unit Testing Framework
  - [ ] Performance Monitoring Tools
  - [ ] Code Quality Checks

## 📚 Documentation

  - [Architecture Design](https://www.google.com/search?q=docs/ARCHITECTURE.md)
  - [Development Guide](https://www.google.com/search?q=docs/DEVELOPMENT.md)
  - [API Documentation](https://www.google.com/search?q=http://localhost:8080/docs) (After service start)

## 📄 License

MIT License - See [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

## 🤝 Contribution

Issues and Pull Requests are welcome\!

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Create a Pull Request
