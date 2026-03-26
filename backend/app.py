import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from models.db import get_db

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "your-super-secret-jwt-key")
    
    from flask_jwt_extended import JWTManager
    jwt = JWTManager(app)

    # Initialize Database connection
    with app.app_context():
        _ = get_db()
        
    # Start AI 24/7 Background System
    try:
        from services.background_tasks import system_runner
        system_runner.start()
    except Exception as e:
        print(f"Failed to start AI background service: {e}")
        
    # Register Blueprints
    from routes.auth_routes import auth_bp
    from routes.budget_routes import budget_bp
    from routes.goals_loans_routes import goals_loans_bp
    from routes.analytics_routes import analytics_bp
    from routes.learn_routes import learn_bp
    from routes.chatbot_routes import chatbot_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(budget_bp, url_prefix='/api')
    app.register_blueprint(goals_loans_bp, url_prefix='/api')
    app.register_blueprint(analytics_bp, url_prefix='/api')
    app.register_blueprint(learn_bp, url_prefix='/api')
    app.register_blueprint(chatbot_bp, url_prefix='/api')

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "message": "FinanceWise API is running!"}), 200

    return app

if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
