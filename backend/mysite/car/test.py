import requests

# Define the login endpoint URL
login_url = 'http://localhost:8000/api/login/'

# Define the user's credentials
credentials = {
    'username': 'joe',
    'password': '12345'
}

# Send a POST request to the login endpoint with the user's credentials
response = requests.post(login_url, json=credentials)

# Check the response status code
if response.status_code == 200:
    print('Login successful!')
    # Optionally, extract and inspect any relevant information from the response content
    access_token = response.json().get('access_token')
    print('Access token:', access_token)
else:
    print('Login failed. Status code:', response.status_code)
    # Optionally, inspect the response content for additional error information
    print('Error message:', response.json().get('error_message'))

