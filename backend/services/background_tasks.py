import logging

logger = logging.getLogger(__name__)

class BackgroundSystemRunner:
    def start(self):
        logger.info("FinanceWise 24/7 AI background service initialized.")

system_runner = BackgroundSystemRunner()

__all__ = ["system_runner"]
