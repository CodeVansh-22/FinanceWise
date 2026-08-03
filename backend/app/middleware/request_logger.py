import time
import logging
from flask import request

logger = logging.getLogger("FinanceWiseApp")

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
    )

def init_request_logger(app):
    setup_logging()

    @app.before_request
    def before_request():
        request.start_time = time.time()

    @app.after_request
    def after_request(response):
        if hasattr(request, 'start_time'):
            elapsed = time.time() - request.start_time
            logger.info(f"{request.method} {request.path} -> Status {response.status_code} ({elapsed:.3f}s)")
        return response
