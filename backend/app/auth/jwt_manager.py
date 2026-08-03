import logging

try:
    from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token
except ImportError:
    class JWTManager:
        def init_app(self, app): pass
        def user_identity_loader(self, fn): return fn
        def invalid_token_loader(self, fn): return fn
        def unauthorized_loader(self, fn): return fn
        def expired_token_loader(self, fn): return fn
    def create_access_token(*args, **kwargs): return "dummy-access-token"
    def create_refresh_token(*args, **kwargs): return "dummy-refresh-token"

logger = logging.getLogger(__name__)
jwt = JWTManager()

def init_jwt(app):
    jwt.init_app(app)

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        if isinstance(user, dict):
            return str(user.get("_id", user.get("id")))
        return str(user)

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return {"error": "Invalid token", "message": str(error)}, 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return {"error": "Authorization header missing or invalid format", "message": str(error)}, 401

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return {"error": "Token expired", "message": "The token has expired, please refresh or log in again"}, 401

def generate_tokens(user_id, role="user"):
    access_token = create_access_token(identity=str(user_id), additional_claims={"role": role})
    refresh_token = create_refresh_token(identity=str(user_id))
    return {
        "access_token": access_token,
        "token": access_token,
        "refresh_token": refresh_token
    }
