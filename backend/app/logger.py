import logging
import os
import sys
from datetime import datetime
from logging.handlers import RotatingFileHandler


class FlaskLogger:

    def __init__(
        self,
        app_name: str = "flask-app",
        log_level: int = logging.INFO,
        log_to_file: bool = True,
        log_to_console: bool = True,
        log_dir: str = "logs",
        max_log_size_mb: int = 10,
        backup_count: int = 5
    ):
        """
        Initialize the logger with customizable settings.

        Args:
            app_name: Name of the application (used in log messages and filenames)
            log_level: Minimum level of messages to log
            log_to_file: Whether to write logs to a file
            log_to_console: Whether to output logs to the console
            log_dir: Directory to store log files
            max_log_size_mb: Maximum size of each log file in MB
            backup_count: Number of backup log files to keep
        """
        self.app_name = app_name
        self.log_level = log_level
        self.log_to_file = log_to_file
        self.log_to_console = log_to_console
        self.log_dir = log_dir
        self.max_log_size_mb = max_log_size_mb
        self.backup_count = backup_count
        
        self.logger = logging.getLogger(app_name)
        self.logger.setLevel(log_level)
        self.logger.propagate = False
        
        if self.logger.handlers:
            self.logger.handlers.clear()
            
        self.formatter = logging.Formatter(
            '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
        )
        
        if log_to_console:
            self._setup_console_handler()
            
        if log_to_file:
            self._setup_file_handler()
    
    def _setup_console_handler(self):
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(self.formatter)
        console_handler.setLevel(self.log_level)
        self.logger.addHandler(console_handler)
    
    def _setup_file_handler(self):
        if not os.path.exists(self.log_dir):
            os.makedirs(self.log_dir)
            
        log_file = os.path.join(
            self.log_dir, 
            f"{self.app_name}_{datetime.now().strftime('%Y-%m-%d')}.log"
        )
        
        file_handler = RotatingFileHandler(
            log_file,
            maxBytes=self.max_log_size_mb * 1024 * 1024,
            backupCount=self.backup_count
        )
        file_handler.setFormatter(self.formatter)
        file_handler.setLevel(self.log_level)
        self.logger.addHandler(file_handler)
    
    def get_logger(self) -> logging.Logger:
        return self.logger


default_logger = FlaskLogger().get_logger()


def debug(msg: str, *args, **kwargs):
    default_logger.debug(msg, *args, **kwargs)


def info(msg: str, *args, **kwargs):
    default_logger.info(msg, *args, **kwargs)


def warning(msg: str, *args, **kwargs):
    default_logger.warning(msg, *args, **kwargs)


def error(msg: str, *args, **kwargs):
    default_logger.error(msg, *args, **kwargs)


def critical(msg: str, *args, **kwargs):
    default_logger.critical(msg, *args, **kwargs)
