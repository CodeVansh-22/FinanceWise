try:
    import bcrypt
except ImportError:
    bcrypt = None

def hash_password(password: str) -> str:
    if isinstance(password, str):
        password = password.encode('utf-8')
    if bcrypt:
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)
        return hashed.decode('utf-8')
    return password.decode('utf-8')

def check_password(password: str, hashed_password: str) -> bool:
    if isinstance(password, str):
        password = password.encode('utf-8')
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode('utf-8')
    if bcrypt:
        try:
            return bcrypt.checkpw(password, hashed_password)
        except Exception:
            return False
    return password == hashed_password
