#!/usr/bin/env python3
"""
Dingo Marketing Application Startup File
Supports command line argument configuration
"""

import argparse
import os
import sys
import uvicorn
from pathlib import Path

# Add src directory to Python path
src_path = Path(__file__).parent / "src"

sys.path.insert(0, str(src_path))

def parse_args():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(description="Dingo Marketing API Server")
    
    parser.add_argument(
        "--host",
        default="127.0.0.1",
        help="Server host address (default: 127.0.0.1)"
    )
    
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Server port (default: 8000)"
    )
    
    parser.add_argument(
        "--reload",
        action="store_true",
        help="Enable auto-reload (development mode)"
    )
    
    parser.add_argument(
        "--debug",
        action="store_true",
        help="Enable debug mode"
    )
    
    parser.add_argument(
        "--log-level",
        choices=["debug", "info", "warning", "error"],
        default="info",
        help="Log level (default: info)"
    )
    
    return parser.parse_args()

def setup_environment():
    """Set environment variables"""
    # Load .env file
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except ImportError:
        print("Warning: python-dotenv not installed, cannot load .env file")
    
    # Set default environment variables
    os.environ.setdefault("DEBUG", "true")
    os.environ.setdefault("LOG_LEVEL", "INFO")

def main():
    """Main function"""
    args = parse_args()
    
    # Set up environment
    setup_environment()
    
    # Get configuration from environment variables or command line arguments
    host = args.host or os.getenv("HOST", "127.0.0.1")
    port = args.port or int(os.getenv("PORT", 8080))
    debug = args.debug or os.getenv("DEBUG", "false").lower() == "true"
    log_level = args.log_level or os.getenv("LOG_LEVEL", "info").lower()
    
    print(f"🚀 Starting Dingo Marketing API Server")
    print(f"📍 Address: http://{host}:{port}")
    print(f"📚 API Documentation: http://{host}:{port}/docs")
    print(f"🔧 Debug Mode: {'Enabled' if debug else 'Disabled'}")
    print(f"📝 Log Level: {log_level.upper()}")
    print("-" * 50)
    
    try:
        # Start the server
        uvicorn.run(
            "src.main:app",
            host=host,
            port=port,
            reload=args.reload or debug,
            log_level=log_level,
            access_log=True
        )
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
    except Exception as e:
        print(f"❌ Startup failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()