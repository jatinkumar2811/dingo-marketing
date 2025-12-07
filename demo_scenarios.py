#!/usr/bin/env python3
"""
Dingo Marketing AI Agent Demonstration Script
Quickly demonstrates the system's main features and use cases
"""

import requests
import json
import time
from typing import Dict, Any

# API Basic Configuration - CORRECTED PORT from 8000 to 8080
BASE_URL = "http://127.0.0.1:8080/api/v1"
HEADERS = {"Content-Type": "application/json"}

def print_section(title: str):
    """Prints the section title"""
    print(f"\n{'='*60}")
    print(f"🎯 {title}")
    print(f"{'='*60}")

def print_response(response: requests.Response, title: str = "Response Result"):
    """Formats and prints the API response"""
    print(f"\n📊 {title}:")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        try:
            # ensure_ascii=False keeps non-English characters readable
            data = response.json()
            print(json.dumps(data, indent=2, ensure_ascii=False))
        except:
            print(response.text)
    else:
        print(f"Error: {response.text}")

def demo_scenario_1():
    """Scenario 1: User Analysis - Analyze Prominent Developers"""
    print_section("Scenario 1: Analyze Prominent GitHub Users")
    
    print("📝 Scenario Description:")
    print("- Analyze a few well-known GitHub users")
    print("- Understand their technical background and community influence")
    print("- Develop personalized interaction strategies")
    
    # Chinese Analysis
    print("\n🔍 Executing Chinese user analysis...")
    payload = {
        "user_list": ["octocat", "defunkt"],
        "analysis_depth": "basic",
        "language": "zh"
    }
    
    response = requests.post(f"{BASE_URL}/analyze/users", 
                           headers=HEADERS, 
                           data=json.dumps(payload))
    print_response(response, "Chinese Analysis Result")
    
    time.sleep(2)
    
    # English Analysis
    print("\n🔍 Executing English user analysis...")
    payload["language"] = "en"
    payload["user_list"] = ["gvanrossum"]  # Creator of Python
    
    response = requests.post(f"{BASE_URL}/analyze/users", 
                           headers=HEADERS, 
                           data=json.dumps(payload))
    print_response(response, "English Analysis Result")

def demo_scenario_2():
    """Scenario 2: Content Marketing Campaign"""
    print_section("Scenario 2: Create a Content Marketing Campaign")
    
    print("📝 Scenario Description:")
    print("- Create technical blog content for the Dingo project")
    print("- Develop a content strategy for the developer community")
    print("- Generate various types of marketing materials")
    
    print("\n📝 Creating content marketing campaign...")
    payload = {
        "name": "Dingo Data Quality Tool Promotion",
        "target_audience": "Python Developers and Data Engineers",
        "topics": ["Data Quality Assessment", "Python Data Tools", "Open Source Project Contributions"],
        "content_types": ["blog", "social", "tutorial"],
        "duration": "2 Weeks",
        "keywords": ["Data Quality", "Python", "Open Source", "Data Validation"],
        "language": "zh"
    }
    
    response = requests.post(f"{BASE_URL}/campaigns/content", 
                           headers=HEADERS, 
                           data=json.dumps(payload))
    print_response(response, "Content Marketing Campaign Result")

def demo_scenario_3():
    """Scenario 3: Community Engagement"""
    print_section("Scenario 3: Execute Community Engagement Activity")
    
    print("📝 Scenario Description:")
    print("- Analyze the status of the target project's GitHub community")
    print("- Interact with active users")
    print("- Establish long-term community relationships")
    
    print("\n🤝 Executing community engagement...")
    payload = {
        "interaction_types": ["comment", "issue"],
        "target_count": 5,
        "engagement_level": "moderate",
        "language": "zh"
    }
    
    response = requests.post(f"{BASE_URL}/engagement/community", 
                           headers=HEADERS, 
                           data=json.dumps(payload))
    print_response(response, "Community Engagement Result")

def demo_scenario_4():
    """Scenario 4: AI Content Generation"""
    print_section("Scenario 4: AI Content Generation")
    
    print("📝 Scenario Description:")
    print("- Use AI to generate technical blog articles")
    print("- Create social media content")
    print("- Supports Chinese and English content generation")
    
    # Chinese Blog Generation
    print("\n✍️ Generating Chinese technical blog...")
    payload = {
        "content_type": "blog",
        "topic": "How to use Dingo to improve data quality",
        "target_audience": "Data Engineers",
        "tone": "professional",
        "length": "medium",
        "language": "zh",
        "keywords": ["Data Quality", "Dingo", "Best Practices"]
    }
    
    response = requests.post(f"{BASE_URL}/content/generate", 
                           headers=HEADERS, 
                           data=json.dumps(payload))
    print_response(response, "Chinese Blog Generation Result")
    
    time.sleep(2)
    
    # English Social Media Content
    print("\n📱 Generating English social media content...")
    payload.update({
        "content_type": "social",
        "topic": "Introducing Dingo: A Python Data Quality Tool",
        "target_audience": "developers",
        "language": "en",
        "keywords": ["data quality", "Python", "open source"]
    })
    
    response = requests.post(f"{BASE_URL}/content/generate", 
                           headers=HEADERS, 
                           data=json.dumps(payload))
    print_response(response, "English Social Media Content")

def demo_scenario_5():
    """Scenario 5: System Status and Configuration"""
    print_section("Scenario 5: System Status Check and Configuration")
    
    print("📝 Scenario Description:")
    print("- Check system operating status")
    print("- View and configure the target repository")
    print("- Understand available tools and Agents")
    
    # System Status
    print("\n🔍 Checking system status...")
    response = requests.get(f"{BASE_URL}/status")
    print_response(response, "System Status")
    
    time.sleep(1)
    
    # Current Repository Configuration
    print("\n📂 Viewing current target repository...")
    response = requests.get(f"{BASE_URL}/repository")
    print_response(response, "Current Repository Configuration")
    
    time.sleep(1)
    
    # Tool Status
    print("\n🛠️ Viewing tool status...")
    response = requests.get(f"{BASE_URL}/tools/status")
    print_response(response, "Tool Status")

def demo_comprehensive():
    """Comprehensive Demonstration Scenario"""
    print_section("Comprehensive Demo: Complete Marketing Workflow")
    
    print("📝 Scenario Description:")
    print("- Execute a complete marketing workflow")
    print("- Includes user analysis, content creation, community engagement, etc.")
    print("- Demonstrate multi-Agent collaboration capabilities")
    
    print("\n🚀 Launching comprehensive marketing campaign...")
    payload = {
        "name": "Dingo Project Promotion Plan",
        "objectives": ["Increase Project Visibility", "Attract Contributors", "Establish Technical Community"],
        "target_audience": "Python Developers and Data Scientists",
        "duration": "1 Month",
        "budget_level": "medium",
        "priority_channels": ["github", "social", "blog"],
        "language": "zh"
    }
    
    response = requests.post(f"{BASE_URL}/campaigns/comprehensive", 
                           headers=HEADERS, 
                           data=json.dumps(payload))
    print_response(response, "Comprehensive Marketing Campaign Result")

def main():
    """Main Demonstration Function"""
    print("🎉 Welcome to the Dingo Marketing AI Agent System!")
    print("This demonstration will showcase the system's main features and use cases")
    
    scenarios = [
        ("User Analysis", demo_scenario_1),
        ("Content Marketing", demo_scenario_2),
        ("Community Engagement", demo_scenario_3),
        ("Content Generation", demo_scenario_4),
        ("System Status", demo_scenario_5),
        ("Comprehensive Demo", demo_comprehensive)
    ]
    
    print(f"\n📋 Available Demonstration Scenarios:")
    for i, (name, _) in enumerate(scenarios, 1):
        print(f"  {i}. {name}")
    print(f"  0. All Demos")
    
    try:
        choice = input(f"\n{len(scenarios)}). Please select the scenario to demonstrate (0-{len(scenarios)}): ").strip()
        
        if choice == "0":
            # All Demos
            for name, func in scenarios:
                func()
                input("\nPress Enter to continue to the next demo...")
        elif choice.isdigit() and 1 <= int(choice) <= len(scenarios):
            # Single Demo
            name, func = scenarios[int(choice) - 1]
            func()
        else:
            print("❌ Invalid Choice")
            return
            
    except KeyboardInterrupt:
        print("\n\n👋 Demonstration cancelled")
    except Exception as e:
        print(f"\n❌ Error occurred during the demonstration: {e}")
    
    print(f"\n🎯 Demonstration complete!")
    print(f"💡 Tip: You can view the API documentation for more features: http://127.0.0.1:8080/docs")

if __name__ == "__main__":
    main()