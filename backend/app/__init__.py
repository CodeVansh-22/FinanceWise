import os
from flask import Flask
from flask_cors import CORS

try:
    from flask_limiter import Limiter
    from flask_limiter.util import get_remote_address
except ImportError:
    class Limiter:
        def __init__(self, key_func=None): pass
        def init_app(self, app): pass
    def get_remote_address(): return "127.0.0.1"

from app.config.config import config_by_name
from app.database.connection import get_db
from app.auth.jwt_manager import init_jwt
from app.middleware.error_handlers import register_error_handlers
from app.middleware.request_logger import init_request_logger

limiter = Limiter(key_func=get_remote_address)

def create_app(config_name=None):
    if config_name is None:
        config_name = os.getenv("FLASK_ENV", "dev")

    app = Flask(__name__)
    app.config.from_object(config_by_name.get(config_name, config_by_name["dev"]))

    # Setup CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Setup JWT
    init_jwt(app)

    # Setup Limiter
    limiter.init_app(app)

    # Register error handlers and request logger
    register_error_handlers(app)
    init_request_logger(app)

    # Initialize DB connection pool
    with app.app_context():
        try:
            get_db()
        except Exception as e:
            app.logger.error(f"Initial DB connection warning: {e}")

    # Register Blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.transactions_routes import transactions_bp
    from app.routes.invoices_routes import invoices_bp
    from app.routes.goals_loans_routes import goals_loans_bp
    from app.routes.analytics_routes import analytics_bp
    from app.routes.learn_routes import learn_bp
    from app.routes.ai_routes import ai_bp
    from app.routes.notifications_routes import notifications_bp
    from app.routes.upload_routes import upload_bp
    from app.routes.health_routes import health_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(transactions_bp, url_prefix='/api')
    app.register_blueprint(invoices_bp, url_prefix='/api')
    app.register_blueprint(goals_loans_bp, url_prefix='/api')
    app.register_blueprint(analytics_bp, url_prefix='/api')
    app.register_blueprint(learn_bp, url_prefix='/api')
    app.register_blueprint(ai_bp, url_prefix='/api')
    app.register_blueprint(notifications_bp, url_prefix='/api')
    app.register_blueprint(upload_bp, url_prefix='/api')
    app.register_blueprint(health_bp, url_prefix='/api')

    return app

# Expose a default app instance at the package level so that Gunicorn
# running `gunicorn app:app` (which imports the 'app' package) can find it.
app = create_app(os.getenv("FLASK_ENV", "dev"))
