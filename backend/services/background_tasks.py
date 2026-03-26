import threading
import time
from datetime import datetime
from services.ai_service import get_current_mode

class AISystemRunner:
    def __init__(self):
        self.running = True
        self.last_mode = None
        
    def _run(self):
        while self.running:
            current_mode = get_current_mode()
            
            if current_mode != self.last_mode:
                self.last_mode = current_mode
                now = datetime.now()
                
                if current_mode == "Night Mode":
                    print(f"[{now.strftime('%H:%M:%S')}] [System] Switching to Night Mode (21:00-03:00) - Low Resource, Silent Optimization...")
                elif current_mode == "Sync Window":
                    print(f"[{now.strftime('%H:%M:%S')}] [System] Switching to Sync Window (04:00-05:00) - Refreshing failover models and clearing cache...")
                else:
                    print(f"[{now.strftime('%H:%M:%S')}] [System] Switching to Active Mode (05:00-21:00) - API fully responsive, prioritizing real-time bot...")
            
            # Tick every 60 seconds
            time.sleep(60)

    def start(self):
        t = threading.Thread(target=self._run, daemon=True)
        t.start()
        print("[System] 24/7 AI Persistent Background Execution Started")

system_runner = AISystemRunner()
