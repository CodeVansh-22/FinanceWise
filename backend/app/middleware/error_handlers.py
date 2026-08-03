import logging
from flask import jsonify

logger = logging.getLogger(__name__)

def register_error_handlers(app):
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({"error": "Bad Request", "details": str(error)}), 400

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({"error": "Unauthorized", "details": str(error)}), 401

    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({"error": "Forbidden", "details": str(error)}), 403

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Endpoint Not Found"}), 404

    @app.errorhandler(429)
    def ratelimit_handler(e):
        return jsonify({"error": "Rate limit exceeded", "message": str(e.description)}), 429

    @app.errorhandler(500)
    def internal_server_error(error):
        logger.error(f"Internal Server Error: {error}", exc_info=True)
        return jsonify({"error": "Internal Server Error", "message": "An unexpected error occurred"}), 500

    @app.errorhandler(Exception)
    def handle_unexpected_exception(error):
        logger.critical(f"Unhandled Exception: {error}", exc_info=True)
        return jsonify({"error": "Server Error", "message": str(error)}), 500
