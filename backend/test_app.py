import unittest
from app import create_app

class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('dev')
        self.client = self.app.test_client()

    def test_health_check(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIn('status', json_data)

    def test_docs_check(self):
        response = self.client.get('/api/docs')
        self.assertEqual(response.status_code, 200)

    def test_auth_register_validation(self):
        response = self.client.post('/api/auth/register', json={})
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
