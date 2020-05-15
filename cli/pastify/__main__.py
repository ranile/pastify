import argparse
import requests

API_URL = 'https://us-central1-pastify-app.cloudfunctions.net/api/'

parser = argparse.ArgumentParser(description='Pastify.')
parser.add_argument('--content', help="The pastes's content", required=False)

args = parser.parse_args()

content = args.content or input('Enter some text')

resp = requests.post(API_URL, json={'content': content})
url = f"https://pastify.31416.dev/show/{resp.json()['id']}"
print(url)
