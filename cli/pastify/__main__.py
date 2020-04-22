import argparse
import requests

API_URL = 'https://us-central1-pastify-app.cloudfunctions.net/api/'

parser = argparse.ArgumentParser(description='Pastify.')
parser.add_argument('--content', help="The pastes's content", required=False)
parser.add_argument('--code', help="Content but wrapped in '```'s", required=False)

args = parser.parse_args()
content = ''

if args.content is None and args.code is None:
    content = input('Enter some content')

if args.content is not None and args.code is not None:
    raise ValueError("content and code both can't be provided at the same time")

if args.content is not None and args.code is None:
    if args.content == '':
        raise ValueError('content must not be empty')

    content = args.content
if args.content is None and args.code is not None:
    if args.code == '':
        raise ValueError('code must not be empty')
    content = f'```{args.code}```'

if content == '':
    raise RuntimeError('This should never happen')

resp = requests.post(API_URL, json={'content': content})
url = f"https://pastify.31416.dev/show/{resp.json()['id']}"
print(url)
