import requests

response = requests.get("https://en.wikipedia.org/wiki/Special:Random", allow_redirects=False)
url = response.headers.get("Location", "https://en.wikipedia.org/wiki/Special:Random")

todo = f"Read {url}"

try:
    r = requests.post("http://todo-backend-service:5000/todos", json={"text": todo})
    print("Sent:", r.status_code, r.text)
except Exception as e:
    print("Failed to send todo:", str(e))
